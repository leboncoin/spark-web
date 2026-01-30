import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cx } from 'class-variance-authority'
import { ComponentProps, useRef, useState } from 'react'

import { useMeter } from './MeterContext'
import { meterIndicatorStyles, meterTrackStyles } from './MeterTrack.styles'
import { useIntersectionAnimation } from './useIntersectionAnimation'

export type MeterTrackProps = Omit<ComponentProps<typeof BaseMeter.Track>, 'render'>

export const MeterTrack = ({ className, ...others }: MeterTrackProps) => {
  const { value, max, min, intent, shape } = useMeter()
  const percentage = ((value - min) / (max - min)) * 100
  const trackRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Trigger animation when component enters viewport
  useIntersectionAnimation(trackRef, () => {
    setHasAnimated(true)
  })

  return (
    <BaseMeter.Track
      ref={trackRef}
      data-spark-component="meter-track"
      className={cx(meterTrackStyles(), { 'rounded-sm': shape === 'rounded' }, className)}
      {...others}
    >
      <BaseMeter.Indicator
        data-spark-component="meter-indicator"
        className={meterIndicatorStyles({ intent, shape })}
        style={{
          width: hasAnimated ? `${percentage}%` : '0%',
        }}
      />
    </BaseMeter.Track>
  )
}

MeterTrack.displayName = 'Meter.Track'
