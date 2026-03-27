import { join, resolve } from 'node:path'

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
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
      entryRoot: resolve(__dirname, 'src'),
      outDir: resolve(__dirname, 'dist'),
      include: [
        'src/**/*.{ts,tsx}',
        resolve(__dirname, '../../global.d.ts'),
        resolve(__dirname, 'global.d.ts'),
      ],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}', 'src/**/*.doc.*'],
      rollupTypes: false,
      copyDtsFiles: true,
      bundledPackages: [],
      afterBuild: () => {
        const distDir = resolve(__dirname, 'dist')

        // Find all index.d.ts files in component directories
        const findIndexDtsFiles = (dir: string): string[] => {
          const files: string[] = []
          const entries = readdirSync(dir, { withFileTypes: true })

          for (const entry of entries) {
            const fullPath = join(dir, entry.name)
            if (entry.isDirectory()) {
              files.push(...findIndexDtsFiles(fullPath))
            } else if (entry.name === 'index.d.ts') {
              files.push(fullPath)
            }
          }

          return files
        }

        const indexDtsFiles = findIndexDtsFiles(distDir)

        for (const dtsPath of indexDtsFiles) {
          const dtsContent = readFileSync(dtsPath, 'utf-8')
          const dmtsPath = dtsPath.replace(/\.d\.ts$/, '.d.mts')
          writeFileSync(dmtsPath, dtsContent, 'utf-8')
        }
      },
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
        if (id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime') {
          return true
        }

        if (id === '@spark-ui/components/form-field') {
          return true
        }

        if (id.startsWith('@spark-ui/components/')) {
          return false
        }

        // Externalize other @spark-ui packages
        if (id.startsWith('@spark-ui/')) {
          return true
        }

        // Externalize node_modules dependencies
        if (!id.startsWith('.') && !id.startsWith('/')) {
          return true
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
