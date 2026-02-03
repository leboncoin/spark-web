#!/usr/bin/env node

/**
 * Wrapper script to run a11y tests with optional component filtering.
 * Extracts component names from command line arguments and passes them
 * as A11Y_COMPONENTS environment variable.
 * 
 * Usage via npm:
 *   npm run test:a11y -- tabs
 *   npm run test:a11y -- tabs button card
 *   npm run test:a11y -- tabs --workers 1
 */

const { execSync } = require('child_process')

// Get all arguments (npm passes arguments after -- to the script)
const args = process.argv.slice(2)

// Playwright flags that take values
const playwrightFlagsWithValues = [
  '--grep',
  '--grep-invert',
  '--project',
  '--workers',
  '--timeout',
  '--retries',
  '--reporter',
  '--output',
  '--config',
  '-g',
]

// Extract component names and separate Playwright arguments
const components = []
const playwrightArgs = []
let skipNext = false

for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  
  // Skip if this is a flag value
  if (skipNext) {
    playwrightArgs.push(arg)
    skipNext = false
    continue
  }
  
  // Check if it's a Playwright flag with value
  const isFlagWithValue = playwrightFlagsWithValues.some(flag => {
    if (arg.startsWith(flag + '=') || arg.startsWith(flag + ':')) {
      return true
    }
    if (arg === flag) {
      skipNext = true
      return true
    }
    return false
  })
  
  if (isFlagWithValue) {
    playwrightArgs.push(arg)
    continue
  }
  
  // Check if it's a boolean flag (starts with -- or -)
  if (arg.startsWith('--') || (arg.startsWith('-') && arg.length > 1 && !/^\d/.test(arg))) {
    playwrightArgs.push(arg)
    continue
  }
  
  // If it's not a flag, it's likely a component name
  components.push(arg)
}

// Set environment variable if components were specified
if (components.length > 0) {
  process.env.A11Y_COMPONENTS = components.join(',')
}

// Run Playwright tests with only Playwright arguments (not component names)
const playwrightCommand = playwrightArgs.length > 0 
  ? `npx playwright test -g "should not have any accessibility issues" ${playwrightArgs.join(' ')}`
  : `npx playwright test -g "should not have any accessibility issues"`

execSync(playwrightCommand, { stdio: 'inherit', env: process.env })
