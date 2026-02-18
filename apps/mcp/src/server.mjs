import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');

const HOOKS_ROOT = path.join(repoRoot, 'apps/hooks/src/hooks');
const UTILS_ROOT = path.join(repoRoot, 'apps/utils/src');
const STORYBOOK_HOOKS_ROOT = path.join(repoRoot, 'apps/storybook/src/stories/hooks');
const STORYBOOK_UTILS_ROOT = path.join(repoRoot, 'apps/storybook/src/stories/utils');

const PORT = Number(process.env.PORT || 13317);
const MCP_PATH = '/mcp';
const PROTOCOL_VERSION = '2025-06-18';

function walkFiles(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const stack = [dir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (exts.some((ext) => entry.name.endsWith(ext))) {
        out.push(fullPath);
      }
    }
  }

  return out;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function relativeToRepo(filePath) {
  return toPosix(path.relative(repoRoot, filePath));
}

function tryRead(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function parseStoryTitle(source) {
  const m =
    source.match(/title:\s*['"`]([^'"`]+)['"`]/) ??
    source.match(/title:\s*["']([^"']+)["']/);
  return m?.[1];
}

function firstLine(text) {
  return text.split('\n').map((line) => line.trim()).find(Boolean) || '';
}

function findRelatedStories(root, symbol) {
  const files = walkFiles(root, ['.stories.ts', '.stories.tsx', '.stories.js', '.stories.jsx']);
  return files
    .filter((file) => {
      const content = tryRead(file);
      const byFile = path.basename(file).toLowerCase().includes(symbol.toLowerCase());
      const byImport = new RegExp(`\\b${symbol}\\b`).test(content);
      return byFile || byImport;
    })
    .map((file) => {
      const content = tryRead(file);
      return {
        path: relativeToRepo(file),
        title: parseStoryTitle(content) || '',
        preview: firstLine(content),
      };
    });
}

function buildHooksCatalog() {
  if (!fs.existsSync(HOOKS_ROOT)) return [];
  const dirs = fs
    .readdirSync(HOOKS_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith('use'))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));

  return dirs.map((name) => {
    const sourcePath = path.join(HOOKS_ROOT, name, 'index.ts');
    const source = tryRead(sourcePath);
    const relatedStories = findRelatedStories(STORYBOOK_HOOKS_ROOT, name);
    return {
      name,
      sourcePath: relativeToRepo(sourcePath),
      sourcePreview: firstLine(source),
      stories: relatedStories,
    };
  });
}

function buildUtilsCatalog() {
  const entryPath = path.join(UTILS_ROOT, 'index.ts');
  const entrySource = tryRead(entryPath);
  const lines = entrySource.split('\n');

  const exportedNamespaces = [];
  for (const line of lines) {
    const exportAll = line.match(/export\s+\*\s+from\s+['"]@\/([^'"]+)['"]/);
    if (exportAll?.[1]) {
      exportedNamespaces.push(exportAll[1]);
    }
  }

  const items = exportedNamespaces.map((ns) => {
    const symbol = ns.split('/').pop() || ns;
    const sourcePath = path.join(UTILS_ROOT, ns, 'index.ts');
    const source = tryRead(sourcePath);
    const relatedStories = findRelatedStories(STORYBOOK_UTILS_ROOT, symbol);
    return {
      name: symbol,
      namespace: ns,
      sourcePath: relativeToRepo(sourcePath),
      sourcePreview: firstLine(source),
      stories: relatedStories,
    };
  });

  return items.sort((a, b) => a.name.localeCompare(b.name));
}

function buildCatalog() {
  return {
    hooks: buildHooksCatalog(),
    utils: buildUtilsCatalog(),
  };
}

function buildTools() {
  return [
    {
      name: 'list-hooks',
      description: 'List available hooks from apps/hooks with related Storybook stories.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string' },
        },
      },
    },
    {
      name: 'get-hook-details',
      description: 'Get details for one hook including source path and related stories.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        required: ['name'],
      },
    },
    {
      name: 'list-utils',
      description: 'List available utility modules from apps/utils with related stories.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string' },
        },
      },
    },
    {
      name: 'get-util-details',
      description: 'Get details for one utility module including source path and related stories.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        required: ['name'],
      },
    },
    {
      name: 'find-symbols',
      description: 'Search hooks and utils by free-text query.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string' },
          scope: {
            type: 'string',
            enum: ['all', 'hooks', 'utils'],
          },
        },
        required: ['query'],
      },
    },
  ];
}

function jsonRpc(id, result, error) {
  if (error) {
    return {
      jsonrpc: '2.0',
      id,
      error,
    };
  }
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}

function sseWrite(res, payload) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.end(`data: ${JSON.stringify(payload)}\n\n`);
}

function textContent(text) {
  return [{ type: 'text', text }];
}

function filterByQuery(items, query, key = 'name') {
  if (!query) return items;
  const q = query.toLowerCase();
  return items.filter((item) => String(item[key]).toLowerCase().includes(q));
}

function formatList(title, items) {
  if (items.length === 0) return `${title}\n\nNo matches found.`;
  const lines = items.map((item) => `- ${item.name} (${item.sourcePath})`);
  return `${title}\n\n${lines.join('\n')}`;
}

function formatDetails(kind, item) {
  const storyLines =
    item.stories.length > 0
      ? item.stories.map((s) => `- ${s.path}${s.title ? ` (${s.title})` : ''}`).join('\n')
      : '- (none)';

  return [
    `${kind}: ${item.name}`,
    `source: ${item.sourcePath}`,
    item.namespace ? `namespace: ${item.namespace}` : null,
    '',
    'related stories:',
    storyLines,
  ]
    .filter(Boolean)
    .join('\n');
}

function toolNotFound(name) {
  return {
    code: -32602,
    message: `Unknown tool: ${name}`,
  };
}

function methodNotFound(method) {
  return {
    code: -32601,
    message: `Method not found: ${method}`,
  };
}

async function handleToolCall(params) {
  const catalog = buildCatalog();
  const toolName = params?.name;
  const args = params?.arguments || {};

  if (toolName === 'list-hooks') {
    const hooks = filterByQuery(catalog.hooks, args.query);
    return {
      content: textContent(formatList('Available hooks', hooks)),
      structuredContent: { hooks },
    };
  }

  if (toolName === 'get-hook-details') {
    const hook = catalog.hooks.find((h) => h.name === args.name);
    if (!hook) {
      return {
        content: textContent(`Hook not found: ${args.name}`),
        isError: true,
      };
    }
    return {
      content: textContent(formatDetails('hook', hook)),
      structuredContent: hook,
    };
  }

  if (toolName === 'list-utils') {
    const utils = filterByQuery(catalog.utils, args.query);
    return {
      content: textContent(formatList('Available utils', utils)),
      structuredContent: { utils },
    };
  }

  if (toolName === 'get-util-details') {
    const util = catalog.utils.find((u) => u.name === args.name);
    if (!util) {
      return {
        content: textContent(`Util not found: ${args.name}`),
        isError: true,
      };
    }
    return {
      content: textContent(formatDetails('util', util)),
      structuredContent: util,
    };
  }

  if (toolName === 'find-symbols') {
    const query = String(args.query || '').trim();
    const scope = args.scope || 'all';
    const hooks = scope === 'utils' ? [] : filterByQuery(catalog.hooks, query);
    const utils = scope === 'hooks' ? [] : filterByQuery(catalog.utils, query);
    const text = [
      `query: ${query}`,
      '',
      formatList('hooks', hooks),
      '',
      formatList('utils', utils),
    ].join('\n');

    return {
      content: textContent(text),
      structuredContent: { hooks, utils },
    };
  }

  throw toolNotFound(toolName);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.url.startsWith(MCP_PATH)) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(
      [
        'Dotoli MCP server is running.',
        `Endpoint: http://localhost:${PORT}${MCP_PATH}`,
        'Methods: initialize, tools/list, tools/call',
      ].join('\n'),
    );
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const body = await parseBody(req);
    const id = body?.id ?? null;
    const method = body?.method;
    const params = body?.params || {};

    if (method === 'initialize') {
      sseWrite(
        res,
        jsonRpc(id, {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: {
            tools: { listChanged: true },
          },
          serverInfo: {
            name: '@dotoli/mcp',
            version: '0.1.0',
          },
        }),
      );
      return;
    }

    if (method === 'tools/list') {
      sseWrite(res, jsonRpc(id, { tools: buildTools() }));
      return;
    }

    if (method === 'tools/call') {
      try {
        const result = await handleToolCall(params);
        sseWrite(res, jsonRpc(id, result));
        return;
      } catch (error) {
        sseWrite(res, jsonRpc(id, null, error));
        return;
      }
    }

    sseWrite(res, jsonRpc(id, null, methodNotFound(method)));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    sseWrite(
      res,
      jsonRpc(null, null, {
        code: -32700,
        message: `Parse error: ${message}`,
      }),
    );
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[dotoli-mcp] listening on http://localhost:${PORT}${MCP_PATH}`);
});
