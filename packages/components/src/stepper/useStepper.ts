import { useNumberField } from '@react-aria/numberfield'
import { useNumberFieldState } from '@react-stately/numberfield'

import type { UseStepperArgs, UseStepperReturn } from './types'

export const useStepper = ({
  inputRef,
  locale = 'fr',
  ...rest
}: UseStepperArgs): UseStepperReturn => {
  const state = useNumberFieldState({
    ...rest,
    isDisabled: rest.disabled,
    isReadOnly: rest.readOnly,
    isRequired: rest.required,
    locale,
  })

  /**
   * React Arias useNumberFieldState does not support the cases where value is unset (empty) and min/max constraints the value to positive or negative values only.
   * Cf: https://github.com/adobe/react-spectrum/blob/b7f8ed1a9a311d89719b1a746b0a58204841b21a/packages/%40react-stately/numberfield/src/useNumberFieldState.ts#L251C3-L260C76
   */
  const canDecrement =
    !(isNaN(state.numberValue) && state.minValue !== undefined && state.minValue >= 0) &&
    state.canDecrement

  const canIncrement =
    !(isNaN(state.numberValue) && state.maxValue !== undefined && state.maxValue <= 0) &&
    state.canIncrement

  const { groupProps, inputProps, incrementButtonProps, decrementButtonProps } = useNumberField(
    {
      isWheelDisabled: false,
      ...rest,
      isDisabled: rest.disabled,
      isReadOnly: rest.readOnly,
      isRequired: rest.required,
    },
    {
      ...state,
      canDecrement,
      canIncrement,
    },
    inputRef
  )

  return {
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  }
}
