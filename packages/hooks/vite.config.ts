import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const srcDir = join(__dirname, 'src')
const hookDirectories = readdirSync(srcDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)

const input = Object.fromEntries(
  hookDirectories.map(directory => [directory, join(srcDir, directory, 'index.ts')])
)

export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
    lib: {
      entry: input,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}/index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        exports: 'named',
      },
    },
  },
  plugins: [
    dts({
      include: ['src/*/index.ts'],
      entryRoot: 'src',
      outDir: 'dist',
      rollupTypes: false,
      insertTypesEntry: false,
      copyDtsFiles: false,
    }),
  ],
})
