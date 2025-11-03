/* eslint-disable max-lines */
import { Label } from '@spark-ui/components/label'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SegmentedGauge } from '.'

describe('SegmentedGauge', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      render(<SegmentedGauge value={3} min={0} max={4} description="D" aria-label="Test gauge" />)

      expect(screen.getByRole('meter')).toBeInTheDocument()
      expect(screen.getByLabelText('Test gauge')).toBeInTheDocument()
    })

    it('renders with custom description', () => {
      render(
        <SegmentedGauge value={2} min={0} max={4} description="High" aria-label="Test gauge" />
      )

      expect(screen.getByText('High')).toBeInTheDocument()
    })

    it('renders with custom min and max values', () => {
      render(<SegmentedGauge value={2} min={0} max={4} description="C" aria-label="Test gauge" />)

      const meter = screen.getByRole('meter')
      expect(meter).toHaveAttribute('aria-valuenow', '2')
      expect(meter).toHaveAttribute('aria-valuemin', '0')
      expect(meter).toHaveAttribute('aria-valuemax', '4')
    })
  })

  describe('Render prop pattern', () => {
    it('renders with custom children function', () => {
      render(
        <SegmentedGauge value={2} min={0} max={2} aria-label="Test gauge">
          {({ segments }) => (
            <div data-testid="custom-render">
              <SegmentedGauge.Track>
                {segments.map((_, index) => (
                  <SegmentedGauge.Segment key={index} index={index} />
                ))}
              </SegmentedGauge.Track>
              <SegmentedGauge.Label>C</SegmentedGauge.Label>
            </div>
          )}
        </SegmentedGauge>
      )

      const gauge = screen.getByRole('meter')

      expect(gauge).toBeInTheDocument()
      expect(within(gauge).getByTestId('custom-render')).toBeInTheDocument()
      expect(within(gauge).getByText('C')).toBeInTheDocument()
    })
  })

  describe('Value calculation and segment positioning', () => {
    it('calculates correct current index for different values', () => {
      const { rerender } = render(
        <SegmentedGauge value={0} min={0} max={4} description="A" aria-label="Test gauge" />
      )

      let segments = screen.getAllByTestId('segmented-gauge-segment')
      const currentSegment0 = segments[0]
      const indicator0 = currentSegment0?.querySelector('[aria-hidden="true"]')

      expect(indicator0).toBeInTheDocument()
      expect(currentSegment0).toHaveAttribute('data-current', 'true')

      rerender(<SegmentedGauge value={2} min={0} max={4} description="C" aria-label="Test gauge" />)

      segments = screen.getAllByTestId('segmented-gauge-segment')
      const currentSegment2 = segments[2]
      const indicator2 = currentSegment2?.querySelector('[aria-hidden="true"]')
      expect(indicator2).toBeInTheDocument()
      expect(currentSegment2).toHaveAttribute('data-current', 'true')
    })

    it('handles edge cases for value calculation', () => {
      const { rerender } = render(
        <SegmentedGauge value={-1} min={0} max={4} description="A" aria-label="Test gauge" />
      )

      let segments = screen.getAllByTestId('segmented-gauge-segment')
      const currentSegment0 = segments[0]
      const indicator0 = currentSegment0?.querySelector('[aria-hidden="true"]')

      expect(indicator0).toBeInTheDocument()

      rerender(
        <SegmentedGauge value={10} min={0} max={4} description="E" aria-label="Test gauge" />
      )

      segments = screen.getAllByTestId('segmented-gauge-segment')
      const currentSegment4 = segments[4]
      const indicator4 = currentSegment4?.querySelector('[aria-hidden="true"]')
      expect(indicator4).toBeInTheDocument()
    })

    it('sets correct data attributes on segments', () => {
      render(<SegmentedGauge value={1} min={0} max={2} description="B" aria-label="Test gauge" />)

      const segments = screen.getAllByTestId('segmented-gauge-segment')

      expect(segments[0]).toHaveAttribute('data-active', 'true')
      expect(segments[0]).toHaveAttribute('data-current', 'false')

      expect(segments[1]).toHaveAttribute('data-active', 'true')
      expect(segments[1]).toHaveAttribute('data-current', 'true')

      expect(segments[2]).toHaveAttribute('data-active', 'false')
      expect(segments[2]).toHaveAttribute('data-current', 'false')
    })
  })

  describe('calculateCurrentIndex function', () => {
    const calculateCurrentIndex = (
      value: number | undefined,
      min: number,
      max: number,
      segments: number
    ) => {
      if (value == null) return -1
      const normalizedValue = Math.max(min, Math.min(max, value))
      const range = max - min

      // Handle edge case where min === max (single segment)
      if (range === 0) return 0

      const segmentSize = range / (segments - 1)
      const rawIndex = (normalizedValue - min) / segmentSize

      return Math.max(0, Math.min(segments - 1, Math.round(rawIndex)))
    }

    describe('when value is null or undefined', () => {
      it('returns -1 for undefined value', () => {
        expect(calculateCurrentIndex(undefined, 0, 4, 5)).toBe(-1)
      })

      it('returns -1 for null value', () => {
        expect(calculateCurrentIndex(null as any, 0, 4, 5)).toBe(-1)
      })
    })

    describe('when value equals boundaries', () => {
      it('returns 0 when value equals min', () => {
        expect(calculateCurrentIndex(0, 0, 4, 5)).toBe(0)
      })

      it('returns last index when value equals max', () => {
        expect(calculateCurrentIndex(4, 0, 4, 5)).toBe(4)
      })
    })

    describe('when value is outside range', () => {
      it('clamps to 0 when value is below min', () => {
        expect(calculateCurrentIndex(-1, 0, 4, 5)).toBe(0)
      })

      it('clamps to last index when value is above max', () => {
        expect(calculateCurrentIndex(10, 0, 4, 5)).toBe(4)
      })
    })

    describe('when value is within range', () => {
      it('calculates correct index for intermediate values', () => {
        expect(calculateCurrentIndex(1, 0, 4, 5)).toBe(1)
        expect(calculateCurrentIndex(2, 0, 4, 5)).toBe(2)
        expect(calculateCurrentIndex(3, 0, 4, 5)).toBe(3)
      })

      it('handles decimal values correctly', () => {
        expect(calculateCurrentIndex(1.2, 0, 4, 5)).toBe(1)
        expect(calculateCurrentIndex(1.8, 0, 4, 5)).toBe(2)
      })
    })

    describe('edge cases', () => {
      it('handles single segment case (min === max)', () => {
        expect(calculateCurrentIndex(5, 5, 5, 1)).toBe(0)
      })
    })
  })

  describe('Accessibility', () => {
    it('provides proper ARIA attributes for meter role', () => {
      render(
        <SegmentedGauge
          value={3}
          min={0}
          max={4}
          description="Very Good"
          aria-label="Quality rating"
        />
      )

      const meter = screen.getByRole('meter')
      const label = screen.getByText('Very Good')

      expect(meter).toHaveAttribute('aria-valuenow', '3')
      expect(meter).toHaveAttribute('aria-valuemin', '0')
      expect(meter).toHaveAttribute('aria-valuemax', '4')
      expect(meter).toHaveAttribute('aria-label', 'Quality rating')
      expect(meter).toHaveAttribute('aria-describedby')

      expect(label).toHaveAttribute('id')
      expect(meter.getAttribute('aria-describedby')).toBe(label.getAttribute('id'))
    })

    it('works with Spark Label component for complete accessible name', () => {
      render(
        <div>
          <Label htmlFor="quality-rating" id="quality-rating-label">
            Quality Rating
          </Label>
          <SegmentedGauge id="quality-rating" value={3} min={0} max={4} description="Very Good" />
        </div>
      )

      const meter = screen.getByRole('meter')
      const label = screen.getByText('Quality Rating')
      const description = screen.getByText('Very Good')

      expect(meter).toHaveAttribute('aria-labelledby', 'quality-rating-label')
      expect(meter).toHaveAttribute('aria-describedby')
      expect(meter).toHaveAttribute('aria-valuenow', '3')
      expect(meter).toHaveAttribute('aria-valuemin', '0')
      expect(meter).toHaveAttribute('aria-valuemax', '4')

      expect(label).toHaveAttribute('id', 'quality-rating-label')
      expect(description).toHaveAttribute('id')
      expect(meter.getAttribute('aria-describedby')).toBe(description.getAttribute('id'))

      expect(screen.getByLabelText('Quality Rating')).toBeInTheDocument()
    })

    it('generates unique IDs for multiple gauges', () => {
      render(
        <div>
          <SegmentedGauge value={1} min={0} max={2} description="B" aria-label="First gauge" />
          <SegmentedGauge value={2} min={0} max={2} description="C" aria-label="Second gauge" />
        </div>
      )

      const meters = screen.getAllByRole('meter')
      const labels = screen.getAllByTestId('segmented-gauge-label')

      expect(meters[0]?.getAttribute('aria-describedby')).not.toBe(
        meters[1]?.getAttribute('aria-describedby')
      )
      expect(labels[0]?.getAttribute('id')).not.toBe(labels[1]?.getAttribute('id'))

      expect(meters[0]?.getAttribute('aria-describedby')).toBe(labels[0]?.getAttribute('id'))
      expect(meters[1]?.getAttribute('aria-describedby')).toBe(labels[1]?.getAttribute('id'))
    })
  })

  describe('Styling and appearance', () => {
    it('renders with medium size by default', () => {
      render(<SegmentedGauge value={2} min={0} max={2} description="C" aria-label="Test gauge" />)

      const segments = screen.getAllByTestId('segmented-gauge-segment')
      expect(segments[0]).toHaveClass('h-sz-12', 'w-sz-36')
    })

    it('renders with different intents', () => {
      const { rerender } = render(
        <SegmentedGauge value={1} min={0} max={2} description="B" aria-label="Test gauge" />
      )

      // Test default intent (no intent prop)
      let segments = screen.getAllByTestId('segmented-gauge-segment')
      expect(segments[0]).toHaveClass('default:bg-[var(--gauge-color)]')
      expect(segments[0]).toHaveStyle({ '--gauge-color': 'var(--color-neutral)' })

      // Test all intents with their expected color variables
      const intents = [
        { intent: 'main', expectedColor: 'var(--color-main)' },
        { intent: 'support', expectedColor: 'var(--color-support)' },
        { intent: 'basic', expectedColor: 'var(--color-basic)' },
        { intent: 'accent', expectedColor: 'var(--color-accent)' },
        { intent: 'success', expectedColor: 'var(--color-success)' },
        { intent: 'alert', expectedColor: 'var(--color-alert)' },
        { intent: 'danger', expectedColor: 'var(--color-error)' },
        { intent: 'info', expectedColor: 'var(--color-info)' },
      ]

      intents.forEach(({ intent, expectedColor }) => {
        rerender(
          <SegmentedGauge
            value={1}
            min={0}
            max={2}
            intent={intent as any}
            description="B"
            aria-label="Test gauge"
          />
        )

        segments = screen.getAllByTestId('segmented-gauge-segment')
        expect(segments[0]).toHaveStyle({ '--gauge-color': expectedColor })
      })

      // Test indicator border colors for different intents
      const intentsForIndicator = ['success', 'danger']
      intentsForIndicator.forEach(intent => {
        rerender(
          <SegmentedGauge
            value={1}
            min={0}
            max={2}
            intent={intent as any}
            description="B"
            aria-label="Test gauge"
          />
        )

        segments = screen.getAllByTestId('segmented-gauge-segment')
        const currentSegment = segments[1]
        expect(currentSegment).toBeDefined()
        const indicator = currentSegment?.querySelector('[aria-hidden="true"]')
        expect(indicator).toHaveClass('border-[var(--gauge-color)]')
      })
    })

    it('renders with custom colors', () => {
      render(
        <SegmentedGauge
          value={1}
          min={0}
          max={2}
          customColor="#8B5CF6"
          description="B"
          aria-label="Test gauge"
        />
      )

      const segments = screen.getAllByTestId('segmented-gauge-segment')
      const segment = segments[0]
      expect(segment).toHaveStyle({ '--gauge-color': '#8B5CF6' })
    })
  })

  describe('when value is undefined or null', () => {
    it('uses status role instead of meter role', () => {
      render(
        <SegmentedGauge
          value={undefined}
          min={0}
          max={4}
          description="No value"
          aria-label="Test gauge"
        />
      )

      const gauge = screen.getByLabelText('Test gauge')
      const segments = screen.getAllByTestId('segmented-gauge-segment')

      expect(gauge).not.toHaveAttribute('role', 'meter')
      expect(gauge).not.toHaveAttribute('aria-valuenow')
      expect(gauge).not.toHaveAttribute('aria-valuemin')
      expect(gauge).not.toHaveAttribute('aria-valuemax')

      segments.forEach(segment => {
        expect(segment).toHaveAttribute('data-active', 'false')
        expect(segment).toHaveAttribute('data-current', 'false')
        const indicator = segment.querySelector('[aria-hidden="true"]')
        expect(indicator).toBeNull()
      })
    })

    it('uses status role when value prop is not provided', () => {
      render(
        <SegmentedGauge min={0} max={4} description="No data available" aria-label="Test gauge" />
      )

      const gauge = screen.getByLabelText('Test gauge')

      expect(gauge).toHaveAttribute('role', 'status')
      expect(gauge).not.toHaveAttribute('aria-valuenow')
      expect(gauge).not.toHaveAttribute('aria-valuemin')
      expect(gauge).not.toHaveAttribute('aria-valuemax')
    })

    it('uses status role when value is null', () => {
      render(
        <SegmentedGauge
          value={null as any}
          min={0}
          max={4}
          description="No data available"
          aria-label="Test gauge"
        />
      )

      const gauge = screen.getByLabelText('Test gauge')

      expect(gauge).toHaveAttribute('role', 'status')
      expect(gauge).not.toHaveAttribute('aria-valuenow')
      expect(gauge).not.toHaveAttribute('aria-valuemin')
      expect(gauge).not.toHaveAttribute('aria-valuemax')
    })
  })
})
