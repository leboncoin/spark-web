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
  value: number
  /**
   * Labels for each segment (required)
   */
  segmentLabels: string[]
  /**
   * Size of the gauge
   */
  size?: 'sm' | 'md'
  /**
   * Intent of the gauge - can be a predefined intent or any custom color (hex, CSS variable, etc.)
   */
  intent?: 'basic' | 'success' | 'alert' | 'danger' | 'info' | string
  /**
   * Accessible label for the gauge
   */
  'aria-label': string
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
      label: string
    }[]
    activeLabel: string
    currentIndex: number
  }) => React.ReactNode
}

export const SegmentedGauge = ({
  value,
  segmentLabels,
  size = 'sm',
  intent = 'basic',
  'aria-label': ariaLabel,
  className,
  ref,
  children,
  ...props
}: SegmentedGaugeProps) => {
  // Calculate segments, min, and max from segmentLabels
  const segments = segmentLabels.length
  const min = 0
  const max = segments - 1
  const currentIndex = useMemo(() => {
    const normalizedValue = Math.max(min, Math.min(max, value))
    const range = max - min
    const segmentSize = range / (segments - 1)
    const rawIndex = (normalizedValue - min) / segmentSize

    // Clamp the index to valid range
    return Math.max(0, Math.min(segments - 1, Math.round(rawIndex)))
  }, [value, min, max, segments])

  const activeLabel = useMemo(() => {
    return segmentLabels[currentIndex] || `Value ${currentIndex + 1}`
  }, [segmentLabels, currentIndex])

  // Generate unique ID for the label using React's useId
  const labelId = useId()

  const segmentsData = useMemo(() => {
    return Array.from({ length: segments }, (_, index) => ({
      index,
      isActive: index <= currentIndex,
      isCurrent: index === currentIndex,
      label: segmentLabels[index] || `Segment ${index + 1}`,
    }))
  }, [segments, currentIndex, segmentLabels])

  const contextValue = useMemo(
    () => ({
      value,
      min,
      max,
      segments,
      segmentLabels,
      currentIndex,
      activeLabel,
      size,
      intent,
      labelId,
    }),
    [value, min, max, segments, segmentLabels, currentIndex, activeLabel, size, intent, labelId]
  )

  // If children is provided, use render prop pattern
  if (children) {
    return (
      <SegmentedGaugeContext.Provider value={contextValue}>
        {children({
          segments: segmentsData,
          activeLabel,
          currentIndex,
        })}
      </SegmentedGaugeContext.Provider>
    )
  }

  // Default rendering
  return (
    <SegmentedGaugeContext.Provider value={contextValue}>
      <div
        data-spark-component="segmented-gauge"
        ref={ref}
        className={cx('gap-md flex items-center', className)}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-describedby={labelId}
        {...props}
      >
        <SegmentedGaugeTrack>
          {segmentsData.map(segment => (
            <SegmentedGaugeSegment
              key={segment.index}
              index={segment.index}
              isActive={segment.isActive}
              isCurrent={segment.isCurrent}
              aria-label={segment.label}
            />
          ))}
        </SegmentedGaugeTrack>

        <SegmentedGaugeLabel id={labelId}>{activeLabel}</SegmentedGaugeLabel>
      </div>
    </SegmentedGaugeContext.Provider>
  )
}

SegmentedGauge.displayName = 'SegmentedGauge'
