import { cx } from 'class-variance-authority'
import { Progress as RadixProgress } from 'radix-ui'
import { PropsWithChildren, Ref, useMemo, useState } from 'react'

import { ProgressBar } from './ProgressBar'
import { ProgressContext } from './ProgressContext'
import { ProgressIndicatorStylesProps } from './ProgressIndicator.styles'

export interface ProgressProps
  extends RadixProgress.ProgressProps,
    Pick<ProgressIndicatorStylesProps, 'intent'> {
  shape?: 'square' | 'rounded'
  isIndeterminate?: boolean
  ref?: Ref<HTMLDivElement>
}

export const Progress = ({
  className,
  value: valueProp,
  max = 100,
  shape = 'square',
  intent = 'basic',
  isIndeterminate = false,
  children = <ProgressBar />,
  ref,
  ...others
}: PropsWithChildren<ProgressProps>) => {
  const [labelId, setLabelId] = useState<string>()

  const value = useMemo(() => {
    return { value: valueProp ?? 0, max, intent, shape, isIndeterminate, onLabelId: setLabelId }
  }, [max, valueProp, intent, shape, isIndeterminate, setLabelId])

  return (
    <ProgressContext.Provider data-spark-component="progress" value={value}>
      <RadixProgress.Progress
        ref={ref}
        className={cx('gap-sm flex flex-col', className)}
        value={valueProp}
        aria-labelledby={labelId}
        max={max}
        {...others}
      >
        {children}
      </RadixProgress.Progress>
    </ProgressContext.Provider>
  )
}

Progress.displayName = 'Progress'
