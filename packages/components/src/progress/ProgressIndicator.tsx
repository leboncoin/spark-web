import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren } from 'react'

import { useProgress } from './ProgressContext'

export const progressIndicatorStyles = cva(['h-full w-full', 'transition-width duration-400'], {
  variants: {
    /**
     * Color scheme of the progress component.
     */
    intent: {
      basic: ['bg-basic'],
      main: ['bg-main'],
      support: ['bg-support'],
      accent: ['bg-accent'],
      success: ['bg-success'],
      alert: ['bg-alert'],
      danger: ['bg-error'],
      info: ['bg-info'],
      neutral: ['bg-neutral'],
    },
    /**
     * Shape of the progress component.
     */
    shape: {
      square: [],
      rounded: ['rounded-sm'],
    },
  },
})

export type ProgressIndicatorStylesProps = VariantProps<typeof progressIndicatorStyles>

export type ProgressIndicatorProps = Omit<ComponentProps<typeof BaseProgress.Indicator>, 'render'>

export const ProgressIndicator = ({
  className,
  style,
  ref,
  onTransitionEnd,
  ...others
}: PropsWithChildren<ProgressIndicatorProps>) => {
  const { value, max, min, intent, shape, onComplete } = useProgress()

  const percentage = value !== null ? ((value - min) / (max - min)) * 100 : 0
  const isIndeterminate = value === null

  const handleTransitionEnd = (
    event: Parameters<NonNullable<ProgressIndicatorProps['onTransitionEnd']>>[0]
  ) => {
    // Call the original onTransitionEnd if provided
    onTransitionEnd?.(event)

    // If progress is complete and we have a callback, call it
    if (value !== null && value >= max && onComplete) {
      onComplete()
    }
  }

  return (
    <BaseProgress.Indicator
      data-spark-component="progress-indicator"
      className={cx(
        progressIndicatorStyles({
          className,
          intent,
          shape,
        }),
        isIndeterminate && 'animate-standalone-indeterminate-bar absolute -translate-x-1/2'
      )}
      style={{
        ...style,
        ...(!isIndeterminate && value !== null && { width: `${percentage}%` }),
      }}
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      {...others}
    />
  )
}

ProgressIndicator.displayName = 'ProgressIndicator'
