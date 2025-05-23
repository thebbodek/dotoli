import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: ['node_modules', 'dist', '*.config.js', '*.config.mjs'],
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
      prettier,
      'prefer-arrow-functions': preferArrowFunctions,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        project: ['./tsconfig.json'],
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
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
      '@next/next/no-img-element': 'off',
      'no-unused-vars': 'error',
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
          ],
          filter: { ignore: ['disabled', 'checked'] },
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
      ],
    },
  },
]);
