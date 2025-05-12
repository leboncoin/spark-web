import path from 'path'
import terser from '@rollup/plugin-terser'
import dts from 'vite-plugin-dts'

const pkg = require(path.resolve(__dirname, './package.json'))

const deps = Object.keys(pkg.dependencies || {})
const devDeps = Object.keys(pkg.devDependencies || {})

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
        external: [...deps, ...devDeps],
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
