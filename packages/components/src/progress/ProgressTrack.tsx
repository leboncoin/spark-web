import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cx } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { useProgress } from './ProgressContext'
import { ProgressIndicator } from './ProgressIndicator'

export type ProgressTrackProps = Omit<ComponentProps<typeof BaseProgress.Track>, 'render'>

export const ProgressTrack = ({ className, ...others }: ProgressTrackProps) => {
  const { shape } = useProgress()

  return (
    <BaseProgress.Track
      data-spark-component="progress-track"
      className={cx(
        'h-sz-4 relative col-span-2 w-full',
        'transform-gpu',
        'overflow-hidden',
        'bg-on-background/dim-4',
        { 'rounded-sm': shape === 'rounded' },
        className
      )}
      {...others}
    >
      <ProgressIndicator />
    </BaseProgress.Track>
  )
}

ProgressTrack.displayName = 'Progress.Track'
