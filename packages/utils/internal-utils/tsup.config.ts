import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    entryPoints: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    external: ['node:path', 'node:fs', 'react', 'react-dom'],
    clean: true,
  }
})
