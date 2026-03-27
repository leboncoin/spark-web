import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useCombinedState } from '@spark-ui/hooks/use-combined-state'
import { Check } from '@spark-ui/icons/Check'
import { Close } from '@spark-ui/icons/Close'
import { type ComponentPropsWithRef, type ReactNode } from 'react'

import { useRenderSlot } from '../drawer/useRenderSlot'
import { Slot } from '../slot'
import {
  styles,
  type StylesProps,
  thumbCheckSVGStyles,
  thumbStyles,
  thumbWrapperStyles,
} from './SwitchInput.styles'

export interface SwitchInputProps
  extends
    StylesProps,
    Omit<ComponentPropsWithRef<typeof BaseSwitch.Root>, 'value' | 'render' | 'onCheckedChange'> {
  /**
   * The state of the switch when it is initially rendered. Use when you do not need to control its state.
   */
  defaultChecked?: boolean
  /**
   * The controlled state of the switch. Must be used in conjunction with `onCheckedChange`.
   */
  checked?: boolean
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
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
}

export const SwitchInput = ({
  checked,
  checkedIcon = <Check />,
  defaultChecked,
  intent: intentProp,
  uncheckedIcon = <Close />,
  size = 'md',
  onCheckedChange,
  className,
  required,
  ref,
  asChild = false,
  ...rest
}: SwitchInputProps) => {
  const [isChecked, setIsChecked] = useCombinedState(checked, defaultChecked)
  const { name, description, state, isRequired, isInvalid } = useFormFieldControl()
  const intent = state ?? intentProp
  const renderSlot = useRenderSlot(asChild, 'span')
  const isRequiredComputed = Boolean(required || isRequired)

  const handleCheckedChange = (updatedValue: boolean): void => {
    setIsChecked(updatedValue)
    onCheckedChange?.(updatedValue)
  }

  return (
    <BaseSwitch.Root
      data-spark-component="switch-input"
      ref={ref}
      render={renderSlot}
      className={styles({ intent, size, className })}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={nextChecked => handleCheckedChange(nextChecked)}
      name={name}
      required={isRequiredComputed}
      aria-required={isRequiredComputed ? true : undefined}
      aria-invalid={isInvalid}
      aria-describedby={description}
      {...rest}
    >
      <span className={thumbWrapperStyles({ checked: isChecked })}>
        <BaseSwitch.Thumb className={thumbStyles({ size, checked: isChecked })}>
          {isChecked && checkedIcon && (
            <Slot className={thumbCheckSVGStyles({ size })}>{checkedIcon}</Slot>
          )}
          {!isChecked && uncheckedIcon && (
            <Slot className={thumbCheckSVGStyles({ size })}>{uncheckedIcon}</Slot>
          )}
        </BaseSwitch.Thumb>
      </span>
    </BaseSwitch.Root>
  )
}

SwitchInput.displayName = 'SwitchInput'
