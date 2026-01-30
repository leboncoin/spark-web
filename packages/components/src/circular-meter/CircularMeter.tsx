import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cx } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren, Ref, useMemo, useState } from 'react'

import { MeterIndicatorStylesProps } from '../meter/MeterTrack.styles'
import { circularMeterStyles, CircularMeterStylesProps } from './CircularMeter.styles'
import { CircularMeterContext } from './CircularMeterContext'

export type CircularMeterSize = 'sm' | 'md' | 'lg' | 'xl'

const CIRCULAR_METER_SIZE_CONFIG: Record<
  CircularMeterSize,
  { diameter: number; strokeWidth: number }
> = {
  sm: { diameter: 24, strokeWidth: 4 },
  md: { diameter: 64, strokeWidth: 8 },
  lg: { diameter: 96, strokeWidth: 8 },
  xl: { diameter: 128, strokeWidth: 8 },
}

export interface CircularMeterProps
  extends Omit<ComponentProps<typeof BaseMeter.Root>, 'render'>,
    Pick<MeterIndicatorStylesProps, 'intent'>,
    CircularMeterStylesProps {
  /**
   * Size of the circle.
   *
   * - `sm`: 24px diameter, 4px stroke width
   * - `md`: 64px diameter, 8px stroke width
   * - `lg`: 96px diameter, 8px stroke width
   * - `xl`: 128px diameter, 8px stroke width
   *
   * Defaults to `md`.
   */
  size?: CircularMeterSize
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
  /**
   * Orientation of the circular meter.
   *
   * - `vertical`: Elements are stacked vertically (default)
   * - `horizontal`: Elements are arranged horizontally
   */
  orientation?: 'vertical' | 'horizontal'
}

export const CircularMeter = ({
  className,
  value,
  max = 100,
  min = 0,
  size: sizeProp = 'lg',
  intent = 'support',
  orientation = 'vertical',
  children,
  ref,
  ...others
}: PropsWithChildren<CircularMeterProps>) => {
  const [labelId, setLabelId] = useState<string>()

  const { diameter: size, strokeWidth } = CIRCULAR_METER_SIZE_CONFIG[sizeProp]

  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  const contextValue = useMemo(() => {
    return {
      value: value ?? 0,
      max,
      min,
      intent,
      onLabelId: setLabelId,
      sizeProp,
      orientation: orientation,
      size,
      radius,
      circumference,
      strokeWidth,
    }
  }, [
    max,
    min,
    value,
    intent,
    setLabelId,
    sizeProp,
    orientation,
    size,
    radius,
    circumference,
    strokeWidth,
  ])

  return (
    <CircularMeterContext.Provider value={contextValue}>
      <BaseMeter.Root
        data-spark-component="circular-meter"
        ref={ref}
        className={cx(circularMeterStyles({ orientation }), className)}
        style={others.style}
        value={value}
        max={max}
        min={min}
        aria-labelledby={labelId}
        {...others}
      >
        {children}
      </BaseMeter.Root>
    </CircularMeterContext.Provider>
  )
}

CircularMeter.displayName = 'CircularMeter'
