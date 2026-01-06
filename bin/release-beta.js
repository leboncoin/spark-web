#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const nxJsonPath = join(rootDir, 'nx.json')

// Read current config
const nxConfig = JSON.parse(readFileSync(nxJsonPath, 'utf-8'))
const originalConfig = JSON.parse(JSON.stringify(nxConfig)) // Deep copy

// Temporarily modify config to disable git and changelog
if (nxConfig.release) {
  // For nx release version, we need to use release.version.git instead of release.git
  // Remove release.git and create release.version.git
  if (nxConfig.release.git) {
    // Save original git config
    const originalGitConfig = { ...nxConfig.release.git }

    // Remove release.git (not compatible with nx release version)
    delete nxConfig.release.git

    // Create release.version.git with git disabled
    if (!nxConfig.release.version) {
      nxConfig.release.version = {}
    }
    nxConfig.release.version.git = {
      commit: false,
      tag: false,
      push: false,
      // Keep other options if they exist
      commitMessage: originalGitConfig.commitMessage,
      tagMessage: originalGitConfig.tagMessage,
      stageChanges: originalGitConfig.stageChanges || false,
    }
  }

  // Disable changelog
  if (nxConfig.release.changelog) {
    nxConfig.release.changelog.projectChangelogs = false
    nxConfig.release.changelog.workspaceChangelog = false
  }
}

// Write modified config
writeFileSync(nxJsonPath, JSON.stringify(nxConfig, null, 2) + '\n')

// Get command line arguments (except the script itself)
const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run') || args.includes('-d')

try {
  // Build commands
  const versionCmd = ['nx', 'release', 'version', 'prerelease', '--preid=beta']
  const publishCmd = ['nx', 'release', 'publish', '--tag=beta', '--yes']

  if (isDryRun) {
    versionCmd.push('--dry-run')
    publishCmd.push('--dry-run')
  }

  console.log('🚀 Running beta release...')
  if (isDryRun) {
    console.log('📋 DRY-RUN mode: No changes will be made\n')
  }
  console.log(`Step 1: Creating version...`)
  console.log(`Command: ${versionCmd.join(' ')}\n`)

  // Execute version command
  execSync(versionCmd.join(' '), { stdio: 'inherit', cwd: rootDir })

  console.log(`\nStep 2: Publishing...`)
  console.log(`Command: ${publishCmd.join(' ')}\n`)

  // Execute publish command
  // In dry-run mode, publish errors are normal (npm checks)
  try {
    execSync(publishCmd.join(' '), { stdio: 'inherit', cwd: rootDir })
  } catch (error) {
    if (isDryRun) {
      console.log('\n⚠️  Note: Publish errors in dry-run mode are expected.')
      console.log('   Nx Release checks npm registry even in dry-run mode.')
      console.log('   These errors will not occur when actually publishing.\n')
    } else {
      throw error
    }
  }
} finally {
  // Restore original config
  writeFileSync(nxJsonPath, JSON.stringify(originalConfig, null, 2) + '\n')
  console.log('\n✅ Configuration restored')
}
