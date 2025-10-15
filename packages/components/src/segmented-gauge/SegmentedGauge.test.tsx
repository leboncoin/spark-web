import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SegmentedGauge } from '.'

describe('SegmentedGauge', () => {
  it('should render with default props', () => {
    render(
      <SegmentedGauge value={3} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    expect(screen.getByRole('meter')).toBeInTheDocument()
    expect(screen.getByLabelText('Test gauge')).toBeInTheDocument()
  })

  it('should render with custom segment labels', () => {
    const segmentLabels = ['Low', 'Medium', 'High', 'Very High', 'Excellent']

    render(<SegmentedGauge value={2} segmentLabels={segmentLabels} aria-label="Test gauge" />)

    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('should render with custom min and max values for discrete values', () => {
    render(
      <SegmentedGauge value={2} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    const meter = screen.getByRole('meter')
    expect(meter).toHaveAttribute('aria-valuenow', '2')
    expect(meter).toHaveAttribute('aria-valuemin', '0')
    expect(meter).toHaveAttribute('aria-valuemax', '4')
  })

  it('should render with render prop pattern', () => {
    render(
      <SegmentedGauge value={2} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge">
        {({ segments, activeLabel, SegmentedGauge }) => (
          <div data-testid="custom-render">
            <SegmentedGauge.Track>
              {segments.map(segment => (
                <SegmentedGauge.Segment
                  key={segment.index}
                  index={segment.index}
                  isActive={segment.isActive}
                  isCurrent={segment.isCurrent}
                  aria-label={segment.label}
                />
              ))}
            </SegmentedGauge.Track>
            <SegmentedGauge.Label>{activeLabel}</SegmentedGauge.Label>
          </div>
        )}
      </SegmentedGauge>
    )

    expect(screen.getByTestId('custom-render')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('should calculate correct current index for value', () => {
    const { rerender } = render(
      <SegmentedGauge value={0} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    // Value 0 should be at index 0 (current segment has indicator)
    let segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment0 = segments[0]
    const indicator0 = currentSegment0.querySelector('[aria-hidden="true"]')
    expect(indicator0).toBeInTheDocument()

    rerender(
      <SegmentedGauge value={2} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    // Value 2 should be at index 2 (current segment has indicator)
    segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment2 = segments[2]
    const indicator2 = currentSegment2.querySelector('[aria-hidden="true"]')
    expect(indicator2).toBeInTheDocument()
  })

  it('should apply correct active states to segments', () => {
    render(
      <SegmentedGauge value={2} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')

    // First 3 segments should be active (0-2)
    expect(segments[0]).toHaveClass(
      'bg-[color-mix(in_srgb,var(--color-basic)_var(--opacity-dim-1),transparent)]'
    )
    expect(segments[1]).toHaveClass(
      'bg-[color-mix(in_srgb,var(--color-basic)_var(--opacity-dim-1),transparent)]'
    )
    expect(segments[2]).toHaveClass(
      'bg-[color-mix(in_srgb,var(--color-basic)_var(--opacity-dim-1),transparent)]'
    )

    // Last 2 segments should not be active
    expect(segments[3]).toHaveClass('border-sm')
    expect(segments[4]).toHaveClass('border-sm')
  })

  it('should handle edge cases for value calculation', () => {
    const { rerender } = render(
      <SegmentedGauge
        value={-1}
        segmentLabels={['A', 'B', 'C', 'D', 'E']}
        aria-label="Test gauge"
      />
    )

    // Value below min should clamp to min (index 0)
    let segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment0 = segments[0]
    const indicator0 = currentSegment0.querySelector('[aria-hidden="true"]')
    expect(indicator0).toBeInTheDocument()

    rerender(
      <SegmentedGauge
        value={10}
        segmentLabels={['A', 'B', 'C', 'D', 'E']}
        aria-label="Test gauge"
      />
    )

    // Value above max should clamp to max (index 4)
    segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment4 = segments[4]
    const indicator4 = currentSegment4.querySelector('[aria-hidden="true"]')
    expect(indicator4).toBeInTheDocument()
  })

  it('should be accessible', () => {
    render(
      <SegmentedGauge
        value={3}
        segmentLabels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        aria-label="Quality rating"
      />
    )

    const meter = screen.getByRole('meter')
    expect(meter).toHaveAttribute('aria-valuenow', '3')
    expect(meter).toHaveAttribute('aria-valuemin', '0')
    expect(meter).toHaveAttribute('aria-valuemax', '4')
    expect(meter).toHaveAttribute('aria-label', 'Quality rating')
  })

  it('should render with small size by default', () => {
    render(<SegmentedGauge value={2} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />)

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveClass('h-sz-8', 'w-sz-24')
  })

  it('should render with medium size when specified', () => {
    render(
      <SegmentedGauge value={2} size="md" segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveClass('h-sz-12', 'w-[34px]')
  })

  it('should render correct indicator size for small gauge', () => {
    render(<SegmentedGauge value={1} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />)

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment = segments[1]
    const indicator = currentSegment.querySelector('[aria-hidden="true"]')
    expect(indicator).toHaveClass('size-sz-12')
  })

  it('should render correct indicator size for medium gauge', () => {
    render(
      <SegmentedGauge value={1} size="md" segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment = segments[1]
    const indicator = currentSegment.querySelector('[aria-hidden="true"]')
    expect(indicator).toHaveClass('size-[18px]')
  })

  it('should render with basic intent by default', () => {
    render(<SegmentedGauge value={1} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />)

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveClass(
      'bg-[color-mix(in_srgb,var(--color-basic)_var(--opacity-dim-1),transparent)]'
    )
    expect(segments[1]).toHaveClass(
      'bg-[color-mix(in_srgb,var(--color-basic)_var(--opacity-dim-1),transparent)]'
    )
  })

  it('should render with success intent', () => {
    render(
      <SegmentedGauge
        value={1}
        intent="success"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveClass('bg-success/dim-1')
    expect(segments[1]).toHaveClass('bg-success/dim-1')
  })

  it('should render with alert intent', () => {
    render(
      <SegmentedGauge
        value={1}
        intent="alert"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveClass('bg-alert/dim-1')
    expect(segments[1]).toHaveClass('bg-alert/dim-1')
  })

  it('should render with danger intent', () => {
    render(
      <SegmentedGauge
        value={1}
        intent="danger"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveClass('bg-error/dim-1')
    expect(segments[1]).toHaveClass('bg-error/dim-1')
  })

  it('should render with info intent', () => {
    render(
      <SegmentedGauge
        value={1}
        intent="info"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveClass('bg-info/dim-1')
    expect(segments[1]).toHaveClass('bg-info/dim-1')
  })

  it('should render correct indicator border color for different intents', () => {
    const { rerender } = render(
      <SegmentedGauge
        value={1}
        intent="success"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    let segments = screen.getAllByTestId('segmented-gauge-segment')
    let currentSegment = segments[1]
    let indicator = currentSegment.querySelector('[aria-hidden="true"]')
    expect(indicator).toHaveClass('border-success')

    rerender(
      <SegmentedGauge
        value={1}
        intent="danger"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    segments = screen.getAllByTestId('segmented-gauge-segment')
    currentSegment = segments[1]
    indicator = currentSegment.querySelector('[aria-hidden="true"]')
    expect(indicator).toHaveClass('border-error')
  })

  it('should render with custom hex color', () => {
    render(
      <SegmentedGauge
        value={1}
        intent="#8B5CF6"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    const segment = segments[0]
    expect(segment).toHaveStyle({ '--gauge-color': '#8B5CF6' })
  })

  it('should render with custom CSS variable', () => {
    render(
      <SegmentedGauge
        value={1}
        intent="var(--color-primary)"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    const segment = segments[0]
    expect(segment).toHaveStyle({ '--gauge-color': 'var(--color-primary)' })
  })

  it('should render with custom RGB color', () => {
    render(
      <SegmentedGauge
        value={1}
        intent="rgb(34, 197, 94)"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )

    const segments = screen.getAllByTestId('segmented-gauge-segment')
    const segment = segments[0]
    expect(segment).toHaveStyle({ '--gauge-color': 'rgb(34, 197, 94)' })
  })

  it('should work with custom min and max values for discrete values', () => {
    const { rerender } = render(
      <SegmentedGauge
        value={0}
        segmentLabels={['A', 'B', 'C', 'D', 'E']}
        aria-label="Grade rating"
      />
    )

    // Value 0 should be at index 0 (current segment has indicator)
    let segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment0 = segments[0]
    const indicator0 = currentSegment0.querySelector('[aria-hidden="true"]')
    expect(indicator0).toBeInTheDocument()

    rerender(
      <SegmentedGauge
        value={2}
        segmentLabels={['A', 'B', 'C', 'D', 'E']}
        aria-label="Grade rating"
      />
    )

    // Value 2 should be at index 2 (current segment has indicator)
    segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment2 = segments[2]
    const indicator2 = currentSegment2.querySelector('[aria-hidden="true"]')
    expect(indicator2).toBeInTheDocument()
  })
})
