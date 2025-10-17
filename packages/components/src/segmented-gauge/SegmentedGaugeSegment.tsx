import { cx } from 'class-variance-authority'
import { ComponentProps, Ref, useMemo } from 'react'

import { useSegmentedGaugeContext } from './SegmentedGaugeContext'

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
