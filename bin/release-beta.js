#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const nxJsonPath = join(rootDir, 'nx.json')
const packageJsonPath = join(rootDir, 'package.json')

// Check Node.js version before proceeding
function checkNodeVersion() {
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const requiredVersion = packageJson.engines?.node
    if (!requiredVersion) {
      console.warn('⚠️  No Node.js version requirement found in package.json')
      return
    }

    const currentVersion = execSync('node -v', { encoding: 'utf-8' }).trim().replace('v', '')
    const requiredMajor = parseInt(requiredVersion.split('.')[0])
    const currentMajor = parseInt(currentVersion.split('.')[0])

    if (currentMajor < requiredMajor) {
      console.error(
        `❌ Error: Node.js version mismatch!\n` +
          `   Required: ${requiredVersion}\n` +
          `   Current: ${currentVersion}\n` +
          `   Please use Node.js ${requiredMajor}.x.x or newer.`
      )
      process.exit(1)
    }

    if (currentMajor > requiredMajor) {
      console.warn(
        `⚠️  Warning: Node.js version mismatch!\n` +
          `   Required: ${requiredVersion}\n` +
          `   Current: ${currentVersion}\n` +
          `   Continuing anyway, but this may cause issues.`
      )
    }
  } catch (error) {
    console.warn('⚠️  Could not check Node.js version:', error.message)
  }
}

// Analyze commits in current branch (not in main) to determine version bump type
function analyzeCommitsForVersionBump() {
  try {
    // Ensure we have origin/main
    try {
      execSync('git fetch origin main --quiet', { cwd: rootDir, stdio: 'pipe' })
    } catch {
      try {
        execSync('git fetch origin main:refs/remotes/origin/main --quiet', {
          cwd: rootDir,
          stdio: 'pipe',
        })
      } catch {
        console.warn('⚠️  Could not fetch origin/main')
      }
    }

    // Get all commits in current branch that are not in main
    // Use format that separates commits clearly
    const commitsOutput = execSync(
      'git log --no-merges --format="%H%n%s%n%b%n---COMMIT_SEPARATOR---" origin/main..HEAD',
      { encoding: 'utf-8', cwd: rootDir, stdio: 'pipe' }
    )

    if (!commitsOutput || commitsOutput.trim().length === 0) {
      console.log('📦 No commits found in current branch (all commits are in main)')
      return { bumpType: 'patch', hasBreaking: false, commitCount: 0 }
    }

    // Split commits by separator
    const commitBlocks = commitsOutput.split('---COMMIT_SEPARATOR---').filter(block => block.trim())
    let hasFeat = false
    let hasFix = false
    let hasBreaking = false
    let commitCount = 0
    let breakingCommitCount = 0

    // Check each commit
    for (const block of commitBlocks) {
      const lines = block.trim().split('\n')
      if (lines.length < 2) continue // Need at least hash and subject

      const subject = lines[1] // Second line is the subject
      const body = lines.slice(2).join('\n') // Rest is the body

      // Check for conventional commit format in subject: type(scope): description
      const conventionalMatch = subject.match(
        /^(feat|fix|chore|refactor|docs|style|test|perf|ci|build|revert)(\(.+\))?(!)?:/i
      )

      let commitHasBreaking = false

      if (conventionalMatch) {
        commitCount++
        const type = conventionalMatch[1].toLowerCase()
        const hasExclamation = !!conventionalMatch[3] // feat!: or fix!:

        if (type === 'feat') {
          hasFeat = true
        } else if (type === 'fix') {
          hasFix = true
        }

        if (hasExclamation) {
          hasBreaking = true
          commitHasBreaking = true
        }
      }

      // Check for BREAKING CHANGE in commit body (case insensitive)
      if (/BREAKING CHANGE:/i.test(body)) {
        hasBreaking = true
        commitHasBreaking = true
      }

      if (commitHasBreaking) {
        breakingCommitCount++
      }
    }

    // Determine bump type based on commits
    let bumpType = 'patch' // default

    if (hasBreaking) {
      bumpType = 'major'
      if (breakingCommitCount === 1) {
        console.log(
          `🔴 Breaking change detected in 1 commit (out of ${commitCount} total) → MAJOR bump`
        )
      } else {
        console.log(
          `🔴 Breaking changes detected in ${breakingCommitCount} commit(s) (out of ${commitCount} total) → MAJOR bump`
        )
      }
    } else if (hasFeat) {
      bumpType = 'minor'
      console.log(`✨ Feature(s) detected in ${commitCount} commit(s) → MINOR bump`)
    } else if (hasFix) {
      bumpType = 'patch'
      console.log(`🐛 Fix(es) detected in ${commitCount} commit(s) → PATCH bump`)
    } else {
      console.log(`📝 Other commits detected (${commitCount}) → PATCH bump (default)`)
    }

    return { bumpType, hasBreaking, commitCount, breakingCommitCount }
  } catch (error) {
    console.warn('⚠️  Could not analyze commits:', error.message)
    // Fallback: assume patch
    return { bumpType: 'patch', hasBreaking: false, commitCount: 0 }
  }
}

