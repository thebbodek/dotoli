# dotoli &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thebbodek/dotoli/blob/main/LICENSE)

A monorepo for managing shared configurations, utilities, hooks, and UI components used across the BBODEK frontend.

## Packages

- [eslint-config](https://github.com/thebbodek/dotoli/blob/main/packages/eslint-config)
- [prettier-config](https://github.com/thebbodek/dotoli/blob/main/packages/prettier-config)
- [typescript-config](https://github.com/thebbodek/dotoli/blob/main/packages/typescript-config)

## Libraries

- [@bbodek/hooks](https://github.com/thebbodek/dotoli/blob/main/apps/hooks/README.md)
- [@bbodek/utils](https://github.com/thebbodek/dotoli/blob/main/apps/utils/README.md)
- [@bbodek/internal-ui](https://github.com/thebbodek/dotoli/blob/main/apps/internal-ui/README.md)
- [@dotoli/mcp](https://github.com/thebbodek/dotoli/blob/main/apps/mcp/README.md)

## Usage
Prerequisites:
- [Pnpm](https://pnpm.io/installation) pnpm@10.10.0
- [Node.js](https://nodejs.org/en/download) >=18

> [!NOTE]  
> We use Node `v22.14.0`, with [asdf](https://asdf-vm.com/guide/getting-started.html).

Setup:

```sh
git clone git@github.com:thebbodek/dotoli.git
cd dotoli
pnpm install && pnpm build
```

Run storybook development server:

```sh
pnpm sb:dev
```

Run custom MCP server (hooks/utils):

```sh
pnpm mcp dev
```

Hybrid MCP server config example:

```sh
cat .mcp.servers.example.json
```

## Guide

Workspace Installation:

```sh
cd apps/hooks
pnpm add -D @bbodek/eslint-config@workspace:* 
```

Run project scripts from root directory:

```sh
pnpm --filter=<package-name> <script>
# e.g.
pnpm --filter=@bbodek/hooks build
```

## License

Licensed under the [MIT license](https://github.com/thebbodek/dotoli/blob/main/LICENSE).

<a href="https://bbodek.com/" target="_blank">
  <p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://image.thebbodek.com/logo/logo-white.png"/>
      <img alt="BBODEK" width="100" hspace="16" src="https://image.thebbodek.com/logo/logo-color.png"/>
    </picture>
  </p>
</a>
