import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
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
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.*', 'src/**/*.doc.*', 'src/**/*.stories.*'],
      entryRoot: 'src',
      outDir: 'dist',
      rollupTypes: false,
      insertTypesEntry: false,
      copyDtsFiles: false,
      afterBuild: () => {
        const distSrc = join(__dirname, 'dist/src')
        if (!existsSync(distSrc)) return

        for (const entry of readdirSync(distSrc, { withFileTypes: true })) {
          if (!entry.isDirectory()) continue

          const fromDir = join(distSrc, entry.name)
          const toDir = join(__dirname, 'dist', entry.name)

          for (const file of readdirSync(fromDir)) {
            if (file.endsWith('.d.ts')) {
              cpSync(join(fromDir, file), join(toDir, file), { force: true })
            }
          }
        }

        rmSync(distSrc, { recursive: true })
      },
    }),
  ],
})
