import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'public/**',
      '.vercel/**',
      '.turbo/**',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      /**
       * Default rules
       * @see https://eslint.org/docs/latest/rules/
       */
      // Disable console.log to encourage more explicit logging
      'no-console': [
        'warn',
        {
          allow: [
            'warn',
            'error',
            'info',
            'dir',
            'table',
            'assert',
            'count',
            'time',
            'timeLog',
            'trace',
            'groupCollapsed',
            'groupEnd',
          ],
        },
      ],
      'no-alert': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-template': 'warn',
      'no-implicit-coercion': 'warn',
      'require-await': 'warn',
      'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
      'no-restricted-imports': 'off',
      'padding-line-between-statements': 'warn',
    },
  },
);
