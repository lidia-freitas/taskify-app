import globals from 'globals';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2025,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {},
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'max-len': ['error', { code: 180 }],
      'no-console': 'off',
      'object-curly-newline': 'off',
    },
  },
  {
    ignores: ['dist/**', '**/.*'],
  }
];
