import { NumberField } from '@base-ui/react/number-field'
import { Minus } from '@spark-ui/icons/Minus'
import { Plus } from '@spark-ui/icons/Plus'
import { cx } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { useStepperContext } from './Stepper'
import type { StepperButtonProps } from './types'

const IncrementButton = ({
  children,
  design = 'ghost',
  intent = 'neutral',
  className,
  ref: forwardedRef,
  disabled,
  ...rest
}: PropsWithChildren<StepperButtonProps>) => {
  const { fieldId, state } = useStepperContext()

  return (
    <NumberField.Increment
      render={buttonProps => {
        const isDisabled = disabled || ('disabled' in buttonProps && (buttonProps as any).disabled)
        const isReadOnly = 'readOnly' in buttonProps && (buttonProps as any).readOnly
        const isInactive = isDisabled || isReadOnly

        return (
          <div
            className={cx('rounded-r-lg', isInactive ? 'bg-on-surface/dim-5' : null)}
            data-spark-component="stepper-increment-button"
          >
            <IconButton
              ref={forwardedRef}
              design={design}
              intent={intent}
              className={cx(
                'overflow-hidden border-sm shrink-0 h-full focus-visible:relative focus-visible:z-raised mx-0',
                'rounded-l-0! -ml-px rounded-r-lg',
                state === 'error' && 'border-error',
                state === 'alert' && 'border-alert',
                state === 'success' && 'border-success',
                !state && 'border-outline',
                className
              )}
              {...rest}
              {...buttonProps}
              aria-label={rest['aria-label'] || (buttonProps['aria-label'] as string)}
              aria-controls={fieldId}
              disabled={isDisabled}
            >
              {children || (
                <Icon>
                  <Plus />
                </Icon>
              )}
            </IconButton>
          </div>
        )
      }}
    />
  )
}

const DecrementButton = ({
  children,
  design = 'ghost',
  intent = 'neutral',
  className,
  ref: forwardedRef,
  disabled,
  ...rest
}: PropsWithChildren<StepperButtonProps>) => {
  const { fieldId, state } = useStepperContext()

  return (
    <NumberField.Decrement
      render={buttonProps => {
        const isDisabled = disabled || ('disabled' in buttonProps && (buttonProps as any).disabled)
        const isReadOnly = 'readOnly' in buttonProps && (buttonProps as any).readOnly
        const isInactive = isDisabled || isReadOnly

        return (
          <div
            className={cx('rounded-l-lg', isInactive ? 'bg-on-surface/dim-5' : null)}
            data-spark-component="stepper-decrement-button"
          >
            <IconButton
              ref={forwardedRef}
              design={design}
              intent={intent}
              className={cx(
                'overflow-hidden border-sm shrink-0 h-full focus-visible:relative focus-visible:z-raised mx-0',
                'rounded-r-0! -mr-px rounded-l-lg',
                state === 'error' && 'border-error',
                state === 'alert' && 'border-alert',
                state === 'success' && 'border-success',
                !state && 'border-outline',
                className
              )}
              {...rest}
              {...buttonProps}
              aria-label={rest['aria-label'] || (buttonProps['aria-label'] as string)}
              aria-controls={fieldId}
              disabled={isDisabled}
            >
              {children || (
                <Icon>
                  <Minus />
                </Icon>
              )}
            </IconButton>
          </div>
        )
      }}
    />
  )
}

export const StepperIncrementButton = IncrementButton

export const StepperDecrementButton = DecrementButton

IncrementButton.displayName = 'Stepper.IncrementButton'
DecrementButton.displayName = 'Stepper.DecrementButton'
