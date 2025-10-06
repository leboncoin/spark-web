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

  const { groupProps, inputProps, incrementButtonProps, decrementButtonProps } = useNumberField(
    {
      isWheelDisabled: false,
      ...rest,
      isDisabled: rest.disabled,
      isReadOnly: rest.readOnly,
      isRequired: rest.required,
    },
    state,
    inputRef
  )

  return {
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  }
}