// Get latest published versions from npm
function getPublishedVersions() {
  try {
    const npmVersions = execSync('npm view @spark-ui/components versions --json', {
      encoding: 'utf-8',
      cwd: rootDir,
      stdio: 'pipe',
    })
    const versions = JSON.parse(npmVersions)

    const stableVersions = versions.filter(v => !v.includes('-'))
    const betaVersions = versions.filter(v => v.includes('-beta.'))

    const latestStable =
      stableVersions.length > 0 ? stableVersions[stableVersions.length - 1] : null

    return { latestStable, allVersions: versions, betaVersions }
  } catch (error) {
    console.warn('⚠️  Could not fetch published versions:', error.message)
    return { latestStable: null, allVersions: [], betaVersions: [] }
  }
}

// Calculate target version based on bump type and latest stable
function calculateTargetVersion(latestStable, bumpType) {
  if (!latestStable) {
    console.warn('⚠️  No stable version found, assuming 1.0.0')
    return bumpType === 'major' ? '2.0.0' : bumpType === 'minor' ? '1.1.0' : '1.0.1'
  }

  const [major, minor, patch] = latestStable.split('.').map(Number)

  switch (bumpType) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    default:
      return `${major}.${minor}.${patch + 1}`
  }
}

// Determine Nx Release strategy
function determineVersionStrategy() {
  // Step 1: Analyze commits in current branch
  const { bumpType, hasBreaking, commitCount } = analyzeCommitsForVersionBump()

  if (commitCount === 0) {
    console.log('⚠️  No commits to release')
    return { strategy: 'prerelease', targetVersion: null }
  }

  // Step 2: Get published versions
  const { latestStable, betaVersions } = getPublishedVersions()

  if (!latestStable) {
    console.warn('⚠️  No stable version found on npm')
    return { strategy: 'prerelease', targetVersion: null }
  }

  // Step 3: Calculate target version
  const targetVersion = calculateTargetVersion(latestStable, bumpType)
  console.log(`📦 Latest stable: ${latestStable}`)
  console.log(`🎯 Target version: ${targetVersion}`)

  // Step 4: Check if a beta version already exists for this target
  const existingBeta = betaVersions.find(v => v.startsWith(targetVersion + '-beta.'))

  if (existingBeta) {
    // Beta version exists, use prerelease to increment
    const betaNumber = parseInt(existingBeta.split('-beta.')[1])
    const nextBeta = `${targetVersion}-beta.${betaNumber + 1}`
    console.log(`📦 Existing beta found: ${existingBeta}`)
    console.log(`   Will increment to: ${nextBeta}`)

    // CRITICAL: Nx Release uses git tags to determine base version, not npm
    // If the tag doesn't exist locally, Nx Release will use the latest stable version
    // We need to ensure the tag exists or create it
    const betaTag = `v${existingBeta}`
    let tagExists = false
    try {
      execSync(`git rev-parse --verify ${betaTag}`, { cwd: rootDir, stdio: 'pipe' })
      tagExists = true
      console.log(`   ✅ Tag ${betaTag} exists locally`)
    } catch {
      console.warn(`   ⚠️  Tag ${betaTag} doesn't exist locally`)
      console.warn(`   Nx Release will use ${latestStable} as base instead of ${existingBeta}`)
      console.warn(`   Attempting to create tag from npm metadata...`)

      // Try to find the commit that published this version
      // Look for commits that modified package.json files with this version
      try {
        // Search for commits that modified package.json files and contain this version
        let tagCommit = null

        // Method 1: Search in package.json files in git history
        try {
          const packageJsonFiles = [
            'packages/components/package.json',
            'packages/hooks/package.json',
            'packages/icons/package.json',
          ]

          for (const pkgPath of packageJsonFiles) {
            try {
              // Search for commits that added this version to package.json
              const commits = execSync(
                `git log --all --format="%H" --follow -- "${pkgPath}" | head -20`,
                { encoding: 'utf-8', cwd: rootDir, stdio: 'pipe' }
              )
                .trim()
                .split('\n')

              // Check each commit to see if it contains the version
              for (const commit of commits) {
                try {
                  const content = execSync(`git show ${commit}:${pkgPath} 2>/dev/null || echo ""`, {
                    encoding: 'utf-8',
                    cwd: rootDir,
                    stdio: 'pipe',
                  })
                  if (
                    content.includes(`"version": "${existingBeta}"`) ||
                    content.includes(`"version":"${existingBeta}"`)
                  ) {
                    tagCommit = commit
                    console.log(
                      `   Found commit with version ${existingBeta}: ${commit.substring(0, 7)}`
                    )
                    break
                  }
                } catch {
                  // File might not exist in this commit, continue
                }
              }

              if (tagCommit) break
            } catch {
              // Continue to next file
            }
          }
        } catch {
          // Fallback method
        }

        // Method 2: Use merge-base as fallback (commit where branch diverged from main)
        if (!tagCommit) {
          try {
            tagCommit = execSync('git merge-base origin/main HEAD', {
              encoding: 'utf-8',
              cwd: rootDir,
              stdio: 'pipe',
            }).trim()
            console.log(`   Using merge-base commit as fallback: ${tagCommit.substring(0, 7)}`)
          } catch {
            // Last resort: use HEAD of main
            tagCommit = execSync('git rev-parse origin/main', {
              encoding: 'utf-8',
              cwd: rootDir,
              stdio: 'pipe',
            }).trim()
            console.log(`   Using origin/main HEAD as fallback: ${tagCommit.substring(0, 7)}`)
          }
        }

        // Create the tag (lightweight, won't be pushed since we disabled git push)
        if (tagCommit) {
          try {
            execSync(`git tag ${betaTag} ${tagCommit}`, { cwd: rootDir, stdio: 'pipe' })
            console.log(`   ✅ Created tag ${betaTag} on commit ${tagCommit.substring(0, 7)}`)
            tagExists = true
          } catch (error) {
            console.warn(`   ⚠️  Could not create tag: ${error.message}`)
            console.warn(`   Nx Release may still use wrong base version`)
          }
        }
      } catch (error) {
        console.warn(`   ⚠️  Could not determine commit for tag: ${error.message}`)
      }
    }

    console.log(`   Strategy: prerelease (increment existing beta)`)
    return { strategy: 'prerelease', targetVersion, existingBeta, nextBeta, tagCreated: !tagExists }
  } else {
    // No beta exists, create first beta for this version
    const firstBeta = `${targetVersion}-beta.0`
    console.log(`📦 No existing beta for ${targetVersion}`)
    console.log(`   Will create: ${firstBeta}`)

    // Map bump type to Nx strategy
    const strategy =
      bumpType === 'major' ? 'premajor' : bumpType === 'minor' ? 'preminor' : 'prepatch'

    console.log(`   Strategy: ${strategy} (create first beta)`)
    return { strategy, targetVersion, firstBeta }
  }
}

