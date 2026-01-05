import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    entryPoints: ['src/*/index.(ts|tsx)'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    external: ['react', '@spark-ui/components/form-field'],
    noExternal: ['!@spark-ui/components/form-field'],
  }
})
