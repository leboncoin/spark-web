import { ChangeEventHandler, ComponentPropsWithoutRef, KeyboardEventHandler, Ref } from 'react'

import { useFormFieldControl } from '../form-field'
import { Slot } from '../slot'
import { inputStyles } from './Input.styles'
import { useInputGroup } from './InputGroupContext'

type InputPrimitiveProps = ComponentPropsWithoutRef<'input'>

export interface InputProps extends InputPrimitiveProps {
  asChild?: boolean
  onValueChange?: (value: string) => void
  ref?: Ref<HTMLInputElement>
}

const Root = ({
  className,
  asChild = false,
  onValueChange,
  onChange,
  onKeyDown,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  ref,
  ...others
}: InputProps) => {
  const field = useFormFieldControl()
  const group = useInputGroup()

  const { id, name, isInvalid, isRequired, description } = field
  const {
    hasLeadingAddon,
    hasTrailingAddon,
    hasLeadingIcon,
    hasTrailingIcon,
    hasClearButton,
    onClear,
  } = group
  const Component = asChild ? Slot : 'input'
  const state = field.state || group.state
  const disabled = field.disabled || group.disabled || disabledProp
  const readOnly = field.readOnly || group.readOnly || readOnlyProp

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (onChange) {
      onChange(event)
    }

    if (onValueChange) {
      onValueChange(event.target.value)
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (onKeyDown) {
      onKeyDown(event)
    }

    if (hasClearButton && onClear && event.key === 'Escape') {
      onClear()
    }
  }

  return (
    <Component
      ref={ref}
      id={id}
      name={name}
      className={inputStyles({
        asChild,
        className,
        intent: state,
        hasLeadingAddon: !!hasLeadingAddon,
        hasTrailingAddon: !!hasTrailingAddon,
        hasLeadingIcon: !!hasLeadingIcon,
        hasTrailingIcon: !!hasTrailingIcon,
        hasClearButton: !!hasClearButton,
      })}
      disabled={disabled}
      readOnly={readOnly}
      required={isRequired}
      aria-describedby={description}
      aria-invalid={isInvalid}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...others}
    />
  )
}

export const Input = Object.assign(Root, {
  id: 'Input',
})

Root.displayName = 'Input'
