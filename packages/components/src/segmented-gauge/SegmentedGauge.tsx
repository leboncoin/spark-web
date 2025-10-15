import { cx } from 'class-variance-authority'
import { ComponentProps, createContext, Ref, useContext, useMemo } from 'react'

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
    SegmentedGauge: {
      Track: typeof SegmentedGaugeTrack
      Segment: typeof SegmentedGaugeSegment
      Label: typeof SegmentedGaugeLabel
    }
  }) => React.ReactNode
}

interface SegmentedGaugeContextValue {
  value: number
  min: number
  max: number
  segments: number
  segmentLabels: string[]
  currentIndex: number
  activeLabel: string
  size: 'sm' | 'md'
  intent: 'basic' | 'success' | 'alert' | 'danger' | 'info' | string
}

const SegmentedGaugeContext = createContext<SegmentedGaugeContextValue | null>(null)

export const useSegmentedGaugeContext = () => {
  const context = useContext(SegmentedGaugeContext)

  if (!context) {
    throw new Error('useSegmentedGaugeContext must be used within a SegmentedGauge provider')
  }

  return context
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
    }),
    [value, min, max, segments, segmentLabels, currentIndex, activeLabel, size, intent]
  )

  // If children is provided, use render prop pattern
  if (children) {
    return (
      <SegmentedGaugeContext.Provider value={contextValue}>
        {children({
          segments: segmentsData,
          activeLabel,
          currentIndex,
          SegmentedGauge: {
            Track: SegmentedGaugeTrack,
            Segment: SegmentedGaugeSegment,
            Label: SegmentedGaugeLabel,
          },
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

        <SegmentedGaugeLabel>{activeLabel}</SegmentedGaugeLabel>
      </div>
    </SegmentedGaugeContext.Provider>
  )
}

SegmentedGauge.displayName = 'SegmentedGauge'

// Track component
export interface SegmentedGaugeTrackProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export const SegmentedGaugeTrack = ({
  className,
  children,
  ref,
  ...props
}: SegmentedGaugeTrackProps) => {
  return (
    <div
      data-spark-component="segmented-gauge-track"
      ref={ref}
      className={cx('gap-sm relative flex rounded-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}

SegmentedGaugeTrack.displayName = 'SegmentedGauge.Track'

// Segment component
export interface SegmentedGaugeSegmentProps extends ComponentProps<'div'> {
  index: number
  isActive: boolean
  isCurrent: boolean
  ref?: Ref<HTMLDivElement>
}

export const SegmentedGaugeSegment = ({
  isActive,
  isCurrent,
  className,
  children,
  ref,
  ...props
}: SegmentedGaugeSegmentProps) => {
  const { size, intent } = useSegmentedGaugeContext()

  const gaugeColor = useMemo(() => {
    // Handle predefined intents
    switch (intent) {
      case 'success':
        return 'var(--color-success)'
      case 'alert':
        return 'var(--color-alert)'
      case 'danger':
        return 'var(--color-error)'
      case 'info':
        return 'var(--color-info)'
      case 'basic':
        return 'var(--color-basic)'
      default:
        // Handle custom colors (hex, CSS variables, etc.)
        return intent || 'var(--color-basic)'
    }
  }, [intent])

  const segmentClasses = cx(
    'border-outline relative rounded-full',
    {
      'h-sz-8 w-sz-24': size === 'sm',
      'h-sz-12 w-sz-36': size === 'md',
      'default:bg-[color-mix(in_srgb,var(--gauge-color)_var(--opacity-dim-1),transparent)]':
        isActive,
      'border-sm': !isActive,
    },
    className
  )

  const indicatorClasses = cx(
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'default:bg-surface/dim-1 default:rounded-full',
    'border-[var(--gauge-color)]',
    {
      'size-sz-12 border-md': size === 'sm',
      'size-sz-20 border-lg': size === 'md',
    }
  )

  return (
    <div
      data-spark-component="segmented-gauge-segment"
      data-testid="segmented-gauge-segment"
      ref={ref}
      style={
        {
          '--gauge-color': gaugeColor,
        } as React.CSSProperties
      }
      className={segmentClasses}
      {...props}
    >
      {children}
      {isCurrent && <div className={indicatorClasses} aria-hidden="true" />}
    </div>
  )
}

SegmentedGaugeSegment.displayName = 'SegmentedGauge.Segment'

// Label component
export interface SegmentedGaugeLabelProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement>
}

export const SegmentedGaugeLabel = ({
  className,
  children,
  ref,
  ...props
}: SegmentedGaugeLabelProps) => {
  const { activeLabel } = useSegmentedGaugeContext()

  return (
    <span
      data-spark-component="segmented-gauge-label"
      ref={ref}
      className={cx('default:text-on-surface default:text-body-2', className)}
      {...props}
    >
      {children || activeLabel}
    </span>
  )
}

SegmentedGaugeLabel.displayName = 'SegmentedGauge.Label'
