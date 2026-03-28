import { readdirSync } from 'node:fs'
import { join, parse } from 'node:path'

import react from '@vitejs/plugin-react'
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
      // react/jsx-runtime must stay external: bundling its CJS into .mjs emits require() shims that break in the browser (Rolldown / Vite 8).
      external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      output: {
        exports: 'named',
      },
    },
  },
  plugins: [
    react(),
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
