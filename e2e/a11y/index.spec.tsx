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
const components = Object.keys(a11yComponents) as A11yComponentsKey[]

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
