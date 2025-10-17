import { cx } from 'class-variance-authority'
import { Ref, useId, useMemo } from 'react'

import { SegmentedGaugeContext } from './SegmentedGaugeContext'
import { SegmentedGaugeLabel } from './SegmentedGaugeLabel'
import { SegmentedGaugeSegment } from './SegmentedGaugeSegment'
import { SegmentedGaugeTrack } from './SegmentedGaugeTrack'

export interface SegmentedGaugeProps {
  /**
   * The current value of the gauge
   */
  value?: number
  /**
   * Minimum value of the gauge (aria-valuemin)
   */
  min: number
  /**
   * Maximum value of the gauge (aria-valuemax)
   */
  max: number
  /**
   * Description text for the gauge (aria-describedby)
   */
  description?: string
  /**
   * Size of the gauge
   */
  size?: 'sm' | 'md'
  /**
   * Intent of the gauge - can be a predefined intent or any custom color (hex, CSS variable, etc.)
   */
  intent?: 'basic' | 'success' | 'alert' | 'danger' | 'info' | string
  /**
   * ID of the gauge element
   */
  id?: string
  /**
   * Accessible label for the gauge (required if no id is provided)
   */
  'aria-label'?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Ref to the root element
   */
  ref?: Ref<HTMLDivElement>
  /**
   * Children render prop for custom rendering
   */
  children?: (props: {
    segments: {
      index: number
      isActive: boolean
      isCurrent: boolean
    }[]
    currentIndex: number
  }) => React.ReactNode
}

export const SegmentedGauge = ({
  value,
  min,
  max,
  description,
  size = 'sm',
  intent = 'basic',
  id,
  'aria-label': ariaLabel,
  className,
  ref,
  children,
  ...props
}: SegmentedGaugeProps) => {
  // Calculate segments from min and max
  const segments = max - min + 1
  const currentIndex = useMemo(() => {
    // If value is undefined or null, no segment is active
    if (value == null) {
      return -1
    }
    const normalizedValue = Math.max(min, Math.min(max, value))
    const range = max - min
    const segmentSize = range / (segments - 1)
    const rawIndex = (normalizedValue - min) / segmentSize

    // Clamp the index to valid range
    return Math.max(0, Math.min(segments - 1, Math.round(rawIndex)))
  }, [value, min, max, segments])

  // Generate unique IDs
  const internalLabelId = useId()
  const generatedId = useId()
  // Use provided id or generated one for the gauge element
  const gaugeId = id || generatedId

  const segmentsData = useMemo(() => {
    return Array.from({ length: segments }, (_, index) => ({
      index,
      isActive: currentIndex !== -1 && index <= currentIndex,
      isCurrent: currentIndex !== -1 && index === currentIndex,
    }))
  }, [segments, currentIndex])

  const contextValue = useMemo(
    () => ({
      value,
      min,
      max,
      segments,
      currentIndex,
      size,
      intent,
      labelId: internalLabelId,
      gaugeId,
    }),
    [value, min, max, segments, currentIndex, size, intent, internalLabelId, gaugeId]
  )

  // If children is provided, use render prop pattern
  if (children) {
    return (
      <SegmentedGaugeContext.Provider value={contextValue}>
        {children({
          segments: segmentsData,
          currentIndex,
        })}
      </SegmentedGaugeContext.Provider>
    )
  }

  /**
   * A `meter` role MUST have a value. If the value is not available, the component uses a `status` role instead.
   */
  const roleProps =
    value != null
      ? {
          role: 'meter',
          'aria-valuenow': value,
          'aria-valuemin': min,
          'aria-valuemax': max,
        }
      : {
          role: 'status',
        }

  // Default rendering
  return (
    <SegmentedGaugeContext.Provider value={contextValue}>
      <div
        id={gaugeId}
        data-spark-component="segmented-gauge"
        ref={ref}
        className={cx('gap-md flex items-center', className)}
        {...roleProps}
        aria-labelledby={id ? `${gaugeId}-label` : undefined}
        aria-label={!id ? ariaLabel : undefined}
        aria-describedby={internalLabelId}
        {...props}
      >
        <SegmentedGaugeTrack>
          {segmentsData.map(segment => (
            <SegmentedGaugeSegment
              key={segment.index}
              index={segment.index}
              isActive={segment.isActive}
              isCurrent={segment.isCurrent}
            />
          ))}
        </SegmentedGaugeTrack>

        {description && (
          <SegmentedGaugeLabel id={internalLabelId}>{description}</SegmentedGaugeLabel>
        )}
      </div>
    </SegmentedGaugeContext.Provider>
  )
}

SegmentedGauge.displayName = 'SegmentedGauge'
