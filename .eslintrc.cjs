const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
  ].map(require.resolve),
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['node_modules', 'dist', '.eslintrc.cjs'],
};
