export default () => `import terser from '@rollup/plugin-terser'
import dts from 'vite-plugin-dts'
import browserslistToEsbuild from 'browserslist-to-esbuild'

export default {
  build: {
    target: browserslistToEsbuild(),
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['node:path', 'node:fs'],
      plugins: [terser()],
    },
  },
  plugins: [
    dts({
      entryRoot: './src',
    }),
  ],
}
`
