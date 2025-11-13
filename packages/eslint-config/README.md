# @bbodek/eslint-config &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thebbodek/dotoli/blob/main/apps/eslint-config/LICENSE) [![NPM badge](https://img.shields.io/npm/v/@bbodek/eslint-config?logo=npm)](https://www.npmjs.com/package/@bbodek/eslint-config)

## Installation

```bash
# with npm
npm i -D @bbodek/eslint-config eslint

# with yarn
yarn add -D @bbodek/eslint-config eslint
```

## Usage

Add the following to your root **eslint.config.mjs**:

```js
import eslintConfig from '@bbodek/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    extends: [eslintConfig],
  },
]);
```

## License

Licensed under the [MIT license](https://github.com/thebbodek/dotoli/blob/main/packages/eslint-config/LICENSE).

<a href="https://bbodek.com/" target="_blank">
  <p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://image.thebbodek.com/logo/logo-white.png"/>
      <img alt="BBODEK" width="100" hspace="16" src="https://image.thebbodek.com/logo/logo-color.png"/>
    </picture>
  </p>
</a>
