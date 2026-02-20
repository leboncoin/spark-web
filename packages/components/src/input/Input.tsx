import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { ChangeEventHandler, ComponentPropsWithoutRef, KeyboardEventHandler, Ref } from 'react'

import { inputStyles } from './Input.styles'
import { useInputGroup } from './InputGroupContext'

type InputPrimitiveProps = ComponentPropsWithoutRef<'input'>

export interface InputProps extends useRender.ComponentProps<'input'>, InputPrimitiveProps {
  onValueChange?: (value: string) => void
  ref?: Ref<HTMLInputElement>
  /** When using render={<textarea />}, sets the rows attribute */
  rows?: number
}

const Root = ({
  className,
  render,
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

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'input',
    id,
    name,
    className: inputStyles({
      asChild: !!render,
      className,
      intent: state,
      hasLeadingAddon: !!hasLeadingAddon,
      hasTrailingAddon: !!hasTrailingAddon,
      hasLeadingIcon: !!hasLeadingIcon,
      hasTrailingIcon: !!hasTrailingIcon,
      hasClearButton: !!hasClearButton,
    }),
    disabled,
    readOnly,
    required: isRequired,
    'aria-describedby': description,
    'aria-invalid': isInvalid,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  }

  return useRender({
    defaultTagName: 'input',
    render,
    ref,
    props: mergeProps<'input'>(defaultProps, others),
  })
}

export const Input = Object.assign(Root, {
  id: 'Input',
})

Root.displayName = 'Input'
