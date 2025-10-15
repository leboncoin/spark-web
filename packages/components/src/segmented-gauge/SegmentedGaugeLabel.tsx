import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

import { useSegmentedGaugeContext } from './SegmentedGaugeContext'

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
