import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SegmentedGauge } from '.'

describe('SegmentedGauge', () => {
  it('should render with default props', () => {
    // Given: A SegmentedGauge with default props
    render(
      <SegmentedGauge value={3} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    // When: The component renders
    // Then: It should display a meter element with proper accessibility
    expect(screen.getByRole('meter')).toBeInTheDocument()
    expect(screen.getByLabelText('Test gauge')).toBeInTheDocument()
  })

  it('should render with custom segment labels', () => {
    // Given: Custom segment labels array
    const segmentLabels = ['Low', 'Medium', 'High', 'Very High', 'Excellent']

    // When: Rendering with custom labels
    render(<SegmentedGauge value={2} segmentLabels={segmentLabels} aria-label="Test gauge" />)

    // Then: The correct label should be displayed
    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('should render with custom min and max values for discrete values', () => {
    // Given: A SegmentedGauge with 5 segments (0-4 range)
    render(
      <SegmentedGauge value={2} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    // When: The component renders
    const meter = screen.getByRole('meter')

    // Then: It should have correct ARIA attributes for discrete values
    expect(meter).toHaveAttribute('aria-valuenow', '2')
    expect(meter).toHaveAttribute('aria-valuemin', '0')
    expect(meter).toHaveAttribute('aria-valuemax', '4')
  })

  it('should render with render prop pattern', () => {
    // Given: A SegmentedGauge with render prop children
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

    // When: The component renders with custom render prop
    // Then: It should render the custom structure and active label
    expect(screen.getByTestId('custom-render')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('should calculate correct current index for value', () => {
    // Given: A SegmentedGauge with value 0
    const { rerender } = render(
      <SegmentedGauge value={0} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    // When: Checking the current segment indicator
    let segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment0 = segments[0]
    expect(currentSegment0).toBeDefined()
    const indicator0 = currentSegment0?.querySelector('[aria-hidden="true"]')

    // Then: Value 0 should show indicator at index 0
    expect(indicator0).toBeInTheDocument()
    expect(currentSegment0).toHaveAttribute('data-current', 'true')

    // When: Changing value to 2
    rerender(
      <SegmentedGauge value={2} segmentLabels={['A', 'B', 'C', 'D', 'E']} aria-label="Test gauge" />
    )

    // Then: Value 2 should show indicator at index 2
    segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment2 = segments[2]
    expect(currentSegment2).toBeDefined()
    const indicator2 = currentSegment2?.querySelector('[aria-hidden="true"]')
    expect(indicator2).toBeInTheDocument()
    expect(currentSegment2).toHaveAttribute('data-current', 'true')
  })

  it('should handle edge cases for value calculation', () => {
    // Given: A SegmentedGauge with value below minimum (-1)
    const { rerender } = render(
      <SegmentedGauge
        value={-1}
        segmentLabels={['A', 'B', 'C', 'D', 'E']}
        aria-label="Test gauge"
      />
    )

    // When: Checking the current segment
    let segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment0 = segments[0]
    expect(currentSegment0).toBeDefined()
    const indicator0 = currentSegment0?.querySelector('[aria-hidden="true"]')

    // Then: Value below min should clamp to min (index 0)
    expect(indicator0).toBeInTheDocument()

    // When: Setting value above maximum (10)
    rerender(
      <SegmentedGauge
        value={10}
        segmentLabels={['A', 'B', 'C', 'D', 'E']}
        aria-label="Test gauge"
      />
    )

    // Then: Value above max should clamp to max (index 4)
    segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment4 = segments[4]
    expect(currentSegment4).toBeDefined()
    const indicator4 = currentSegment4?.querySelector('[aria-hidden="true"]')
    expect(indicator4).toBeInTheDocument()
  })

  it('should be accessible', () => {
    // Given: A SegmentedGauge with meaningful labels and aria-label
    render(
      <SegmentedGauge
        value={3}
        segmentLabels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        aria-label="Quality rating"
      />
    )

    // When: Checking accessibility attributes
    const meter = screen.getByRole('meter')
    const label = screen.getByText('Very Good')

    // Then: It should have proper ARIA attributes for screen readers
    expect(meter).toHaveAttribute('aria-valuenow', '3')
    expect(meter).toHaveAttribute('aria-valuemin', '0')
    expect(meter).toHaveAttribute('aria-valuemax', '4')
    expect(meter).toHaveAttribute('aria-label', 'Quality rating')
    expect(meter).toHaveAttribute('aria-describedby')

    // And: The label should have the correct ID and be connected to the meter
    expect(label).toHaveAttribute('id')
    expect(meter.getAttribute('aria-describedby')).toBe(label.getAttribute('id'))
  })

  it('should render with small size by default', () => {
    // Given: A SegmentedGauge without size prop
    render(<SegmentedGauge value={2} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />)

    // When: The component renders
    const segments = screen.getAllByTestId('segmented-gauge-segment')

    // Then: It should use small size classes by default
    expect(segments[0]).toHaveClass('h-sz-8', 'w-sz-24')
  })

  it('should render with medium size when specified', () => {
    // Given: A SegmentedGauge with size="md"
    render(
      <SegmentedGauge value={2} size="md" segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />
    )

    // When: The component renders
    const segments = screen.getAllByTestId('segmented-gauge-segment')

    // Then: It should use medium size classes
    expect(segments[0]).toHaveClass('h-sz-12', 'w-sz-36')
  })

  it('should render correct indicator size for small gauge', () => {
    // Given: A small SegmentedGauge with value 1
    render(<SegmentedGauge value={1} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />)

    // When: Checking the current segment indicator
    const segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment = segments[1]
    expect(currentSegment).toBeDefined()
    const indicator = currentSegment?.querySelector('[aria-hidden="true"]')

    // Then: The indicator should have small size classes
    expect(indicator).toHaveClass('size-sz-12')
  })

  it('should render correct indicator size for medium gauge', () => {
    // Given: A medium SegmentedGauge with value 1
    render(
      <SegmentedGauge value={1} size="md" segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />
    )

    // When: Checking the current segment indicator
    const segments = screen.getAllByTestId('segmented-gauge-segment')
    const currentSegment = segments[1]
    expect(currentSegment).toBeDefined()
    const indicator = currentSegment?.querySelector('[aria-hidden="true"]')

    // Then: The indicator should have medium size classes
    expect(indicator).toHaveClass('size-sz-20')
  })

  it('should set correct data attributes on segments', () => {
    // Given: A SegmentedGauge with value 1 and 3 segments
    render(<SegmentedGauge value={1} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />)

    // When: Checking segment data attributes
    const segments = screen.getAllByTestId('segmented-gauge-segment')

    // Then: Segments should have correct data-active and data-current attributes
    expect(segments[0]).toHaveAttribute('data-active', 'true')
    expect(segments[0]).toHaveAttribute('data-current', 'false')

    expect(segments[1]).toHaveAttribute('data-active', 'true')
    expect(segments[1]).toHaveAttribute('data-current', 'true')

    expect(segments[2]).toHaveAttribute('data-active', 'false')
    expect(segments[2]).toHaveAttribute('data-current', 'false')
  })

  it('should have unique IDs for multiple gauges', () => {
    // Given: Two SegmentedGauges on the same page
    render(
      <div>
        <SegmentedGauge value={1} segmentLabels={['A', 'B', 'C']} aria-label="First gauge" />
        <SegmentedGauge value={2} segmentLabels={['X', 'Y', 'Z']} aria-label="Second gauge" />
      </div>
    )

    // When: Getting both meters and their labels
    const meters = screen.getAllByRole('meter')
    const labels = screen.getAllByTestId('segmented-gauge-label')

    // Then: Each gauge should have unique IDs
    expect(meters[0]?.getAttribute('aria-describedby')).not.toBe(
      meters[1]?.getAttribute('aria-describedby')
    )
    expect(labels[0]?.getAttribute('id')).not.toBe(labels[1]?.getAttribute('id'))

    // And: Each meter should be connected to its own label
    expect(meters[0]?.getAttribute('aria-describedby')).toBe(labels[0]?.getAttribute('id'))
    expect(meters[1]?.getAttribute('aria-describedby')).toBe(labels[1]?.getAttribute('id'))
  })

  it('should render with different intents and custom colors', () => {
    // Given: A SegmentedGauge with default intent
    const { rerender } = render(
      <SegmentedGauge value={1} segmentLabels={['A', 'B', 'C']} aria-label="Test gauge" />
    )

    // When: Checking basic intent (default)
    let segments = screen.getAllByTestId('segmented-gauge-segment')
    // Then: It should use basic color classes and set gauge color variable
    expect(segments[0]).toHaveClass(
      'default:bg-[color-mix(in_srgb,var(--gauge-color)_var(--opacity-dim-1),transparent)]'
    )
    expect(segments[0]).toHaveStyle({ '--gauge-color': 'var(--color-basic)' })

    // When: Setting success intent
    rerender(
      <SegmentedGauge
        value={1}
        intent="success"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )
    // Then: It should set success color variable
    segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveStyle({ '--gauge-color': 'var(--color-success)' })

    // When: Setting alert intent
    rerender(
      <SegmentedGauge
        value={1}
        intent="alert"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )
    // Then: It should set alert color variable
    segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveStyle({ '--gauge-color': 'var(--color-alert)' })

    // When: Setting danger intent
    rerender(
      <SegmentedGauge
        value={1}
        intent="danger"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )
    // Then: It should set error color variable
    segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveStyle({ '--gauge-color': 'var(--color-error)' })

    // When: Setting info intent
    rerender(
      <SegmentedGauge
        value={1}
        intent="info"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )
    // Then: It should set info color variable
    segments = screen.getAllByTestId('segmented-gauge-segment')
    expect(segments[0]).toHaveStyle({ '--gauge-color': 'var(--color-info)' })

    // When: Testing indicator border colors for success intent
    rerender(
      <SegmentedGauge
        value={1}
        intent="success"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )
    // Then: Indicator should have success border class
    segments = screen.getAllByTestId('segmented-gauge-segment')
    let currentSegment = segments[1]
    expect(currentSegment).toBeDefined()
    let indicator = currentSegment?.querySelector('[aria-hidden="true"]')
    expect(indicator).toHaveClass('border-[var(--gauge-color)]')

    // When: Testing indicator border colors for danger intent
    rerender(
      <SegmentedGauge
        value={1}
        intent="danger"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )
    // Then: Indicator should have error border class
    segments = screen.getAllByTestId('segmented-gauge-segment')
    currentSegment = segments[1]
    expect(currentSegment).toBeDefined()
    indicator = currentSegment?.querySelector('[aria-hidden="true"]')
    expect(indicator).toHaveClass('border-[var(--gauge-color)]')

    // When: Setting custom hex color
    rerender(
      <SegmentedGauge
        value={1}
        intent="#8B5CF6"
        segmentLabels={['A', 'B', 'C']}
        aria-label="Test gauge"
      />
    )
    // Then: It should apply custom color as CSS variable
    segments = screen.getAllByTestId('segmented-gauge-segment')
    let segment = segments[0]
    expect(segment).toHaveStyle({ '--gauge-color': '#8B5CF6' })
  })
})
