import { useButton } from '@react-aria/button'
import { Minus } from '@spark-ui/icons/Minus'
import { Plus } from '@spark-ui/icons/Plus'
import { type PropsWithChildren, useRef } from 'react'

import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { InputGroup } from '../input'
import { useStepperContext } from './Stepper'
import type { StepperButtonProps } from './types'

const IncrementButton = ({
  children,
  design = 'ghost',
  intent = 'neutral',
  className,
  ref: forwardedRef,
  ...rest
}: PropsWithChildren<StepperButtonProps>) => {
  const innerRef = useRef<HTMLButtonElement>(null)
  const ref = forwardedRef && typeof forwardedRef !== 'function' ? forwardedRef : innerRef

  const { incrementButtonProps } = useStepperContext()
  const { buttonProps } = useButton({ ...incrementButtonProps, ...rest }, ref)

  return (
    <InputGroup.TrailingAddon asChild>
      <IconButton
        ref={ref}
        design={design}
        intent={intent}
        className={className}
        aria-label={buttonProps['aria-label'] as string}
        {...buttonProps}
      >
        {children || (
          <Icon>
            <Plus />
          </Icon>
        )}
      </IconButton>
    </InputGroup.TrailingAddon>
  )
}

const DecrementButton = ({
  children,
  design = 'ghost',
  intent = 'neutral',
  className,
  ref: forwardedRef,
  ...rest
}: PropsWithChildren<StepperButtonProps>) => {
  const innerRef = useRef<HTMLButtonElement>(null)
  const ref = forwardedRef && typeof forwardedRef !== 'function' ? forwardedRef : innerRef

  const { decrementButtonProps } = useStepperContext()
  const { buttonProps } = useButton({ ...decrementButtonProps, ...rest }, ref)

  return (
    <InputGroup.LeadingAddon asChild>
      <IconButton
        ref={ref}
        design={design}
        intent={intent}
        className={className}
        aria-label={buttonProps['aria-label'] as string}
        {...buttonProps}
      >
        {children || (
          <Icon>
            <Minus />
          </Icon>
        )}
      </IconButton>
    </InputGroup.LeadingAddon>
  )
}

export const StepperIncrementButton = Object.assign(IncrementButton, {
  id: 'TrailingAddon',
})

export const StepperDecrementButton = Object.assign(DecrementButton, {
  id: 'LeadingAddon',
})

IncrementButton.displayName = 'Stepper.DecrementButton'
DecrementButton.displayName = 'Stepper.DecrementButton'
