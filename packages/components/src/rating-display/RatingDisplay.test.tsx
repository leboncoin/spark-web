import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { RatingDisplay } from './RatingDisplay'

const getStars = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-part="star"]'))

const getLocalizedFormattedValue = (value: number) =>
  new Intl.NumberFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)

const mockResolvedLocale = (locale: string) => {
  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockImplementation(function (
    this: Intl.DateTimeFormat
  ) {
    return { ...resolvedOptions.call(this), locale }
  })
}

describe('RatingDisplay', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render 5 stars', () => {
    const { container } = render(
      <RatingDisplay value={2} aria-label="Score: 2 out of 5">
        <RatingDisplay.Stars />
      </RatingDisplay>
    )

    expect(screen.getByLabelText('Score: 2 out of 5')).toBeInTheDocument()
    expect(getStars(container)).toHaveLength(5)
  })

  it('should render a single star in single-star variant', () => {
    const { container } = render(
      <RatingDisplay value={2} aria-label="Score: 2 out of 5">
        <RatingDisplay.Stars variant="single-star" />
      </RatingDisplay>
    )

    expect(getStars(container)).toHaveLength(1)
  })

  it.each([
    { value: 0.5, expectedWidth: '0%' },
    { value: 2, expectedWidth: '50%' },
    { value: 4.2, expectedWidth: '100%' },
  ])('should apply single-star fill thresholds for value=$value', ({ value, expectedWidth }) => {
    const { container } = render(
      <RatingDisplay value={value} aria-label={`Score: ${value} out of 5`}>
        <RatingDisplay.Stars variant="single-star" />
      </RatingDisplay>
    )

    const singleStarFill = container.querySelector(
      '[data-part="star"] > div'
    ) as HTMLDivElement | null
    expect(singleStarFill).not.toBeNull()
    expect(singleStarFill).toHaveStyle({ width: expectedWidth })
  })

  it('should pass aria-label to root element', () => {
    render(
      <RatingDisplay value={3} aria-label="Score: 3 out of 5">
        <RatingDisplay.Stars />
      </RatingDisplay>
    )
    expect(screen.getByLabelText('Score: 3 out of 5')).toBeInTheDocument()
  })

  it('should display value 0 when value is undefined', () => {
    render(
      <RatingDisplay aria-label="Score: 0 out of 5">
        <RatingDisplay.Stars />
      </RatingDisplay>
    )
    expect(screen.getByLabelText('Score: 0 out of 5')).toBeInTheDocument()
  })

  it('should accept size prop', () => {
    render(
      <RatingDisplay value={1} size="sm" aria-label="Score: 1 out of 5">
        <RatingDisplay.Stars />
      </RatingDisplay>
    )
    expect(screen.getByLabelText('Score: 1 out of 5')).toBeInTheDocument()
  })

  it('should render optional displayValue and count', () => {
    render(
      <RatingDisplay value={4.6} count={128} aria-label="Score: 4.6 out of 5, based on 128 reviews">
        <RatingDisplay.Stars />
        <RatingDisplay.Value>{() => '4.7'}</RatingDisplay.Value>
        <RatingDisplay.Count />
      </RatingDisplay>
    )

    expect(screen.getByText('4.7')).toBeInTheDocument()
    expect(screen.getByText('(128)')).toBeInTheDocument()
  })

  it('should render count when value is 0', () => {
    render(
      <RatingDisplay value={4.2} count={0} aria-label="Score: 4.2 out of 5, based on 0 reviews">
        <RatingDisplay.Stars />
        <RatingDisplay.Count />
      </RatingDisplay>
    )

    expect(screen.getByText('(0)')).toBeInTheDocument()
  })

  it('should support formatter functions for displayValue and count', () => {
    render(
      <RatingDisplay
        value={4.74}
        count={128}
        aria-label="Score: 4.74 out of 5, based on 128 reviews"
      >
        <RatingDisplay.Stars />
        <RatingDisplay.Value>{formattedValue => formattedValue}</RatingDisplay.Value>
        <RatingDisplay.Count>{count => `${count} reviews`}</RatingDisplay.Count>
      </RatingDisplay>
    )

    const expectedFormattedValue = getLocalizedFormattedValue(4.74)
    expect(screen.getByText(expectedFormattedValue)).toBeInTheDocument()
    expect(screen.getByText('(128 reviews)')).toBeInTheDocument()
  })

  it('should pass formatted value first and raw value second to Value formatter', () => {
    const expectedFormattedValue = getLocalizedFormattedValue(4.74)

    render(
      <RatingDisplay value={4.74} aria-label="Score: 4.74 out of 5">
        <RatingDisplay.Stars />
        <RatingDisplay.Value>
          {(formattedValue, rawValue) => `${formattedValue}|${rawValue.toFixed(2)}`}
        </RatingDisplay.Value>
      </RatingDisplay>
    )

    expect(screen.getByText(`${expectedFormattedValue}|4.74`)).toBeInTheDocument()
  })

  it.each([
    { locale: 'en-US', expected: '4.7' },
    { locale: 'fr-FR', expected: '4,7' },
  ])('should format value using resolved locale: $locale', ({ locale, expected }) => {
    mockResolvedLocale(locale)

    render(
      <RatingDisplay value={4.74} aria-label="Score: 4.74 out of 5">
        <RatingDisplay.Stars />
        <RatingDisplay.Value />
      </RatingDisplay>
    )

    expect(screen.getByText(expected)).toBeInTheDocument()
  })
})
