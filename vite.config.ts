/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import path from 'path'

// https://vitejs.dev/config/
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
      reporter: [['lcovonly', {}], ['json', { file: 'coverage.json' }], ['html'], ['text']],
    },
  },
})
