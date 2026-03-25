import { Radio } from '@base-ui/react/radio'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { HTMLAttributes, ReactElement, Ref } from 'react'

import { RadioIndicator } from './RadioIndicator'
import { radioInputVariants, RadioInputVariantsProps } from './RadioInput.styles'

export interface RadioInputProps
  extends RadioInputVariantsProps,
    Omit<HTMLAttributes<HTMLElement>, 'value' | 'onChange'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * Uses Base UI's render prop internally to merge behaviour into the child element.
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
  /**
   * Ref forwarded to the hidden `<input type="radio">` rendered by Base UI.
   * Useful for programmatic activation (e.g. clicking from an associated label span).
   */
  inputRef?: Ref<HTMLInputElement>
  ref?: Ref<HTMLElement>
  /**
   * When true, the visual radio input (outer ring and inner dot) is visually hidden but remains
   * accessible in the DOM. Useful for custom radio appearances where only the label matters visually.
   * @default false
   */
  hideInput?: boolean
}

export const RadioInput = ({
  intent: intentProp,
  className,
  asChild,
  children,
  inputRef,
  hideInput = false,
  ref,
  ...others
}: RadioInputProps) => {
  const { state } = useFormFieldControl()

  const intent = state ?? intentProp

  return (
    <Radio.Root
      data-spark-component="radio-input"
      ref={ref}
      inputRef={inputRef}
      render={asChild ? (children as ReactElement) : undefined}
      className={hideInput ? 'sr-only' : radioInputVariants({ intent, className })}
      {...others}
    >
      {!asChild && !hideInput && <RadioIndicator intent={intent} keepMounted />}
    </Radio.Root>
  )
}

RadioInput.displayName = 'RadioGroup.RadioInput'
