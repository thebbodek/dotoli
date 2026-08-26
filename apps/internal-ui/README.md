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

```css
/* global.css */
@import 'tailwindcss';
@import '@bbodek/internal-ui/styles';
```

> ⚠️ `@config '@bbodek/internal-ui/tailwind-config'`는 0.0.124부터 제거되었습니다. tailwind 4.3.1+에서 content 글롭이 config 파일 위치 기준으로 해석되어 라이브러리 클래스가 누락되던 방식이므로, 기존에 사용 중이라면 해당 라인(및 이를 re-export 하던 로컬 tailwind config)을 삭제해주세요. 테마·safelist는 `@import '@bbodek/internal-ui/styles'` 한 줄로 모두 적용됩니다.

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
