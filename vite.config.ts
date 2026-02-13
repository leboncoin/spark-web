/// <reference types="vitest/config" />
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import path from 'path'

// https://vitejs.dev/config/
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  assetsInclude: ['**/*.md'],
  build: {
    target: browserslistToEsbuild(),
  },
  resolve: {
    alias: {
      '@docs': path.resolve(__dirname, './documentation'),
    },
  },
  // @ts-ignore
  test: {
    cache: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    coverage: {
      provider: 'v8',
      exclude: [
        '**/packages/**/*.doc.mdx',
        '**/packages/**/*.stories.tsx',
        '**/documentation/*',
        '**/dist/**',
      ],
      reportsDirectory: 'dist/coverage',
      reporter: [
        ['lcovonly', {}],
        [
          'json',
          {
            file: 'coverage.json',
          },
        ],
        ['html'],
        ['text'],
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
