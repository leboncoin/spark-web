import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cx } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren, Ref, useMemo, useState } from 'react'

import { MeterContext } from './MeterContext'
import { MeterIndicatorStylesProps } from './MeterTrack.styles'

export interface MeterProps
  extends Omit<ComponentProps<typeof BaseMeter.Root>, 'render'>,
    Pick<MeterIndicatorStylesProps, 'intent'> {
  /**
   * Shape of the meter track and indicator.
   */
  shape?: 'square' | 'rounded'
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

export const Meter = ({
  className,
  value,
  max = 100,
  min = 0,
  shape = 'rounded',
  intent = 'support',
  children,
  ref,
  ...others
}: PropsWithChildren<MeterProps>) => {
  const [labelId, setLabelId] = useState<string>()

  const contextValue = useMemo(() => {
    return {
      value: value ?? 0,
      max,
      min,
      intent,
      shape,
      onLabelId: setLabelId,
    }
  }, [max, min, value, intent, shape, setLabelId])

  return (
    <MeterContext.Provider value={contextValue}>
      <BaseMeter.Root
        data-spark-component="meter"
        ref={ref}
        className={cx('gap-y-sm focus-visible:u-outline box-border grid grid-cols-2', className)}
        value={value}
        max={max}
        min={min}
        aria-labelledby={labelId}
        {...others}
      >
        {children}
      </BaseMeter.Root>
    </MeterContext.Provider>
  )
}

Meter.displayName = 'Meter'
