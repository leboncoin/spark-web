import { createRequire } from 'node:module'
import { join } from 'node:path'

import terser from '@rollup/plugin-terser'
import react from '@vitejs/plugin-react'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import dts from 'vite-plugin-dts'

import sparkDocgen from './plugins/sparkDocgen'

const require = createRequire(import.meta.url)

const rootPkg = require('../package.json')
const rootDeps = Object.keys(rootPkg.dependencies || {})
const rootDevDeps = Object.keys(rootPkg.devDependencies || {})

export function buildComponentConfig(
  path: string,
  preserveModules: boolean,
  external: string[] = []
) {
  const pkg = require(join(path, '/package.json'))
  const deps = [...Object.keys(pkg.dependencies || {}), ...external]
  const devDeps = Object.keys(pkg.devDependencies || {})

  return {
    build: {
      target: browserslistToEsbuild(),
      lib: {
        entry: 'src/index.ts',
        formats: ['es', 'cjs'],
        fileName: '[name]',
      },
      rollupOptions: {
        external: [...deps, ...rootDeps, ...devDeps, ...rootDevDeps],
        plugins: [terser(), sparkDocgen()],
        preserveModules,
      },
    },
    plugins: [
      dts({
        /** To avoid bundling types into a package/components folder inside of dist */
        entryRoot: './src',
      }),
      react({
        jsxRuntime: 'classic',
      }),
    ],
  }
}
