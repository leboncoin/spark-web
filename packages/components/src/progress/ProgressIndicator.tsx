import { Progress as RadixProgress } from 'radix-ui'
import { ComponentPropsWithRef, PropsWithChildren } from 'react'

import { useProgress } from './ProgressContext'
import { progressIndicatorStyles } from './ProgressIndicator.styles'

export type ProgressIndicatorProps = ComponentPropsWithRef<'div'>

export const ProgressIndicator = ({
  className,
  style,
  ref,
  onTransitionEnd,
  ...others
}: PropsWithChildren<ProgressIndicatorProps>) => {
  const { value, max, intent, shape, isIndeterminate, onComplete } = useProgress()
  const x = ((max - value) / max) * 100

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    // Call the original onTransitionEnd if provided
    onTransitionEnd?.(event)

    // If progress is complete and we have a callback, call it
    if (value >= max && onComplete && !isIndeterminate) {
      onComplete()
    }
  }

  return (
    <RadixProgress.ProgressIndicator
      data-spark-component="progress-indicator"
      className={progressIndicatorStyles({ className, intent, shape, isIndeterminate })}
      style={{ ...style, ...(!isIndeterminate && { transform: `translateX(-${x}%)` }) }}
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      {...others}
    />
  )
}

ProgressIndicator.displayName = 'Progress.Indicator'
