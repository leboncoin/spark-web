import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cx } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren, Ref, useMemo, useState } from 'react'

import { MeterContext } from './MeterContext'
import { MeterIndicatorStylesProps } from './MeterTrack.styles'

export interface MeterProps
  extends ComponentProps<typeof BaseMeter.Root>,
    Pick<MeterIndicatorStylesProps, 'intent'> {
  /**
   * Shape of the meter track and indicator.
   */
  shape?: 'square' | 'rounded'
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
        className={cx(
          'gap-y-sm gap-x-md focus-visible:u-outline box-border grid grid-cols-[1fr_auto]',
          className
        )}
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
