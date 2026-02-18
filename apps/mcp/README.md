# @dotoli/mcp

Custom MCP server for Dotoli hooks/utils metadata.

## Why

This server is the "custom" half of a hybrid MCP setup:

- Storybook MCP addon: component-centric context (when enabled in Storybook).
- `@dotoli/mcp`: hooks/utils lookup from this monorepo.

## Run

```bash
pnpm --filter @dotoli/mcp dev
```

Default endpoint:

```text
http://localhost:13317/mcp
```

## Available tools

- `list-hooks`
- `get-hook-details`
- `list-utils`
- `get-util-details`
- `find-symbols`

## Data source

- Hooks: `apps/hooks/src/hooks/*`
- Utils: `apps/utils/src/index.ts` exports and related modules
- Story links: `apps/storybook/src/stories/hooks/**`, `apps/storybook/src/stories/utils/**`
