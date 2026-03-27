import { readdirSync } from 'node:fs'
import { join, parse } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const iconsDir = join(__dirname, 'src', 'icons')

const iconEntries = Object.fromEntries(
  readdirSync(iconsDir, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(ts|tsx)$/.test(entry.name))
    .map(entry => {
      const name = parse(entry.name).name

      return [`icons/${name}`, join(iconsDir, entry.name)]
    })
)

const input = {
  index: join(__dirname, 'src', 'index.ts'),
  ...iconEntries,
}

export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
    lib: {
      entry: input,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'js'}`,
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
      include: ['src/index.ts', 'src/icons/**/*.{ts,tsx}', 'src/Types.ts', 'src/tags.ts'],
      entryRoot: 'src',
      outDir: 'dist',
      rollupTypes: false,
      insertTypesEntry: false,
      copyDtsFiles: false,
    }),
  ],
})
