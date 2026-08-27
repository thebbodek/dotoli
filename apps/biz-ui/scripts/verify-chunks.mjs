import { readFileSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';
const INDEX_CHUNK = 'index.es.js';
const SHARED_CHUNK = 'shared.es.js';
const CLIENT_CHUNK = 'client.es.js';

const CLIENT_DIRECTIVE_PATTERN = /^["']use client["'];/;
const REACT_IMPORT_PATTERN = /from\s*["']react(-dom)?(\/[^"']*)?["']/;
const CLIENT_IMPORT_PATTERN = /from\s*["']\.\/client\.es\.js["']/;

const readChunk = ({ name }) => readFileSync(join(DIST_DIR, name), 'utf8');

const index = readChunk({ name: INDEX_CHUNK });
const shared = readChunk({ name: SHARED_CHUNK });
const client = readChunk({ name: CLIENT_CHUNK });

const failures = [];

if (!CLIENT_DIRECTIVE_PATTERN.test(client)) {
  failures.push(
    `${CLIENT_CHUNK} 첫 줄에 'use client' 가 없습니다 — terser가 걷어냈을 수 있습니다 (compress.directives)`,
  );
}

[
  { name: INDEX_CHUNK, code: index },
  { name: SHARED_CHUNK, code: shared },
].forEach(({ name, code }) => {
  if (code.includes('use client')) {
    failures.push(`${name} 에 'use client' 가 있습니다 — 서버에서 읽혀야 하는 청크입니다`);
  }
});

if (REACT_IMPORT_PATTERN.test(shared)) {
  failures.push(
    `${SHARED_CHUNK} 가 react 를 import 합니다 — 훅·컨텍스트가 constants/ · types/ · utils/ 안에 있어 서버 청크로 샜습니다`,
  );
}

if (CLIENT_IMPORT_PATTERN.test(shared)) {
  failures.push(`${SHARED_CHUNK} 가 ${CLIENT_CHUNK} 를 import 합니다 — 의존은 단방향이어야 합니다`);
}

if (failures.length) {
  console.error('\n✗ dist 청크 경계 검증 실패\n');
  failures.forEach((failure) => console.error(`  · ${failure}`));
  console.error('\n  규칙: apps/biz-ui/CLAUDE.md 「패키징 규칙」\n');
  process.exit(1);
}

console.log('✓ dist 청크 경계 정상 — client 지시어 · shared 서버 안전 · 단방향 의존');
