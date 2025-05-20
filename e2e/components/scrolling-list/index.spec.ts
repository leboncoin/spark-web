/* eslint-disable max-lines-per-function */
import { expect, type Locator, test } from '@playwright/test'

import { BASE_URL } from '../../constant'

async function isFullyVisibleInContainer(
  item: Locator | undefined,
  container: Locator | undefined
) {
  if (!item || !container) return false

  const itemBox = await item.boundingBox()
  const containerBox = await container.boundingBox()

  if (containerBox && itemBox) {
    const isVisible =
      itemBox.x >= containerBox.x && // Check left boundary
      itemBox.x + itemBox.width <= containerBox.x + containerBox.width && // Check right boundary
      itemBox.y >= containerBox.y && // Check top boundary
      itemBox.y + itemBox.height <= containerBox.y + containerBox.height // Check bottom boundary

    return isVisible
  } else {
    return false
  }
}

/**
 * UATs (Access restricted to Spark team): https://docs.google.com/spreadsheets/d/1Lpp_3QO6WQn4TNLHgEahYG6dsQ9ozBx1xptFvxfws8Y/edit?usp=sharing
 */
test.describe('Spark scrolling list', () => {
  test('should traverse the scrolling list', async ({ page }) => {
    await page.goto(`${BASE_URL}/scrolling-list?variant=default`)

    // Wait for network to be idle and ensure the page is stable
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')

    const scrollingList = page.getByRole('list', { name: 'Popular products' })
    const items = await scrollingList.locator('[role="listitem"]').all()
    const skipButton = page.getByRole('button', { name: 'Ignore the list' })
    const prevButton = page.getByRole('button', { name: 'Previous items' })
    const nextButton = page.getByRole('button', { name: 'Next items' })

    await test.step('default position (start of the list)', async () => {
      await expect(scrollingList).toBeAttached()
      await expect(items.length).toBe(6)
      await expect(skipButton).toBeAttached()
      await expect(skipButton).toHaveAccessibleDescription('Popular products')

      await expect(prevButton).not.toBeAttached()
      await expect(nextButton).toBeAttached()

      // Then only 2 first items are fully visible, as the list has 500px width and its items have 200px width
      expect(await isFullyVisibleInContainer(items[0], scrollingList)).toBe(true)
      expect(await isFullyVisibleInContainer(items[1], scrollingList)).toBe(true)
      expect(await isFullyVisibleInContainer(items[2], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[3], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[4], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[5], scrollingList)).toBe(false)
    })

    await test.step('click on next button and next set of items (from item 3)', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()

      // Then items 3 and 4 are fully visible, as the list has 500px width and its items have 200px width
      await expect(await isFullyVisibleInContainer(items[0], scrollingList)).toBe(false)
      await expect(await isFullyVisibleInContainer(items[1], scrollingList)).toBe(false)
      await expect(await isFullyVisibleInContainer(items[2], scrollingList)).toBe(true)
      await expect(await isFullyVisibleInContainer(items[3], scrollingList)).toBe(true)
      await expect(await isFullyVisibleInContainer(items[4], scrollingList)).toBe(false)
      await expect(await isFullyVisibleInContainer(items[5], scrollingList)).toBe(false)
    })

    await test.step('click on next button and navigate to visible items (out of 6)', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).not.toBeAttached()

      // Then items 5 and 6 are fully visible, as the list has 500px width and its items have 200px width
      await expect(await isFullyVisibleInContainer(items[0], scrollingList)).toBe(false)
      await expect(await isFullyVisibleInContainer(items[1], scrollingList)).toBe(false)
      await expect(await isFullyVisibleInContainer(items[2], scrollingList)).toBe(false)
      await expect(await isFullyVisibleInContainer(items[3], scrollingList)).toBe(false)
      await expect(await isFullyVisibleInContainer(items[4], scrollingList)).toBe(true)
      await expect(await isFullyVisibleInContainer(items[5], scrollingList)).toBe(true)
    })
  })

  test('should loop using controls', async ({ page }) => {
    await page.goto(`${BASE_URL}/scrolling-list?variant=loop`)

    // Wait for network to be idle and ensure the page is stable
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')

    const scrollingList = page.getByRole('list', { name: 'Popular products' })
    const items = await scrollingList.locator('[role="listitem"]').all()
    const prevButton = page.getByRole('button', { name: 'Previous items' })
    const nextButton = page.getByRole('button', { name: 'Next items' })

    await test.step('default position (start of the list)', async () => {
      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()

      // Then only 2 first items are fully visible, as the list has 500px width and its items have 200px width
      expect(await isFullyVisibleInContainer(items[0], scrollingList)).toBe(true)
      expect(await isFullyVisibleInContainer(items[1], scrollingList)).toBe(true)
      expect(await isFullyVisibleInContainer(items[2], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[3], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[4], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[5], scrollingList)).toBe(false)
    })

    await test.step('go left from start (reach end of the list)', async () => {
      await prevButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()

      // Then only 2 last items are fully visible, as the list has 500px width and its items have 200px width
      expect(await isFullyVisibleInContainer(items[0], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[1], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[2], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[3], scrollingList)).toBe(false)
      expect(await isFullyVisibleInContainer(items[4], scrollingList)).toBe(true)
      expect(await isFullyVisibleInContainer(items[5], scrollingList)).toBe(true)
    })
  })

  test('should hide controls when carousel has only one page', async ({ page }) => {
    await page.goto(`${BASE_URL}/scrolling-list?variant=singlePage`)

    // Wait for network to be idle and ensure the page is stable
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')

    const scrollingList = page.getByRole('list', { name: 'Popular products' })
    const items = await scrollingList.locator('[role="listitem"]').all()
    const prevButton = page.getByRole('button', { name: 'Previous items' })
    const nextButton = page.getByRole('button', { name: 'Next items' })

    await test.step('default position (start of the list)', async () => {
      await expect(prevButton).not.toBeAttached()
      await expect(nextButton).not.toBeAttached()

      // Then only 2 first items are fully visible, as the list has 500px width and its items have 200px width
      expect(await isFullyVisibleInContainer(items[0], scrollingList)).toBe(true)
      expect(await isFullyVisibleInContainer(items[1], scrollingList)).toBe(true)
    })
  })
})
