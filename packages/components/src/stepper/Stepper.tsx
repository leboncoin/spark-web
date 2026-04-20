import { NumberField } from '@base-ui/react/number-field'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { cx } from 'class-variance-authority'
import { createContext, type PropsWithChildren, RefObject, useContext, useRef } from 'react'

import { inputGroupStyles } from '../input/InputGroup.styles'
import type { StepperProps } from './types'

interface StepperContextValue {
  inputRef: RefObject<HTMLInputElement | null>
  fieldId?: string
  fieldLabelId?: string
  fieldIsInvalid?: boolean
  fieldIsRequired?: boolean
  state?: 'error' | 'alert' | 'success'
  ariaLabel?: string
}

const StepperContext = createContext<StepperContextValue | null>(null)

export const Stepper = ({
  children,
  formatOptions,
  minValue,
  maxValue,
  ref: forwardedRef,
  onValueChange,
  locale = 'fr',
  name: nameProp,
  ...stepperProps
}: PropsWithChildren<StepperProps>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const formFieldControlProps = useFormFieldControl()
  const lastCommittedValueRef = useRef<number | null>(
    stepperProps.value ?? stepperProps.defaultValue ?? null
  )

  const name = formFieldControlProps.name ?? nameProp
  const disabled = formFieldControlProps.disabled ?? stepperProps.disabled
  const readOnly = formFieldControlProps.readOnly ?? stepperProps.readOnly
  const required = formFieldControlProps.isRequired ?? stepperProps.required

  // Base UI calls onValueChange on every keystroke, but react-aria only called it on blur.
  // We use onValueCommitted to preserve the old behavior where onValueChange is only called on blur for input changes,
  // but immediately for button clicks.
  const handleValueCommit = (value: number | null) => {
    // Allow null values to be propagated (when input is cleared)
    // This is necessary for controlled mode and React Hook Form validation
    if (onValueChange && value !== lastCommittedValueRef.current) {
      lastCommittedValueRef.current = value
      onValueChange(value)
    }
  }

  // Extract aria-label to pass to input, not to NumberField.Root
  const { 'aria-label': ariaLabel, ...restStepperProps } = stepperProps

  return (
    <StepperContext.Provider
      value={{
        inputRef,
        fieldId: formFieldControlProps.id,
        fieldLabelId: formFieldControlProps.labelId,
        fieldIsInvalid: formFieldControlProps.isInvalid,
        fieldIsRequired: required,
        state: stepperProps.state,
        ariaLabel,
      }}
    >
      <NumberField.Root
        {...restStepperProps}
        format={formatOptions}
        min={minValue}
        max={maxValue}
        locale={locale}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        name={name}
        inputRef={inputRef}
        onValueCommitted={handleValueCommit}
        aria-describedby={formFieldControlProps.description}
      >
        <div
          data-spark-component="stepper"
          ref={forwardedRef}
          className={cx(inputGroupStyles({ disabled, readOnly }), stepperProps.className)}
        >
          {children}
        </div>
      </NumberField.Root>
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
