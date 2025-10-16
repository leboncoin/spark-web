import { cx } from 'class-variance-authority'
import { ComponentProps, Ref, useMemo } from 'react'

import { useSegmentedGaugeContext } from './SegmentedGaugeContext'

export interface SegmentedGaugeSegmentProps extends ComponentProps<'div'> {
  /**
   * Index of this segment (0-based)
   */
  index?: number
  ref?: Ref<HTMLDivElement>
}

export const SegmentedGaugeSegment = ({
  index = 0,
  className,
  children,
  ref,
  ...props
}: SegmentedGaugeSegmentProps) => {
  const { size, intent, customColor, currentIndex } = useSegmentedGaugeContext()

  // Calculate isActive and isCurrent from context and index
  const isActive = currentIndex !== -1 && index <= currentIndex
  const isCurrent = currentIndex !== -1 && index === currentIndex

  const gaugeColor = useMemo(() => {
    // If customColor is provided, use it
    if (customColor) {
      return customColor
    }

    // Handle predefined intents
    switch (intent) {
      case 'main':
        return 'var(--color-main)'
      case 'support':
        return 'var(--color-support)'
      case 'basic':
        return 'var(--color-basic)'
      case 'accent':
        return 'var(--color-accent)'
      case 'success':
        return 'var(--color-success)'
      case 'alert':
        return 'var(--color-alert)'
      case 'danger':
        return 'var(--color-error)'
      case 'info':
        return 'var(--color-info)'
      case 'neutral':
        return 'var(--color-neutral)'
      default:
        return 'var(--color-neutral)'
    }
  }, [intent, customColor])

  const segmentClasses = cx(
    'border-outline relative rounded-full',
    {
      'h-sz-8 w-sz-24': size === 'sm',
      'h-sz-12 w-sz-36': size === 'md',
      'default:bg-[var(--gauge-color)]': isActive,
      'border-sm bg-surface': !isActive,
    },
    className
  )

  const indicatorClasses = cx(
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'default:bg-surface default:rounded-full',
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
      data-active={isActive}
      data-current={isCurrent}
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
