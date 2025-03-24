/* eslint-disable complexity */
import { useMergeRefs } from '@spark-ui/use-merge-refs'
import { cx } from 'class-variance-authority'
import { Ref, useId, useMemo, useRef } from 'react'

import { useFormFieldControl } from '../form-field'
import { CheckboxGroupContextState, useCheckboxGroup } from './CheckboxGroupContext'
import { CheckboxInput, CheckboxInputProps } from './CheckboxInput'
import { CheckboxLabel } from './CheckboxLabel'

export type CheckboxProps = CheckboxInputProps &
  Pick<CheckboxGroupContextState, 'reverse'> & {
    ref?: Ref<HTMLButtonElement>
  }

const ID_PREFIX = ':checkbox'

export const Checkbox = ({
  id: idProp,
  className,
  intent: intentProp,
  checked: checkedProp,
  value,
  disabled,
  reverse = false,
  onCheckedChange,
  children,
  ref: forwardedRef,
  ...others
}: CheckboxProps) => {
  const checkboxId = `${ID_PREFIX}-${useId()}`
  const innerId = idProp || checkboxId

  const innerLabelId = `${ID_PREFIX}-${useId()}`

  const field = useFormFieldControl()
  const group = useCheckboxGroup()

  const rootRef = useRef<HTMLButtonElement | undefined>(null)
  const ref = useMergeRefs(forwardedRef, rootRef)

  const getCheckboxAttributes = ({
    fieldState,
    groupState,
    checkboxIntent,
  }: {
    fieldState: ReturnType<typeof useFormFieldControl>
    groupState: ReturnType<typeof useCheckboxGroup>
    checkboxIntent: CheckboxInputProps['intent']
  }) => {
    const name = fieldState.name ?? groupState.name
    const isRequired = fieldState.isRequired ?? groupState.isRequired
    const state = fieldState.state ?? groupState.state
    const isInvalid = fieldState.isInvalid ?? groupState.isInvalid

    const isFieldEnclosed = fieldState.id !== groupState.id
    const id = isFieldEnclosed ? fieldState.id : undefined
    const description = isFieldEnclosed ? fieldState.description : undefined

    const intent = state ?? checkboxIntent ?? groupState.intent

    return { name, isRequired, isInvalid, id, description, intent }
  }

  const checked = value ? group.value?.includes(value) : checkedProp

  const handleCheckedChange = (isChecked: boolean) => {
    onCheckedChange?.(isChecked)

    const rootRefValue = rootRef.current?.value
    if (rootRefValue && group.onCheckedChange) {
      group.onCheckedChange(isChecked, rootRefValue)
    }
  }

  const {
    id,
    name,
    isInvalid,
    description,
    intent,
    isRequired: isRequiredAttr,
  } = getCheckboxAttributes({
    fieldState: field,
    groupState: group,
    checkboxIntent: intentProp,
  })

  const isRequired = useMemo(() => {
    if (!group) return isRequiredAttr

    return isRequiredAttr ? !group.value?.length : false
  }, [group, isRequiredAttr])

  const checkboxLabel = children && (
    <CheckboxLabel disabled={disabled} htmlFor={id || innerId} id={innerLabelId}>
      {children}
    </CheckboxLabel>
  )

  const checkboxInput = (
    <CheckboxInput
      ref={ref}
      id={id || innerId}
      name={name}
      value={value}
      intent={intent}
      checked={checked}
      disabled={disabled}
      required={isRequired}
      aria-describedby={description}
      aria-invalid={isInvalid}
      onCheckedChange={handleCheckedChange}
      aria-labelledby={children ? innerLabelId : field.labelId}
      {...others}
    />
  )

  const content =
    group.reverse || reverse ? (
      <>
        {checkboxLabel}
        {checkboxInput}
      </>
    ) : (
      <>
        {checkboxInput}
        {checkboxLabel}
      </>
    )

  return (
    <div
      data-spark-component="checkbox"
      className={cx('gap-md text-body-1 relative flex items-start', className)}
    >
      {content}
    </div>
  )
}

Checkbox.displayName = 'Checkbox'
