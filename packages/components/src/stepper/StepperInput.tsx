import { NumberField } from '@base-ui/react/number-field'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'

import { Input as SparkInput } from '../input'
import { useStepperContext } from './Stepper'
import type { StepperInputProps } from './types'

const Input = ({ ref: forwardedRef, ...props }: StepperInputProps) => {
  const { inputRef, fieldId, fieldLabelId, fieldIsInvalid, fieldIsRequired, ariaLabel } =
    useStepperContext()
  const ref = useMergeRefs(forwardedRef, inputRef)
  const { className = '', ...remainingProps } = props

  // Only use aria-label if not wrapped in a FormField with a label (fieldLabelId would be set by FormField.Label)
  const hasFormFieldLabel = !!fieldLabelId

  return (
    <div className="relative inline-flex w-full">
      <NumberField.Input
        render={inputProps => {
          // Determine required attribute
          let required: boolean | undefined = undefined
          if (fieldIsRequired !== undefined) {
            required = fieldIsRequired
          } else if ('required' in inputProps) {
            required = (inputProps as any).required
          }

          // Determine aria-invalid attribute
          const ariaInvalid =
            fieldIsInvalid !== undefined ? fieldIsInvalid : inputProps['aria-invalid']

          return (
            <SparkInput
              ref={ref}
              {...inputProps}
              {...remainingProps}
              id={fieldId || inputProps.id}
              required={required}
              aria-invalid={ariaInvalid}
              aria-label={hasFormFieldLabel ? undefined : ariaLabel}
              className={`min-w-sz-56 text-center rounded-none! ${className}`}
            />
          )
        }}
      />
    </div>
  )
}

export const StepperInput = Input

Input.displayName = 'Stepper.Input'
