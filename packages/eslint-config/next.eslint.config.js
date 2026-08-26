import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig } from 'eslint/config';

import base from './base.eslint.config.js';

/* base가 이미 등록한 플러그인(react-hooks v7 등)과 next가 번들한 동명 플러그인이
 * 같은 키로 이중 등록되면 "Cannot redefine plugin" 에러가 나므로 next 쪽에서 제거한다.
 * 해당 룰들은 base에 등록된 플러그인으로 해석된다. */
const BASE_PLUGIN_KEYS = [
  'react',
  'react-hooks',
  'jsx-a11y',
  '@typescript-eslint',
];
const stripBasePlugins = ({ plugins = {}, ...config }) => ({
  ...config,
  plugins: Object.fromEntries(
    Object.entries(plugins).filter(([key]) => !BASE_PLUGIN_KEYS.includes(key)),
  ),
});

export default defineConfig([
  ...[nextCoreWebVitals].flat().map(stripBasePlugins),
  ...base,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]);
