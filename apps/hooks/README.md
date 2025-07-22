# @bbodek/hooks &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thebbodek/dotoli/blob/main/apps/hooks/LICENSE) [![NPM badge](https://img.shields.io/npm/v/@bbodek/hooks?logo=npm)](https://www.npmjs.com/package/@bbodek/hooks)

## Installation

```sh
# with npm
npm install @bbodek/hooks

# with yarn
yarn add @bbodek/hooks
```

## Example

```tsx
import { useIsomorphicLayoutEffect } from '@bbodek/hooks';

useIsomorphicLayoutEffect(() => {
  console.log('isReady');
}, []);
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
  <p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://image.thebbodek.com/logo/logo-white.png"/>
      <img alt="BBODEK" width="100" hspace="16" src="https://image.thebbodek.com/logo/logo-color.png"/>
    </picture>
  </p>
</a>
