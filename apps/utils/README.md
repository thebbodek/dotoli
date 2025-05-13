# @bbodek/utils &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thebbodek/dotoli/blob/main/apps/utils/LICENSE) [![NPM badge](https://img.shields.io/npm/v/@bbodek/utils?logo=npm)](https://www.npmjs.com/package/@bbodek/utils)

## Installation

```sh
# with npm
npm install @bbodek/utils

# with yarn
yarn add @bbodek/utils
```

## Example

```tsx
import { isServer } from '@bbodek/utils';

if (isServer()) {
  return null;
}

return <ClientComponent />;
```

## Peer Dependencies

```json
"peerDependencies": {
  "next": "^15.3.1",
  "react": "^19.1.0",
  "react-dom": "^19.1.0"
}
```

## License

Licensed under the [MIT license](https://github.com/thebbodek/dotoli/blob/main/LICENSE).

<a href="https://bbodek.com/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://image.thebbodek.com/logo/logo-white.png"/>
    <img align="center" alt="BBODEK" width="100" hspace="16" src="https://image.thebbodek.com/logo/logo-color.png"/>
  </picture>
</a>
