import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// Find all entry points (index.ts or index.tsx in each component directory)
// Same pattern as tsup: src/*/index.(ts|tsx)
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
      bundledPackages: [],
      afterBuild: () => {
        // Generate .d.mts files from .d.ts files (same content, different extension)
        // This matches tsup's behavior of generating both .d.ts and .d.mts
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
        // Externalize react (same as tsup external: ['react'])
        if (id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime') {
          return true
        }

        // Externalize @spark-ui/components/form-field (same as tsup external: ['@spark-ui/components/form-field'])
        if (id === '@spark-ui/components/form-field') {
          return true
        }

        // Bundle other @spark-ui/components imports (same as tsup noExternal: ['!@spark-ui/components/form-field'])
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
