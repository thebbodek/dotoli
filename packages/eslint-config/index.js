module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react'],
  rules: {
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    semi: [2, 'always'],
    '@next/next/no-img-element': 'off',
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'prettier',
  ],
};
