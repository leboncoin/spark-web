import { Check } from '@spark-ui/icons/Check'
import { Minus } from '@spark-ui/icons/Minus'
import { Checkbox } from 'radix-ui'
import { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'

import { Icon } from '../icon'
import { CheckboxIndicator } from './CheckboxIndicator'
import { checkboxInputStyles, type CheckboxInputStylesProps } from './CheckboxInput.styles'

type CheckedStatus = boolean | 'indeterminate'

const CheckboxPrimitive = Checkbox.Checkbox

export interface CheckboxInputProps
  extends CheckboxInputStylesProps,
    Omit<ComponentPropsWithoutRef<'button'>, 'onChange' | 'value' | 'checked' | 'defaultChecked'> {
  /**
   * The checked icon to use.
   */
  icon?: ReactNode
  /**
   * The indeterminate icon to use.
   */
  indeterminateIcon?: ReactNode
  /**
   * The checked state of the checkbox when it is initially rendered. Use when you do not need to control its checked state.
   */
  defaultChecked?: boolean
  /**
   * The controlled checked state of the checkbox. Must be used in conjunction with onCheckedChange.
   */
  checked?: CheckedStatus
  /**
   * When true, prevents the user from interacting with the checkbox.
   */
  disabled?: boolean
  /**
   * When true, indicates that the user must check the checkbox before the owning form can be submitted.
   */
  required?: boolean
  /**
   * The name of the checkbox. Submitted with its owning form as part of a name/value pair.
   */
  name?: string
  /**
   * The value given as data when submitted with a name.
   */
  value?: string
  /**
   * Event handler called when the checked state of the checkbox changes.
   */
  onCheckedChange?: (checked: boolean) => void
  ref?: Ref<HTMLButtonElement>
}

export const CheckboxInput = ({
  className,
  icon = <Check />,
  indeterminateIcon = <Minus />,
  intent,
  checked,
  ref,
  ...others
}: CheckboxInputProps) => (
  <CheckboxPrimitive
    ref={ref}
    className={checkboxInputStyles({ intent, className })}
    checked={checked}
    {...others}
  >
    <CheckboxIndicator>
      <Icon size="sm">{checked === 'indeterminate' ? indeterminateIcon : icon}</Icon>
    </CheckboxIndicator>
  </CheckboxPrimitive>
)

CheckboxInput.displayName = 'CheckboxInput'
