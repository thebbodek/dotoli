/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  useTabs: false,
  tabWidth: 2,
  endOfLine: 'lf',
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  tailwindFunctions: ['clsx'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: ['^@/(.*)', '^\\.\\.?/(.*)'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};

export default config;
