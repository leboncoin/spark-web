import { expect, test } from '@playwright/test'

import { BASE_URL } from '../../constant'

test('combobox within a dialog', async ({ page }) => {
  await page.goto(`${BASE_URL}/combobox-within-dialog`)

  const dialogTrigger = page.getByRole('button', { name: 'Create account' })

  await test.step('can interact with a combobox within a dialog', async () => {
    await dialogTrigger.click()

    await page.getByPlaceholder('Pick a book').click()
    await page.getByRole('option', { name: 'To Kill a Mockingbird' }).click()

    await expect(page.getByRole('combobox', { name: 'books' })).toHaveValue('To Kill a Mockingbird')
  })

  await test.step('can also interact with adjacent button', async () => {
    await page.getByRole('button', { name: 'hello' }).click()
    await expect(page.getByRole('button', { name: 'clicked' })).toBeVisible()
  })
})