// Check Node.js version first
checkNodeVersion()

// Ensure git tags and main branch are up to date
try {
  console.log('📥 Fetching git tags and main branch...')
  execSync('git fetch --tags --quiet', { cwd: rootDir, stdio: 'pipe' })
  try {
    execSync('git fetch origin main --quiet', { cwd: rootDir, stdio: 'pipe' })
  } catch {
    // Ignore if main branch fetch fails
  }
  console.log('✅ Git tags and branches are up to date\n')
} catch (error) {
  console.warn('⚠️  Could not fetch git data:', error.message)
}

// Read current config
const nxConfig = JSON.parse(readFileSync(nxJsonPath, 'utf-8'))
const originalConfig = JSON.parse(JSON.stringify(nxConfig))

// Temporarily modify config to disable git and changelog
if (nxConfig.release) {
  if (nxConfig.release.git) {
    const originalGitConfig = { ...nxConfig.release.git }
    delete nxConfig.release.git

    if (!nxConfig.release.version) {
      nxConfig.release.version = {}
    }
    nxConfig.release.version.git = {
      commit: false,
      tag: false,
      push: false,
      commitMessage: originalGitConfig.commitMessage,
      tagMessage: originalGitConfig.tagMessage,
      stageChanges: originalGitConfig.stageChanges || false,
    }
  }

  if (nxConfig.release.changelog) {
    nxConfig.release.changelog.projectChangelogs = false
    nxConfig.release.changelog.workspaceChangelog = false
  }

  if (!nxConfig.release.version.versionActionsOptions) {
    nxConfig.release.version.versionActionsOptions = {}
  }
  nxConfig.release.version.versionActionsOptions.installIgnoreScripts = true
}

