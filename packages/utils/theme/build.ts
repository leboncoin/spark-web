#!/usr/bin/env node

import cssnano from 'cssnano'
import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import postcssImport from 'postcss-import'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, 'dist')
const themesDir = path.join(distDir, 'themes')

// Créer les dossiers nécessaires
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}
if (!fs.existsSync(themesDir)) {
  fs.mkdirSync(themesDir, { recursive: true })
}

interface BuildConfig {
  input: string
  output: string
}

const builds: BuildConfig[] = [
  { input: 'src/base.css', output: 'dist/base.css' },
  { input: 'src/themes.css', output: 'dist/themes.css' },
  { input: 'src/light-theme.css', output: 'dist/themes/light.css' },
  { input: 'src/dark-theme.css', output: 'dist/themes/dark.css' },
  { input: 'src/light-theme-more-contrast.css', output: 'dist/themes/light-more-contrast.css' },
  { input: 'src/dark-theme-more-contrast.css', output: 'dist/themes/dark-more-contrast.css' },
]

// eslint-disable-next-line no-console
console.log('Building theme files...\n')

async function buildFile({ input, output }: BuildConfig): Promise<void> {
  const inputPath = path.join(__dirname, input)
  const outputPath = path.join(__dirname, output)

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`)
  }

  const css = fs.readFileSync(inputPath, 'utf8')
  const result = await postcss([postcssImport(), cssnano()]).process(css, {
    from: inputPath,
    to: outputPath,
  })

  fs.writeFileSync(outputPath, result.css)
  // eslint-disable-next-line no-console
  console.log(`✓ Built ${output}`)
}

async function buildAll(): Promise<void> {
  try {
    await Promise.all(builds.map(buildFile))
    // eslint-disable-next-line no-console
    console.log('\n✅ Build completed successfully!')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error:', errorMessage)
    process.exit(1)
  }
}

buildAll()
