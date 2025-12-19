import { existsSync, readdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// Find all entry points (index.ts or index.tsx in each component directory)
const entryPoints: Record<string, string> = {}
const srcDir = resolve(__dirname, 'src')

readdirSync(srcDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const dirName = dirent.name
    const indexPath = resolve(srcDir, dirName, 'index.ts')
    const indexTsxPath = resolve(srcDir, dirName, 'index.tsx')

    if (existsSync(indexPath)) {
      entryPoints[dirName] = indexPath
    } else if (existsSync(indexTsxPath)) {
      entryPoints[dirName] = indexTsxPath
    }
  })

export default defineConfig({
  resolve: {
    alias: {
      '@spark-ui/components': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    dts({
      entryRoot: './src',
      outDir: './dist',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}', 'src/**/*.doc.*'],
      rollupTypes: false,
      copyDtsFiles: true,
      insertTypesEntry: false,
    }),
  ],
  build: {
    lib: {
      entry: entryPoints,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        return format === 'es' ? `${entryName}/index.mjs` : `${entryName}/index.js`
      },
    },
    rollupOptions: {
      external: id => {
        const isReactDependency = id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime'
        const isSparkComponent = id.startsWith('@spark-ui/components/')

        // Externalize all external dependencies
        if (isReactDependency) {
          return true
        }

        // Do not externalize internal @spark-ui/components imports (resolved via alias)
        if (isSparkComponent) {
          return false
        }

        // Externalize other @spark-ui packages
        if (id.startsWith('@spark-ui/')) {
          return true
        }

        // Externalize other node_modules dependencies
        if (!id.startsWith('.') && !id.startsWith('/') && !isSparkComponent) {
          try {
            const resolved = resolve(__dirname, id)
            if (!resolved.startsWith(__dirname)) {
              return true
            }
          } catch {
            return true
          }
        }

        return false
      },
      output: {
        preserveModules: false,
      },
    },
    target: 'esnext',
    sourcemap: true,
  },
})
