// eslint.config.js (ESM)
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import routerPlugin from '@tanstack/eslint-plugin-router';

export default tseslint.config(
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  ...routerPlugin.configs['flat/recommended'],

  // Общие настройки под проект
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: { ...globals.browser, ...globals.node }
    },
    settings: {
      react: { version: 'detect' }
    },
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      '@typescript-eslint/only-throw-error': [
        'error',
        {
          allow: [
            {
              from: 'package',
              package: '@tanstack/router-core',
              name: 'Redirect'
            }
          ]
        }
      ]
    }
  },

  {
    ignores: ['dist', 'build', 'coverage', 'node_modules']
  }
);
