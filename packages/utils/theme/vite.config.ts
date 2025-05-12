import terser from '@rollup/plugin-terser'
import path from 'path'
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
        cssFileName: 'style', // https://vite.dev/guide/migration#customize-css-output-file-name-in-library-mode
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
