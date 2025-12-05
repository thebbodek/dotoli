# @bbodek/internal-ui &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thebbodek/dotoli/blob/main/apps/internal-ui/LICENSE) [![NPM badge](https://img.shields.io/npm/v/@bbodek/internal-ui?logo=npm)](https://www.npmjs.com/package/@bbodek/internal-ui)

## Installation

```sh
# with npm
npm install @bbodek/internal-ui

# with yarn
yarn add @bbodek/internal-ui
```

## Usage

### 1. To install Tailwind CSS in your Next.js project

- [Using Pages Router](https://nextjs.org/docs/pages/guides/tailwind-css)
- [Using App Router](https://nextjs.org/docs/app/guides/tailwind-css#installing-tailwind)

### 2. Update your next config file

```javascript
/* next.config.js */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };

    return config;
  },
};
```

### 3. Update your global css file

#### Standalone Project

```css
/* global.css */
@import 'tailwindcss';
@import '@bbodek/internal-ui/styles';
@config '@bbodek/internal-ui/tailwind-config';
```

#### Monorepo Project
Create a local Tailwind config file

``` javascript
/* tailwind.config.js */
import config from '@bbodek/internal-ui/tailwind-config'

export default config;
```

```css
/* global.css */
@import 'tailwindcss';
@import '@bbodek/internal-ui/styles';
@config './tailwind.config.js'; /* Adjust the path as needed */
```

## Example

```tsx
import { Button } from '@bbodek/internal-ui';

const Example = () => {
  return <Button content='Click Me!' />;
};

export default Example;
```

## Peer Dependencies

```json
"peerDependencies": {
  "next": "^15.3.1",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
}
```

## License

Licensed under the [MIT license](https://github.com/thebbodek/dotoli/blob/main/apps/internal-ui/LICENSE).

<a href="https://bbodek.com/" target="_blank">
  <p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://image.thebbodek.com/logo/logo-white.png"/>
      <img alt="BBODEK" width="100" hspace="16" src="https://image.thebbodek.com/logo/logo-color.png"/>
    </picture>
  </p>
</a>
