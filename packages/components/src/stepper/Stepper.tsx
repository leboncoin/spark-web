import { useFormFieldControl } from '@spark-ui/components/form-field'
import { createContext, type PropsWithChildren, RefObject, useContext, useRef } from 'react'

import { InputGroup } from '../input'
import type { StepperProps, UseStepperReturn } from './types'
import { useStepper } from './useStepper'

const StepperContext = createContext<
  (Omit<UseStepperReturn, 'groupProps'> & { inputRef: RefObject<HTMLInputElement | null> }) | null
>(null)

export const Stepper = ({
  children,
  formatOptions,
  minValue,
  maxValue,
  ref: forwardedRef,
  ...stepperProps
}: PropsWithChildren<StepperProps>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    groupProps,
    inputProps: _inputProps,
    incrementButtonProps: _incrementButtonProps,
    decrementButtonProps: _decrementButtonProps,
  } = useStepper({
    ...{
      ...stepperProps,
      /**
       * To enable the possibility to init the stepper with empty (undefined) value,
       * we need to force the empty value to NaN.
       * Cf. https://github.com/adobe/react-spectrum/issues/5524
       */
      ...('value' in stepperProps && { value: stepperProps.value ?? NaN }),
      onChange: stepperProps.onValueChange,
    },
    formatOptions,
    minValue,
    maxValue,
    inputRef,
  })

  const formFieldControlProps = useFormFieldControl()
  const isWrappedInFormField = !!formFieldControlProps.id

  const incrementButtonProps = {
    ..._incrementButtonProps,
    ...(isWrappedInFormField && { 'aria-controls': formFieldControlProps.id }),
  }

  const decrementButtonProps = {
    ..._decrementButtonProps,
    ...(isWrappedInFormField && { 'aria-controls': formFieldControlProps.id }),
  }

  const inputProps = {
    ..._inputProps,
    ...(isWrappedInFormField && {
      id: formFieldControlProps.id,
      required: formFieldControlProps.isRequired,
      'aria-invalid': formFieldControlProps.isInvalid ? true : undefined,
    }),
  }

  const { onValueChange: _, ...remainingStepperProps } = stepperProps

  return (
    <StepperContext.Provider
      value={{ incrementButtonProps, decrementButtonProps, inputProps, inputRef }}
    >
      <InputGroup
        {...remainingStepperProps}
        {...groupProps}
        data-spark-component="stepper"
        ref={forwardedRef}
      >
        {children}
      </InputGroup>
    </StepperContext.Provider>
  )
}

Stepper.displayName = 'Stepper'

export const useStepperContext = () => {
  const context = useContext(StepperContext)

  if (!context) {
    throw Error('useStepperContext must be used within a Stepper provider')
  }

  return context
}
