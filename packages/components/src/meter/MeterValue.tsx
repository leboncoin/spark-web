import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cx } from 'class-variance-authority'
import { ComponentProps, ReactNode } from 'react'

export type MeterValueProps = Omit<
  ComponentProps<typeof BaseMeter.Value>,
  'render' | 'children'
> & {
  children?: ((formattedValue: string, value: number) => ReactNode) | null | undefined
}

export const MeterValue = ({ className, children, ...others }: MeterValueProps) => {
  return (
    <BaseMeter.Value
      data-spark-component="meter-value"
      className={cx('default:text-body-1 text-on-surface', 'col-start-2 text-right', className)}
      {...others}
    >
      {children}
    </BaseMeter.Value>
  )
}

MeterValue.displayName = 'Meter.Value'
