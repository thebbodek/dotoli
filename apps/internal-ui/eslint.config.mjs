import { next } from '@bbodek/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    extends: [next],
    rules: {
      /* 컴포넌트 라이브러리라 pages/ 디렉토리가 없어 실행마다 경고만 발생 */
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
]);
