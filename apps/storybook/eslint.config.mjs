import eslintConfig from '@dotoli/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    extends: [eslintConfig, "plugin:storybook/recommended"],
  },
]);
