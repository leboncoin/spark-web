import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { BASE_URL } from '../constant'
import { AxeOptions } from './config'
import { a11yComponents, type A11yComponentsKey } from './routes/components'
import { buildComponentReport, buildGlobalReport } from './utils'

/**
 * This is the main A11y test for Spark UI. We loop through each component's implementation
 * then test accessibility using shared configuration from configuration file.
 * At the end of the test suite we will export a global report.
 */
const allComponents = Object.keys(a11yComponents) as A11yComponentsKey[]

// Filter components based on A11Y_COMPONENTS environment variable
// Set via command line arguments: npm run test:a11y -- tabs button
const filterComponents = (): A11yComponentsKey[] => {
  const envFilter = process.env.A11Y_COMPONENTS

  if (!envFilter) {
    return allComponents
  }

  const requestedComponents = envFilter
    .split(',')
    .map(c => c.trim().toLowerCase())
    .filter(Boolean)

  if (requestedComponents.length === 0) {
    return allComponents
  }

  // Filter and validate components
  const filtered = allComponents.filter(component => {
    return requestedComponents.includes(component.toLowerCase())
  })

  // Warn about invalid component names
  const invalid = requestedComponents.filter(
    req => !allComponents.some(comp => comp.toLowerCase() === req.toLowerCase())
  )

  if (invalid.length > 0) {
    console.warn(
      `⚠️  Warning: The following components were not found and will be ignored: ${invalid.join(', ')}`
    )
    console.warn(`   Available components: ${allComponents.join(', ')}`)
  }

  if (filtered.length === 0) {
    console.warn('⚠️  No valid components found. Running all tests.')
    return allComponents
  }

  return filtered
}

const components = filterComponents()

// Log which components will be tested
if (process.env.A11Y_COMPONENTS) {
  console.log(`\n🔍 Testing accessibility for: ${components.join(', ')}\n`)
} else {
  console.log(`\n🔍 Testing accessibility for all components (${components.length} total)\n`)
}

test.describe('Spark UI accessibility', () => {
  test.describe.configure({ mode: 'default' })

  components.forEach(component => {
    test(`${component} should not have any accessibility issues`, async ({ page }, testInfo) => {
      // Navigate to the component page
      await page.goto(`${BASE_URL}/a11y/${component}`)

      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle')

      // Run accessibility tests
      const results = await new AxeBuilder({ page }).options({ ...AxeOptions }).analyze()

      await buildComponentReport({
        component,
        results,
        testInfo,
      })

      expect(results.violations).toEqual([])
    })
  })

  test.afterAll(() => buildGlobalReport({ components }))
})
