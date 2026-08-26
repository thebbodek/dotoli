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

```css
/* global.css */
@import 'tailwindcss';
@import '@bbodek/biz-ui/styles';
```

> ⚠️ `@config '@bbodek/biz-ui/tailwind-config'`는 0.0.45부터 제거되었습니다. tailwind 4.3.1+에서 content 글롭이 config 파일 위치 기준으로 해석되어 라이브러리 클래스가 누락되던 방식이므로, 기존에 사용 중이라면 해당 라인(및 이를 re-export 하던 로컬 tailwind config)을 삭제해주세요. 테마·safelist는 `@import '@bbodek/biz-ui/styles'` 한 줄로 모두 적용됩니다.

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
