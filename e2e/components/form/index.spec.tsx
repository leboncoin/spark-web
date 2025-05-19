import { expect, test } from '@playwright/test'

import { BASE_URL } from '../../constant'

const implementations = [
  {
    dialog: 'spark-form-within-dialog',
  },
  {
    drawer: 'spark-form-within-drawer',
  },
]

test.describe('Spark form components', () => {
  implementations.forEach(implem => {
    test(`Spark form within ${Object.keys(implem)[0]}`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${Object.values(implem)[0]}`)

      const dropdown = page.getByRole('combobox', { name: 'position' })
      const dropdownMulti = page.getByRole('combobox', { name: 'hobbies' })

      // Dropdown
      await test.step('should toggle menu', async () => {
        await dropdown.click()
        await expect(page.getByRole('option')).toHaveCount(5)

        await dropdown.blur()
        await expect(page.getByRole('option')).toHaveCount(0)
      })

      await test.step('should update values from options', async () => {
        // Simple Dropdown selection
        await dropdown.click()
        await page.getByRole('option', { name: 'Engineering Manager' }).click()

        await expect(page.getByRole('option')).toHaveCount(0)
        await expect(dropdown).toHaveText('Engineering Manager')

        // Multiple Dropdown selection
        await dropdownMulti.click()
        await expect(page.getByRole('option')).toHaveCount(4)

        /**
         * There is an issue on Downshift, that makes onMouseMove and onClick events triggered
         * in the same frame, leading to inaccurate values.
         * So we need to use this workaround here (delay).
         *
         * See https://github.com/downshift-js/downshift/pull/1571#issuecomment-2079395469
         */
        await page.getByRole('option', { name: 'Cooking' }).click({ delay: 1 })
        await expect(dropdownMulti).toHaveText('Cooking')

        await page.getByRole('option', { name: 'Sport' }).click({ delay: 1 })

        await expect(page.getByRole('option')).toHaveCount(4)
        await expect(dropdownMulti).toHaveText('Cooking, +1')
      })

      await test.step('should update values from options using keyboard', async () => {
        // Simple Dropdown selection
        await expect(dropdown).toHaveText('Engineering Manager')

        await dropdown.press('ArrowDown')
        await expect(page.getByRole('option')).toHaveCount(5)

        await dropdown.press('ArrowDown')
        await dropdown.press('Enter')

        await expect(dropdown).toHaveText('Product Manager')

        // Multiple Dropdown selection
        await expect(dropdownMulti).toHaveText('Cooking, +1')

        await dropdownMulti.press('Space')
        await expect(page.getByRole('option')).toHaveCount(4)

        await page.getByRole('option', { name: 'Sport' }).press('Space')
        await expect(dropdownMulti).toHaveText('Cooking')
      })
    })
  })
})
