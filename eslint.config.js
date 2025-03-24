// eslint.config.js
import nx from '@nx/eslint-plugin'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    ignores: ['.storybook/', 'bin/', '**/dist/', 'vite.config.ts', '*.cjs', 'node_modules/'],
  },
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json', // Adjust this if your tsconfig is elsewhere
        tsconfigRootDir: process.cwd(), // Ensures correct path resolution
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      '@typescript-eslint': ts,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      prettier: prettier,
      '@nx': nx,
    },
    rules: {
      // Prettier
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],

      // TypeScript
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array', readonly: 'array' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-interface': 'off',
      '@typescript-eslint/no-object-literal-type-assertion': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: false },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // React
      'jsx-quotes': ['warn', 'prefer-double'],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/jsx-key': 'off',
      'react/display-name': ['off', { ignoreTranspilerName: false }],

      // Import
      'import/no-absolute-path': 'off',
      'import/exports-last': 'off',

      // Sorting
      'simple-import-sort/imports': 'warn',

      // Misc
      'array-callback-return': 'warn',
      complexity: ['warn', 8],
      curly: ['warn', 'multi-line'],
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
      'max-depth': ['error', 5],
      'max-nested-callbacks': ['warn', 5],
      'newline-before-return': 'warn',
      'no-console': ['warn', { allow: ['error'] }],
      'no-debugger': 'warn',
      'no-nested-ternary': 'error',
      'no-shadow': 'off',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': ['warn', { allowShortCircuit: true }],
      'no-use-before-define': 'off',
      'no-var': 'error',
      quotes: ['warn', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
      'space-before-function-paren': [
        'warn',
        { anonymous: 'always', named: 'never', asyncArrow: 'always' },
      ],
    },
  },
  {
    files: ['documentation/**/*.ts', 'documentation/**/*.tsx'],
    ignores: [], // This prevents documentation files from being ignored
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
    rules: {
      'max-lines-per-function': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'max-nested-callbacks': ['warn', 8],
      'no-console': 'off',
    },
  },
  {
    files: ['packages/icons/src/tags.ts', 'packages/icons/src/index.ts'],
    rules: {
      'max-lines': 'off',
    },
  },
]
