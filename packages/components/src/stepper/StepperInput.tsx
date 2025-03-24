import { useMergeRefs } from '@spark-ui/use-merge-refs'

import { Input as SparkInput } from '../input'
import { useStepperContext } from './Stepper'
import type { StepperInputProps } from './types'

const Input = ({ ref: forwardedRef, ...props }: StepperInputProps) => {
  const { inputRef, inputProps } = useStepperContext()
  const ref = useMergeRefs(forwardedRef, inputRef)
  const { className = '', ...remainingProps } = props

  return (
    <SparkInput
      ref={ref}
      {...remainingProps}
      {...inputProps}
      className={`min-w-sz-56 text-center ${className}`}
    />
  )
}

export const StepperInput = Object.assign(Input, {
  id: 'Input',
})

Input.displayName = 'Stepper.Input'
