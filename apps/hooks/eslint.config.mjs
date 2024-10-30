import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier
  ],
  ignores: ["dist"],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: tsParser
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "eslint-plugin-prettier": eslintPluginPrettier,
    react
  },
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    ...reactHooks.configs.recommended.rules,
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "no-console": "error"
  }
});
