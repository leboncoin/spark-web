import { expect, test } from '@playwright/test'

import { BASE_URL } from '../../constant'

test('dropdown within a dialog', async ({ page }) => {
  await page.goto(`${BASE_URL}/dropdown-within-dialog`)

  const dialogTrigger = page.getByRole('button', { name: 'Create account' })
  const dropdown = page.getByRole('combobox', { name: 'books' })

  await test.step('can interact with a dropdown within a dialog', async () => {
    await dialogTrigger.click()

    await dropdown.click()
    await page.getByRole('option', { name: 'To Kill a Mockingbird' }).click()

    await expect(dropdown).toHaveText('To Kill a Mockingbird')
  })

  await test.step('can also interact with adjacent button', async () => {
    await page.getByRole('button', { name: 'hello' }).click()
    await expect(page.getByRole('button', { name: 'clicked' })).toBeVisible()
  })
})
