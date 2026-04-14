/**
 * @deprecated This hook is deprecated and no longer used internally.
 * The Stepper component now uses Base UI's NumberField which manages state internally.
 * This file is kept for backward compatibility but will be removed in a future version.
 */
import type { UseStepperArgs, UseStepperReturn } from './types'

export const useStepper = (_args: UseStepperArgs): UseStepperReturn => {
  // This hook is deprecated. State management is now handled by Base UI NumberField.
  return {
    groupProps: {},
    inputProps: {},
    incrementButtonProps: {},
    decrementButtonProps: {},
  }
}
