import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { RadioGroup as RadixRadioGroup } from 'radix-ui'
import { HTMLAttributes, Ref } from 'react'

import { radioGroupStyles, RadioGroupVariantsProps } from './RadioGroup.styles'
import { RadioGroupProvider } from './RadioGroupProvider'
import { RadioInputVariantsProps } from './RadioInput.styles'

export interface RadioGroupProps
  extends RadioGroupVariantsProps,
    Pick<RadioInputVariantsProps, 'intent'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'dir' | 'onChange'>,
    useRender.ComponentProps<'div'> {
  /**
   * The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items.
   */
  defaultValue?: string
  /**
   * The controlled value of the radio item to check. Should be used in conjunction with onValueChange.
   */
  value?: string
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * When true, prevents the user from interacting with radio items.
   */
  disabled?: boolean
  /**
   * The name of the group. Submitted with its owning form as part of a name/value pair.
   */
  name?: string
  /**
   * When true, indicates that the user must check a radio item before the owning form can be submitted.
   */
  required?: boolean
  /**
   * The orientation of the component.
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The reading direction of the radio group.
   */
  dir?: 'ltr' | 'rtl'
  /**
   * When true, keyboard navigation will loop from last item to first, and vice versa.
   */
  loop?: boolean
  /**
   * When true, the label will be placed on the left side of the Radio
   */
  reverse?: boolean
  ref?: Ref<HTMLDivElement>
}

export const RadioGroup = ({
  orientation = 'vertical',
  loop = true,
  intent = 'basic',
  disabled,
  className,
  required: requiredProp,
  reverse = false,
  ref,
  render,
  children,
  ...others
}: RadioGroupProps) => {
  const { labelId, isInvalid, isRequired, description, name } = useFormFieldControl()
  const required = requiredProp !== undefined ? requiredProp : isRequired

  const radixProps = {
    name,
    disabled,
    orientation,
    loop,
    required,
    'aria-labelledby': labelId,
    'aria-invalid': isInvalid,
    'aria-required': required,
    'aria-describedby': description,
    ...others,
  }

  const defaultProps = {
    'data-spark-component': 'radio-group',
    className: radioGroupStyles({ orientation, className }),
    ...radixProps,
    children,
  }

  const element = useRender({
    defaultTagName: 'div',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'div'>(defaultProps, {}),
  })

  if (render) {
    return (
      <RadioGroupProvider reverse={reverse} intent={intent} disabled={disabled}>
        <RadixRadioGroup.RadioGroup asChild {...radixProps}>
          {element}
        </RadixRadioGroup.RadioGroup>
      </RadioGroupProvider>
    )
  }

  return (
    <RadioGroupProvider reverse={reverse} intent={intent} disabled={disabled}>
      <RadixRadioGroup.RadioGroup
        data-spark-component="radio-group"
        className={radioGroupStyles({ orientation, className })}
        ref={ref}
        asChild={false}
        {...radixProps}
      >
        {children}
      </RadixRadioGroup.RadioGroup>
    </RadioGroupProvider>
  )
}

RadioGroup.displayName = 'RadioGroup'
