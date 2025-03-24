import { type ComponentPropsWithRef, type ReactNode, useEffect, useId } from 'react'

import {
  ID_PREFIX,
  ProgressTrackerStepContext,
  useProgressTrackerContext,
} from './ProgressTrackerContext'
import { stepButtonVariant, stepItemVariant } from './ProgressTrackerStep.styles'
import { ProgressTrackerStepIndicator } from './ProgressTrackerStepIndicator'

export type ProgressTrackerStepProps = ComponentPropsWithRef<'li'> &
  (
    | {
        disabled?: boolean
        children: ReactNode
      }
    | {
        disabled?: boolean
        'aria-label': string
      }
  )

export const ProgressTrackerStep = ({
  disabled = false,
  children,
  'aria-label': ariaLabel,
  className,
  ref,
  ...rest
}: ProgressTrackerStepProps) => {
  const {
    stepIndex: currentStepIndex,
    steps,
    onStepClick,
    setSteps,
    size,
    intent,
    readOnly,
  } = useProgressTrackerContext()

  const stepId = `${ID_PREFIX}-step-${useId()}`
  const stepIndex = [...steps.keys()].indexOf(stepId)

  const disabledAfter = (() => {
    const nextStepId = [...steps.keys()][stepIndex + 1]

    return !!(nextStepId && steps.get(nextStepId)?.includes('disabled'))
  })()

  const progressState = (() => {
    if (stepIndex === currentStepIndex) return 'active'
    else if (stepIndex < currentStepIndex) return 'complete'
    else return 'incomplete'
  })()

  useEffect(() => {
    setSteps(steps => {
      const newSteps = new Map(steps)

      return newSteps.set(
        stepId,
        [progressState, disabled ? 'disabled' : ''].filter(v => !!v)
      )
    })

    return () => {
      setSteps(steps => {
        steps.delete(stepId)

        return steps
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <li
      id={stepId}
      ref={ref}
      data-state={progressState}
      {...(progressState === 'active' && {
        'aria-current': 'step',
      })}
      className={stepItemVariant({
        size,
        intent,
        disabled,
        disabledAfter,
      })}
      {...rest}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        data-interactive={!disabled && !readOnly}
        {...(!disabled &&
          !readOnly && {
            onClick: () => onStepClick?.(stepIndex),
          })}
        disabled={disabled}
        className={stepButtonVariant({
          size,
          readOnly,
          className,
        })}
      >
        <ProgressTrackerStepContext.Provider
          value={{
            index: stepIndex,
            state: progressState,
          }}
        >
          {children || <ProgressTrackerStepIndicator />}
        </ProgressTrackerStepContext.Provider>
      </button>
    </li>
  )
}

ProgressTrackerStep.displayName = 'ProgressTracker.Step'
