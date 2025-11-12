# @bbodek/prettier-config &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thebbodek/dotoli/blob/main/packages/prettier-config/LICENSE) [![NPM badge](https://img.shields.io/npm/v/@bbodek/prettier-config?logo=npm)](https://www.npmjs.com/package/@bbodek/prettier-config)

BBODEK Official Prettier formatting config.

## Installation

```bash
# with npm
npm i -D @bbodek/prettier-config prettier @trivago/prettier-plugin-sort-imports prettier-plugin-tailwindcss

# with yarn
yarn add -D @bbodek/prettier-config prettier @trivago/prettier-plugin-sort-imports prettier-plugin-tailwindcss
```

## Basic Usage

Add the following to your root **package.json**:

```json
{
  "prettier": "@bbodek/prettier-config"
}
```

## Customizing importOrders

To customize the `importOrders`, create a **.prettierrc.js** file in your project root.

Example:

```js
import { createPrettierConfig } from "@bbodek/prettier-config";

export default createPrettierConfig({
  internalImports: ["@components/(.*)"],
});
```

## Peer Dependencies

```json
"peerDependencies": {
  "prettier": ">= 3",
  "@trivago/prettier-plugin-sort-imports": "^4.3.0",
  "prettier-plugin-tailwindcss": "^0.6.11"
}
```

## Reference

For the default plugins and options, see [`packages/prettier-config/index.js`](https://github.com/thebbodek/dotoli/blob/main/packages/prettier-config/base.js).

## License

Licensed under the [MIT license](https://github.com/thebbodek/dotoli/blob/main/packages/prettier-config/LICENSE).

<a href="https://bbodek.com/" target="_blank">
  <p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://image.thebbodek.com/logo/logo-white.png"/>
      <img alt="BBODEK" width="100" hspace="16" src="https://image.thebbodek.com/logo/logo-color.png"/>
    </picture>
  </p>
</a>
