import { cx } from 'class-variance-authority'
import { ComponentProps, Ref } from 'react'

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
