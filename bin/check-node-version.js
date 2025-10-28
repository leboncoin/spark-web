#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const expectedVersion = readFileSync('.nvmrc').toString().trim()
const currentVersion = execSync('node -v').toString().trim().replace('v', '')

// Extract major version numbers
const expectedMajor = parseInt(expectedVersion.split('.')[0])
const currentMajor = parseInt(currentVersion.split('.')[0])

// Accept the exact version or any newer major version
if (currentMajor < expectedMajor) {
  console.error(
    `Error: expected Node.js version ${expectedMajor}.x.x or newer, but got ${currentMajor}.x.x`
  )
  process.exit(1)
}
