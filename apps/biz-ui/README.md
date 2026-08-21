# @bbodek/biz-ui &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thebbodek/dotoli/blob/main/apps/biz-ui/LICENSE) [![NPM badge](https://img.shields.io/npm/v/@bbodek/biz-ui?logo=npm)](https://www.npmjs.com/package/@bbodek/biz-ui)

## Installation

```sh
# with npm
npm install @bbodek/biz-ui

# with yarn
yarn add @bbodek/biz-ui
```

## Usage

### 1. To install Tailwind CSS in your Next.js project

- [Using Pages Router](https://nextjs.org/docs/pages/guides/tailwind-css)
- [Using App Router](https://nextjs.org/docs/app/guides/tailwind-css#installing-tailwind)

### 2. Update your global css file

#### Standalone Project

```css
/* global.css */
@import 'tailwindcss';
@import '@bbodek/biz-ui/styles';
```

#### Monorepo Project

Create a local Tailwind config file

```javascript
/* tailwind.config.js */
import config from '@bbodek/biz-ui/tailwind-config';

export default config;
```

```css
/* global.css */
@import 'tailwindcss';
@import '@bbodek/biz-ui/styles';
@config './tailwind.config.js'; /* Adjust the path as needed */
```

### 3. Set viewport for WebView

`safe-area-*` utilities require `viewport-fit=cover`.

```tsx
/* app/layout.tsx */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};
```

### 4. Mount `Toaster` (only if you use `toast`)

Render it once at the app root. `toast.*` calls do nothing without it.

```tsx
/* app/layout.tsx */
import { Toaster } from '@bbodek/biz-ui';

<body>
  {children}
  <div id='portal' />
  <Toaster />
</body>;
```

Screens with a fixed CTA set `--toast-offset` so toasts float above it.

```ts
document.documentElement.style.setProperty('--toast-offset', '84px');
```

## Example

```tsx
import { TYPOGRAPHY_STYLES_MAPPER } from '@bbodek/biz-ui';

const Example = () => {
  return (
    <p className={`${TYPOGRAPHY_STYLES_MAPPER['body']} text-gray-900`}>
      Click Me!
    </p>
  );
};

export default Example;
```

## Peer Dependencies

```json
"peerDependencies": {
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "tailwindcss": "^4"
}
```

## License

Licensed under the [MIT license](https://github.com/thebbodek/dotoli/blob/main/apps/biz-ui/LICENSE).

<a href="https://bbodek.com/" target="_blank">
  <p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://image.thebbodek.com/logo/logo-white.png"/>
      <img alt="BBODEK" width="100" hspace="16" src="https://image.thebbodek.com/logo/logo-color.png"/>
    </picture>
  </p>
</a>
