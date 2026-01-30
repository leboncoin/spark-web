import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cx } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren, Ref, useMemo, useState } from 'react'

import { ProgressContext } from './ProgressContext'
import { ProgressIndicatorStylesProps } from './ProgressIndicator'
import { ProgressTrack } from './ProgressTrack'

export interface ProgressProps
  extends Omit<ComponentProps<typeof BaseProgress.Root>, 'render'>,
    Pick<ProgressIndicatorStylesProps, 'intent'> {
  shape?: 'square' | 'rounded'
  /**
   * Callback called when the progress reaches its maximum value and the transition animation completes.
   */
  onComplete?: () => void
  /**
   * Function that returns a string value that provides a human-readable text alternative for the current value of the progress bar.
   * @deprecated Use `getAriaValueText` instead. This prop is kept for backward compatibility.
   */
  getValueLabel?: (value: number, max: number) => string
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

export const Progress = ({
  className,
  value: valueProp,
  max = 100,
  min = 0,
  shape = 'square',
  intent = 'basic',
  onComplete,
  getValueLabel,
  getAriaValueText: getAriaValueTextProp,
  children = <ProgressTrack />,
  ref,
  ...others
}: PropsWithChildren<ProgressProps>) => {
  const [labelId, setLabelId] = useState<string>()

  const contextValue = useMemo(() => {
    return {
      value: valueProp ?? null,
      max,
      min,
      intent,
      shape,
      onLabelId: setLabelId,
      onComplete,
    }
  }, [max, min, valueProp, intent, shape, setLabelId, onComplete])

  // Map getValueLabel to getAriaValueText for backward compatibility
  const getAriaValueText =
    getAriaValueTextProp ||
    (getValueLabel
      ? (formattedValue: string | null, value: number | null) => {
          if (value === null) return formattedValue ?? ''

          return getValueLabel(value, max)
        }
      : undefined)

  return (
    <ProgressContext.Provider value={contextValue}>
      <BaseProgress.Root
        data-spark-component="progress"
        ref={ref}
        className={cx('gap-sm focus-visible:u-outline grid grid-cols-[1fr_auto]', className)}
        value={valueProp ?? null}
        max={max}
        min={min}
        aria-labelledby={labelId}
        getAriaValueText={getAriaValueText}
        {...others}
      >
        {children}
      </BaseProgress.Root>
    </ProgressContext.Provider>
  )
}

Progress.displayName = 'Progress'
