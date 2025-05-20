/* eslint-disable max-lines-per-function */
import { expect, test } from '@playwright/test'

import { BASE_URL } from '../../constant'

/**
 * UATs (Access restricted to Spark team): https://docs.google.com/spreadsheets/d/1Lpp_3QO6WQn4TNLHgEahYG6dsQ9ozBx1xptFvxfws8Y/edit?usp=sharing
 */
test.describe('Spark carousel', () => {
  test('should traverse the carousel', async ({ page }) => {
    await page.goto(`${BASE_URL}/carousel?variant=default`)

    const carousel = page.getByRole('region')
    const slides = await page.locator('[role="group"]').all()
    const prevButton = carousel.getByRole('button', { name: 'Previous group of items' })
    const nextButton = carousel.getByRole('button', { name: 'Next group of items' })
    const pagePicker = carousel.getByRole('radiogroup')

    await test.step('default position (page 1 of 3)', async () => {
      await expect(carousel).toBeAttached()
      await expect(slides.length).toBe(3)
      await expect
        .poll(async () => {
          return await carousel.getByRole('radio').count()
        })
        .toBe(3)
      await expect(pagePicker).toBeAttached()

      await expect(prevButton).not.toBeAttached()
      await expect(nextButton).toBeAttached()
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 1' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate to page 2', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 2' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate to last page', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).not.toBeAttached()
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 3' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
  })

  test('should render on default page (prop)', async ({ page }) => {
    await page.goto(`${BASE_URL}/carousel?variant=defaultPage`)

    const carousel = page.getByRole('region')
    const prevButton = carousel.getByRole('button', { name: 'Previous group of items' })
    const nextButton = carousel.getByRole('button', { name: 'Next group of items' })

    await test.step('default position (page 1 of 3)', async () => {
      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 2' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
  })

  test('should loop using controls', async ({ page }) => {
    await page.goto(`${BASE_URL}/carousel?variant=loop`)

    const carousel = page.getByRole('region')
    const prevButton = carousel.getByRole('button', { name: 'Previous group of items' })
    const nextButton = carousel.getByRole('button', { name: 'Next group of items' })

    await test.step('default position (page 1 of 3)', async () => {
      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 1' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on prev button and navigate to last page', async () => {
      await prevButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 3' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate back to first page', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 1' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
  })

  test('should control carousel through props (page and onPageChange)', async ({ page }) => {
    await page.goto(`${BASE_URL}/carousel?variant=controlled`)

    const carousel = page.getByRole('region')
    const prevButton = carousel.getByRole('button', { name: 'Previous group of items' })
    const nextButton = carousel.getByRole('button', { name: 'Next group of items' })

    await test.step('default position (page 1 of 3)', async () => {
      await expect(prevButton).not.toBeAttached()
      await expect(nextButton).toBeAttached()
      expect(page.getByText('The current active page is 1.'))
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 1' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on external button to go directly to last page', async () => {
      await page.getByRole('button', { name: 'Go directly to last page' }).click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).not.toBeAttached()
      expect(page.getByText('The current active page is 3.'))
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 3' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
  })

  test('should have two slides per page', async ({ page }) => {
    await page.goto(`${BASE_URL}/carousel?variant=twoSlidesPerPage`)

    const carousel = page.getByRole('region')
    const prevButton = carousel.getByRole('button', { name: 'Previous group of items' })
    const nextButton = carousel.getByRole('button', { name: 'Next group of items' })

    await test.step('default position (page 1 of 3)', async () => {
      await expect(prevButton).not.toBeAttached()
      await expect(nextButton).toBeAttached()
      // Then There are 3 page indicators (page 1 = slides 1 + 2, page 2 = slide 3 + 4, page 3 = slide 5)
      await expect
        .poll(async () => {
          return await carousel.getByRole('radio').count()
        })
        .toBe(3)
      // Then only the first two slides (page 1) are visible
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 4' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 5' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 1' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate to page 2', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      // Then slides 3 and 4 (page 2) are visible
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 4' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 5' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 2' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate to last page', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).not.toBeAttached()
      /**
       * Then slides 4 and 5 (page 3) are visible:
       * - Page 4 remains from page page 2 because page 5 is the only item remaining to display, which means the pages are visually overlapping
       */
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 4' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 5' })).toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 3' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
  })

  test('should have two slides per page AND one slide per move', async ({ page }) => {
    await page.goto(`${BASE_URL}/carousel?variant=oneSlidePerMove`)

    const carousel = page.getByRole('region')
    const prevButton = carousel.getByRole('button', { name: 'Previous group of items' })
    const nextButton = carousel.getByRole('button', { name: 'Next group of items' })

    await test.step('default position (page 1 of 3)', async () => {
      await expect(prevButton).not.toBeAttached()
      await expect(nextButton).toBeAttached()
      // Then There are 4 page indicators (page 1 = slides 1 + 2, page 2 = slide 2 + 3, page 3 = slide 3 + 4, page 4 = slide 4 + 5)
      await expect
        .poll(async () => {
          return await carousel.getByRole('radio').count()
        })
        .toBe(4)

      // Then only the first two slides (page 1) are visible
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 4' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 5' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 1' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate to page 2', async () => {
      await nextButton.click()
      // await page.waitForTimeout(100) // waitfor IntersectionObserver to update the visibility of slides

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      // Then slides 2 and 3 (page 2) are visible
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 4' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 5' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 2' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate to page 3', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).toBeAttached()
      // Then slides 3 and 4 (page 2) are visible
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 4' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 5' })).not.toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 3' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })

    await test.step('click on next button and navigate to last page', async () => {
      await nextButton.click()

      await expect(prevButton).toBeAttached()
      await expect(nextButton).not.toBeAttached()
      // Then slides 4 and 5 (page 2) are visible
      await expect(carousel.getByRole('button', { name: 'Read article 1' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 2' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 3' })).not.toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 4' })).toBeVisible()
      await expect(carousel.getByRole('button', { name: 'Read article 5' })).toBeVisible()
      await expect(carousel.getByRole('radio', { name: 'Go to page 4' })).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
  })

  test('should hide controls when carousel has only one page', async ({ page }) => {
    await page.goto(`${BASE_URL}/carousel?variant=singlePage`)

    const carousel = page.getByRole('region')
    const slides = await page.locator('[role="group"]').all()
    const prevButton = carousel.getByRole('button', { name: 'Previous group of items' })
    const nextButton = carousel.getByRole('button', { name: 'Next group of items' })
    const pagePicker = carousel.getByRole('radiogroup')
    const pageIndicators = await carousel.getByRole('radio').all()

    await test.step('default position (page 1 of 1)', async () => {
      await expect(carousel).toBeAttached()
      await expect(slides.length).toBe(3)

      await expect(pagePicker).toBeAttached()
      await expect(pageIndicators.length).toBe(0)
      await expect(prevButton).not.toBeAttached()
      await expect(nextButton).not.toBeAttached()
    })
  })
})
