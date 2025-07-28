import { defineConfig } from 'tsup'

// Import des utilitaires de docgen
import {
  getAllFilesInDirectory,
  getDocgen,
  writeDocgen,
} from '../../config/plugins/sparkDocgen/utils'

export default defineConfig(() => {
  return {
    entryPoints: ['src/*/index.(ts|tsx)'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    external: ['react', '@spark-ui/components/form-field'],
    noExternal: ['!@spark-ui/components/form-field'],
    onSuccess: async () => {
      console.log('[tsup:spark-docgen] Generating docgen.json for @spark-ui/components')

      // Récupérer tous les fichiers source
      const sourceFiles = getAllFilesInDirectory('./src')

      // Générer la docgen
      const docs = getDocgen(sourceFiles)

      // Écrire le fichier docgen.json dans le dossier dist
      const docgenPath = './dist/docgen.json'
      writeDocgen(docgenPath, docs)

      console.log(`[tsup:spark-docgen] Generated ${docgenPath}`)
    },
  }
})
