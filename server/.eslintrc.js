const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'graphql'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 6,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    'graphql/template-strings': [
      'error',
      {
        schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
        tagName: 'graphql',
      },
    ],
  },
};
