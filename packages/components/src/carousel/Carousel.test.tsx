import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Carousel } from '.'

const MockIntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

/**
 * Note: as this component relies heavily on IntersectionObserver, computed styles and scroll behavior, it can't be tested properly using Jest (JSDom).
 * Please refer to the end to end tests instead.
 */
describe('Carousel', () => {
  it('should render', () => {
    render(
      <Carousel>
        <Carousel.Viewport>
          <Carousel.Slides>
            <Carousel.Slide className="flex items-center">
              <button type="button">Read article 1</button>
            </Carousel.Slide>
            <Carousel.Slide className="flex items-center">
              <button type="button">Read article 2</button>
            </Carousel.Slide>
            <Carousel.Slide className="flex items-center">
              <button type="button">Read article 3</button>
            </Carousel.Slide>
          </Carousel.Slides>
          <Carousel.Controls>
            <Carousel.PrevButton aria-label="Next group of items" />
            <Carousel.NextButton aria-label="Previous group of items" />
          </Carousel.Controls>
        </Carousel.Viewport>

        <Carousel.PagePicker>
          {({ pages }) =>
            pages.map(page => (
              <Carousel.PageIndicator
                key={page}
                index={page}
                aria-label={`Go to page ${page + 1}`}
              />
            ))
          }
        </Carousel.PagePicker>
      </Carousel>
    )

    const carousel = screen.getByRole('region')
    const slides = within(carousel).getAllByRole('group', { hidden: true }) // jsdom cannot manage slide visibility
    const prevButton = within(carousel).getByRole('button', { name: 'Previous group of items' })
    const nextButton = within(carousel).getByRole('button', { name: 'Next group of items' })
    const pagePicker = within(carousel).getByRole('radiogroup')

    expect(carousel).toBeInTheDocument()
    expect(slides.length).toBe(3)
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    expect(pagePicker).toBeInTheDocument()
  })
})
