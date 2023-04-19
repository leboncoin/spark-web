import { RadioGroup as RadioGroupPrimitive } from '@radix-ui/react-radio-group'
import { cva } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'

import { RadioGroupProvider } from './RadioGroupProvider'
import { RadioInputVariantsProps } from './RadioInput.variants'

export const radioGroupStyles = cva(['gap-xl flex'], {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

export interface RadioGroupProps
  extends Pick<RadioInputVariantsProps, 'intent' | 'size'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'dir'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
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
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { orientation = 'vertical', loop = true, intent, size, disabled, className, ...others },
    ref
  ) => {
    return (
      <RadioGroupProvider intent={intent} size={size} disabled={disabled}>
        <RadioGroupPrimitive
          data-spark-component="radio-group"
          className={radioGroupStyles({ orientation, className })}
          ref={ref}
          disabled={disabled}
          orientation={orientation}
          {...others}
        />
      </RadioGroupProvider>
    )
  }
)
