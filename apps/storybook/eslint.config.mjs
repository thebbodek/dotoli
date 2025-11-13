import eslintConfig from '@bbodek/eslint-config';
import storybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...eslintConfig,
  ...storybook.configs['flat/recommended'],
]);
