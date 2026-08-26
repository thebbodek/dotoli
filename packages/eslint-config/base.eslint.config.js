import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* @eslint/js 10의 config에 포함된 name 필드를 eslintrc 스키마가 거부하므로 제거 */
const stripName = ({ name: _name, ...config }) => config;
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: stripName(js.configs.recommended),
  allConfig: stripName(js.configs.all),
});

export default defineConfig([
  /* ignores는 전역으로 분리한다 — config 객체 안에 두면 base만 비적용되고
   * next 쪽 config는 여전히 *.config.* 파일에 적용되어 strip된 플러그인 해석 실패로 크래시한다 */
  {
    ignores: [
      'node_modules',
      'dist',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      /* .ts config(sentry.*.config.ts 등)는 tsconfig include 밖이면 projectService 파싱 에러가 나므로 js/mjs와 동일하게 무시한다 */
      '*.config.ts',
    ],
  },
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ),
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': typescriptEslint,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
      'prefer-arrow-functions': preferArrowFunctions,
    },
    /* 'detect'는 eslint-plugin-react 7.37.5가 ESLint 10에서 제거된
     * context.getFilename을 호출해 크래시하므로 명시 버전으로 고정한다 */
    settings: {
      react: {
        version: '19',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prefer-template': 'error',
      'no-console': 'warn',
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
        },
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-sort-props': [
        'error',
        {
          shorthandLast: true,
          callbacksLast: true,
          multiline: 'first',
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[object.object.object]',
          message:
            '⚠️ 3 depth 이상의 중첩된 객체 접근은 destructuring으로 꺼내 쓰세요',
        },
      ],
      'no-nested-ternary': 'error',
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['return', 'if'],
        },
      ],
      eqeqeq: 'error',
      /* 단일 extends 빈 인터페이스는 확장 포인트용 관용 패턴으로 허용한다 */
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: [
            'is',
            'can',
            'should',
            'will',
            'has',
            'supports',
            'includes',
            'shows',
            'allows',
            'accepts',
            'contains',
            'use',
          ],
          filter: {
            regex: '^(disabled|checked|required|multiple)$',
            match: false,
          },
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
      ],
    },
  },
]);
