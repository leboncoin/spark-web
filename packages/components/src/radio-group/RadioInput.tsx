import { useFormFieldControl } from '@spark-ui/components/form-field'
import { RadioGroup as RadixRadioGroup } from 'radix-ui'
import { ButtonHTMLAttributes, Ref } from 'react'

import { RadioIndicator } from './RadioIndicator'
import { radioInputVariants, RadioInputVariantsProps } from './RadioInput.styles'

export interface RadioInputProps
  extends RadioInputVariantsProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  /**
   * The value given as data when submitted with a name.
   */
  value: string
  /**
   * When true, prevents the user from interacting with the radio item.
   */
  disabled?: boolean
  /**
   * When true, indicates that the user must check the radio item before the owning form can be submitted.
   */
  required?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const RadioInput = ({ intent: intentProp, className, ref, ...others }: RadioInputProps) => {
  const { state } = useFormFieldControl()

  const intent = state ?? intentProp

  return (
    <RadixRadioGroup.RadioGroupItem
      data-spark-component="radio-input"
      ref={ref}
      className={radioInputVariants({ intent, className })}
      {...others}
    >
      <RadioIndicator intent={intent} forceMount />
    </RadixRadioGroup.RadioGroupItem>
  )
}

RadioInput.displayName = 'RadioGroup.RadioInput'
