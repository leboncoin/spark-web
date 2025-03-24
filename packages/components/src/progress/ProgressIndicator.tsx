import { Progress as RadixProgress } from 'radix-ui'
import { ComponentPropsWithRef, PropsWithChildren } from 'react'

import { useProgress } from './ProgressContext'
import { progressIndicatorStyles } from './ProgressIndicator.styles'

export type ProgressIndicatorProps = ComponentPropsWithRef<'div'>

export const ProgressIndicator = ({
  className,
  style,
  ref,
  ...others
}: PropsWithChildren<ProgressIndicatorProps>) => {
  const { value, max, intent, shape, isIndeterminate } = useProgress()
  const x = ((max - value) / max) * 100

  return (
    <RadixProgress.ProgressIndicator
      className={progressIndicatorStyles({ className, intent, shape, isIndeterminate })}
      style={{ ...style, ...(!isIndeterminate && { transform: `translateX(-${x}%)` }) }}
      ref={ref}
      {...others}
    />
  )
}

ProgressIndicator.displayName = 'Progress.Indicator'
