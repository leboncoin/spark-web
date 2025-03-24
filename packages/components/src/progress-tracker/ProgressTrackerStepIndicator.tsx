import { Check } from '@spark-ui/icons/Check'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Icon } from '../icon'
import { useProgressTrackerContext, useProgressTrackerStepContext } from './ProgressTrackerContext'
import { stepIndicatorVariant } from './ProgressTrackerStepIndicator.styles'

export type ProgressTrackerStepIndicatorProps = ComponentPropsWithoutRef<'span'> & {
  /**
   * The content to be rendered when step status is complete (checkmark icon by default)
   */
  complete?: ReactNode
  /**
   * The content to be rendered when step status is incomplete (step index by default)
   */
  incomplete?: ReactNode
}

const CompleteIndicator = () => (
  <Icon size="sm">
    <Check />
  </Icon>
)

export const ProgressTrackerStepIndicator = ({
  complete,
  incomplete,
  className,
}: ProgressTrackerStepIndicatorProps) => {
  const { size, intent, design } = useProgressTrackerContext()
  const { index, state } = useProgressTrackerStepContext()

  return (
    <span
      className={stepIndicatorVariant({ size, intent, design, state, className })}
      aria-hidden="true"
    >
      {size !== 'sm' && (
        <>
          {state === 'complete' && (complete === undefined ? <CompleteIndicator /> : complete)}
          {state !== 'complete' && (incomplete === undefined ? `${index + 1}` : incomplete)}
        </>
      )}
    </span>
  )
}

ProgressTrackerStepIndicator.displayName = 'ProgressTracker.StepIndicator'
