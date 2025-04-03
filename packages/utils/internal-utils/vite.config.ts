import terser from '@rollup/plugin-terser'
import dts from 'vite-plugin-dts'

const pkg = require('./package.json')
const peerDeps = Object.keys(pkg.peerDependencies || {})

export default async () => {
  const browserslistToEsbuild = await import('browserslist-to-esbuild')

  return {
    build: {
      target: browserslistToEsbuild.default(),
      lib: {
        entry: 'src/index.ts',
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
      rollupOptions: {
        external: ['node:path', 'node:fs', ...peerDeps],
        plugins: [terser()],
      },
    },
    plugins: [
      dts({
        entryRoot: './src',
      }),
    ],
  }
}
