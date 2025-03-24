/* eslint-disable complexity */

import { useCombinedState } from '@spark-ui/use-combined-state'
import { useMergeRefs } from '@spark-ui/use-merge-refs'
import {
  ChangeEventHandler,
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  DetailedReactHTMLElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { useFormFieldControl } from '../form-field'
import { InputProps } from './Input'
import { inputGroupStyles, InputGroupStylesProps } from './InputGroup.styles'
import { InputGroupContext } from './InputGroupContext'

export interface InputGroupProps extends ComponentPropsWithoutRef<'div'>, InputGroupStylesProps {
  /**
   * Use `state` prop to assign a specific state to the group, choosing from: `error`, `alert` and `success`. By doing so, the outline styles will be updated.
   */
  state?: 'error' | 'alert' | 'success'
  /**
   * Function handler to be executed after the input has been cleared.
   */
  onClear?: () => void
  ref?: Ref<HTMLDivElement>
}

export const InputGroup = ({
  className,
  children: childrenProp,
  state: stateProp,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  onClear,
  ref: forwardedRef,
  ...others
}: PropsWithChildren<InputGroupProps>) => {
  const getElementId = (element?: ReactElement) => {
    return element ? (element.type as FC & { id?: string }).id : ''
  }

  const findElement = (...values: string[]) => {
    return children.find(child => values.includes(getElementId(child) || ''))
  }

  const children = Children.toArray(childrenProp).filter(isValidElement)
  const input = findElement('Input') as
    | DetailedReactHTMLElement<InputProps, HTMLInputElement>
    | undefined
  const props = input?.props || {}

  const inputRef = useRef<HTMLInputElement>(null!)
  const onClearRef = useRef(onClear)
  const ref = useMergeRefs<HTMLInputElement>(input?.ref, inputRef)
  const [value, onChange] = useCombinedState(
    props.value as string,
    props.defaultValue as string,
    props.onValueChange
  )

  // Data derivated from FormField context
  const field = useFormFieldControl()
  const state = field.state ?? stateProp
  const disabled = field.disabled || !!disabledProp
  const readOnly = field.readOnly || !!readOnlyProp

  // InputGroup elements (in visual order)
  const leadingAddon = findElement('LeadingAddon')
  const leadingIcon = findElement('LeadingIcon')
  const clearButton = findElement('ClearButton')
  const trailingIcon = findElement('TrailingIcon')
  const trailingAddon = findElement('TrailingAddon')

  // Acknowledge which subComponents are used in the compound context
  const hasLeadingAddon = !!leadingAddon
  const hasTrailingAddon = !!trailingAddon
  const hasLeadingIcon = !!leadingIcon
  const hasTrailingIcon = !!trailingIcon
  const hasClearButton = !!value && !!clearButton && !disabled && !readOnly

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (props.onChange) {
      props.onChange(event)
    }

    onChange(event.target.value)
  }

  const handleClear = useCallback(() => {
    if (onClearRef.current) {
      onClearRef.current()
    }

    onChange('')

    inputRef.current.focus()
  }, [onChange])

  const current = useMemo(() => {
    return {
      state,
      disabled,
      readOnly,
      hasLeadingIcon,
      hasTrailingIcon,
      hasLeadingAddon,
      hasTrailingAddon,
      hasClearButton,
      onClear: handleClear,
    }
  }, [
    state,
    disabled,
    readOnly,
    hasLeadingIcon,
    hasTrailingIcon,
    hasLeadingAddon,
    hasTrailingAddon,
    hasClearButton,
    handleClear,
  ])

  useEffect(() => {
    onClearRef.current = onClear
  }, [onClear])

  return (
    <InputGroupContext.Provider value={current}>
      <div
        ref={forwardedRef}
        className={inputGroupStyles({ disabled, readOnly, className })}
        {...others}
      >
        {hasLeadingAddon && leadingAddon}

        <div className="relative inline-flex w-full">
          {input &&
            cloneElement(input, {
              ref,
              defaultValue: undefined,
              value: value ?? '',
              onChange: handleChange,
            })}

          {leadingIcon}

          {hasClearButton && clearButton}

          {trailingIcon}
        </div>

        {hasTrailingAddon && trailingAddon}
      </div>
    </InputGroupContext.Provider>
  )
}

InputGroup.displayName = 'InputGroup'
