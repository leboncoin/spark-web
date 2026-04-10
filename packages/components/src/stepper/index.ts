import { Stepper as Root } from './Stepper'
import {
  StepperDecrementButton as DecrementButton,
  StepperIncrementButton as IncrementButton,
} from './StepperButton'
import { StepperInput as Input } from './StepperInput'

/**
 * A numeric input component with increment and decrement buttons for adjusting values.
 */
export const Stepper: typeof Root & {
  IncrementButton: typeof IncrementButton
  DecrementButton: typeof DecrementButton
  Input: typeof Input
} = Object.assign(Root, { IncrementButton, DecrementButton, Input })

Stepper.displayName = 'Stepper'
IncrementButton.displayName = 'Stepper.IncrementButton'
DecrementButton.displayName = 'Stepper.DecrementButton'
Input.displayName = 'Stepper.Input'

export type { StepperProps, StepperButtonProps, StepperInputProps } from './types'
