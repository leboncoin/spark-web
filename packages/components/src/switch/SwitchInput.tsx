import { Check } from '@spark-ui/icons/Check'
import { Close } from '@spark-ui/icons/Close'
import { useCombinedState } from '@spark-ui/use-combined-state'
import { Switch as RadixSwitch } from 'radix-ui'
import { type ComponentPropsWithRef, type ReactNode } from 'react'

import { useFormFieldControl } from '../form-field'
import { Slot } from '../slot'
import {
  styles,
  type StylesProps,
  thumbCheckSVGStyles,
  thumbStyles,
  thumbWrapperStyles,
} from './SwitchInput.styles'

export interface SwitchInputProps
  extends StylesProps,
    Omit<ComponentPropsWithRef<'button'>, 'value'> {
  /**
   * The state of the switch when it is initially rendered. Use when you do not need to control its state.
   */
  defaultChecked?: boolean
  /**
   * The controlled state of the switch. Must be used in conjunction with `onCheckedChange`.
   */
  checked?: boolean
  /**
   * When true, prevents the user from interacting with the switch.
   */
  /**
   * Event handler called when the state of the switch changes.
   */
  onCheckedChange?: (checked: boolean) => void
  /**
   * When `true`, prevents the user from interacting with the switch.
   */
  disabled?: boolean
  /**
   * When true, indicates that the user must check the switch before the owning form can be submitted.
   */
  required?: boolean
  /**
   * The name of the switch. Submitted with its owning form as part of a name/value pair.
   */
  name?: string
  /**
   * The value given as data when submitted with a name.
   */
  value?: string
  /**
   * Icon shown inside the thumb of the Switch whenever it is checked
   */
  checkedIcon?: ReactNode
  /**
   * Icon shown inside the thumb of the Switch whenever it is unchecked
   */
  uncheckedIcon?: ReactNode
  /**
   * When true, the label will be placed on the left side of the Switch
   */
  reverse?: boolean
}

export const SwitchInput = ({
  checked,
  checkedIcon = <Check />,
  defaultChecked,
  intent: intentProp,
  uncheckedIcon = <Close />,
  size = 'md',
  value = 'on',
  onCheckedChange,
  className,
  required,
  ref,
  ...rest
}: SwitchInputProps) => {
  const [isChecked, setIsChecked] = useCombinedState(checked, defaultChecked)
  const { name, description, state, isRequired, isInvalid } = useFormFieldControl()
  const intent = state ?? intentProp

  const handleCheckedChange = (updatedValue: boolean): void => {
    setIsChecked(updatedValue)
    onCheckedChange?.(updatedValue)
  }

  return (
    <RadixSwitch.Root
      ref={ref}
      className={styles({ intent, size, className })}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      name={name}
      required={required || isRequired}
      aria-invalid={isInvalid}
      aria-describedby={description}
      {...rest}
    >
      <span className={thumbWrapperStyles({ checked: isChecked })}>
        <RadixSwitch.Thumb className={thumbStyles({ size, checked: isChecked })}>
          {isChecked && checkedIcon && (
            <Slot className={thumbCheckSVGStyles({ size })}>{checkedIcon}</Slot>
          )}
          {!isChecked && uncheckedIcon && (
            <Slot className={thumbCheckSVGStyles({ size })}>{uncheckedIcon}</Slot>
          )}
        </RadixSwitch.Thumb>
      </span>
    </RadixSwitch.Root>
  )
}

SwitchInput.displayName = 'SwitchInput'
