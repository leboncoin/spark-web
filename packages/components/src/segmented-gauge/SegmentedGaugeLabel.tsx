import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

import { useSegmentedGaugeContext } from './SegmentedGaugeContext'

export interface SegmentedGaugeLabelProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement>
  id?: string
}

export const SegmentedGaugeLabel = ({
  className,
  children,
  ref,
  id,
  ...props
}: SegmentedGaugeLabelProps) => {
  const { activeLabel, labelId } = useSegmentedGaugeContext()

  return (
    <span
      data-spark-component="segmented-gauge-label"
      data-testid="segmented-gauge-label"
      ref={ref}
      id={id || labelId}
      className={cx('default:text-on-surface default:text-body-2', className)}
      {...props}
    >
      {children || activeLabel}
    </span>
  )
}

SegmentedGaugeLabel.displayName = 'SegmentedGauge.Label'
