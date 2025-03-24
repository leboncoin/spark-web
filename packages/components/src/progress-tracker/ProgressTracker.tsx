import { cx } from 'class-variance-authority'
import { type ComponentPropsWithRef, type PropsWithChildren, useState } from 'react'

import { progressList } from './ProgressTracker.styles'
import {
  ProgressTrackerContext,
  type ProgressTrackerContextInterface,
} from './ProgressTrackerContext'
import type { StepIndicatorVariantProps } from './ProgressTrackerStepIndicator.styles'

export interface ProgressTrackerProps
  extends ComponentPropsWithRef<'div'>,
    Pick<StepIndicatorVariantProps, 'size' | 'intent' | 'design'> {
  /**
   * The orientation of the progress tracker
   * @default 'horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The index of the current step.
   * @default 0
   */
  stepIndex?: number
  /**
   * Event handler called when clicking on a step.
   */
  onStepClick?: (stepIndex: number) => void
  /**
   * Sets the component as interactive or not.
   * @default false
   */
  readOnly?: boolean
}

export const ProgressTracker = ({
  stepIndex = 0,
  onStepClick,
  readOnly = false,
  intent = 'basic',
  size = 'lg',
  design = 'outline',
  orientation = 'horizontal',
  children,
  className,
  ref,
  ...rest
}: PropsWithChildren<ProgressTrackerProps>) => {
  const [steps, setSteps] = useState<ProgressTrackerContextInterface['steps']>(new Map())

  const Component = readOnly ? 'div' : 'nav'

  return (
    <ProgressTrackerContext.Provider
      value={{ stepIndex, onStepClick, steps, setSteps, size, intent, design, readOnly }}
    >
      <Component
        ref={ref}
        data-spark-component="progress-tracker"
        className={cx('inline-flex', className)}
        {...rest}
      >
        <ol
          data-orientation={orientation}
          className={progressList}
          style={{ counterReset: 'step' }}
        >
          {children}
        </ol>
      </Component>
    </ProgressTrackerContext.Provider>
  )
}

ProgressTracker.displayName = 'ProgressTracker'
