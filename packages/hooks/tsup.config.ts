import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    entryPoints: ['src/*/index.(ts|tsx)'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    external: ['react'],
  }
})
