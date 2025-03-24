import { ComponentPropsWithRef, PropsWithChildren } from 'react'

import { progressBarStyles } from './ProgressBar.styles'
import { useProgress } from './ProgressContext'
import { ProgressIndicator } from './ProgressIndicator'

export type ProgressBarProps = ComponentPropsWithRef<'div'>

export const ProgressBar = ({
  className,
  children = <ProgressIndicator />,
  ref,
  ...others
}: PropsWithChildren<ProgressBarProps>) => {
  const { shape } = useProgress()

  return (
    <div className={progressBarStyles({ className, shape })} ref={ref} {...others}>
      {children}
    </div>
  )
}

ProgressBar.displayName = 'Progress.Bar'