// Write modified config
writeFileSync(nxJsonPath, JSON.stringify(nxConfig, null, 2) + '\n')

// Get command line arguments
const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run') || args.includes('-d')

// Determine version strategy
const { strategy, targetVersion } = determineVersionStrategy()

if (!targetVersion) {
  console.error('❌ Could not determine target version. Exiting.')
  process.exit(1)
}

try {
  // Build commands
  const versionCmd = ['nx', 'release', 'version', strategy, '--preid=beta']
  const publishCmd = ['nx', 'release', 'publish', '--tag=beta', '--yes']

  if (isDryRun) {
    versionCmd.push('--dry-run')
    publishCmd.push('--dry-run')
  }

  console.log('\n🚀 Running beta release...')
  if (isDryRun) {
    console.log('📋 DRY-RUN mode: No changes will be made\n')
  }
  console.log(`Step 1: Creating version (${strategy})...`)
  console.log(`Command: ${versionCmd.join(' ')}\n`)

  // Execute version command
  execSync(versionCmd.join(' '), { stdio: 'inherit', cwd: rootDir })

  console.log(`\nStep 2: Publishing...`)
  console.log(`Command: ${publishCmd.join(' ')}\n`)

  // Execute publish command
  try {
    execSync(publishCmd.join(' '), { stdio: 'inherit', cwd: rootDir })
  } catch (error) {
    if (isDryRun) {
      console.log('\n⚠️  Note: Publish errors in dry-run mode are expected.')
      console.log('   Nx Release checks npm registry even in dry-run mode.\n')
    } else {
      throw error
    }
  }
} finally {
  // Restore original config
  writeFileSync(nxJsonPath, JSON.stringify(originalConfig, null, 2) + '\n')
  console.log('\n✅ Configuration restored')
}
