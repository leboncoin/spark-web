import { cva } from 'class-variance-authority'
import { ChangeEvent, ComponentPropsWithRef, PropsWithChildren } from 'react'

import { useSelectContext } from './SelectContext'

export const styles = cva(
  [
    'absolute left-0 top-0 size-full rounded-lg opacity-0',
    'min-h-sz-44',
    // outline styles
    'ring-1 outline-hidden ring-inset focus:ring-2',
  ],
  {
    variants: {
      state: {
        undefined: 'ring-outline focus:ring-outline-high',
        error: 'ring-error',
        alert: 'ring-alert',
        success: 'ring-success',
      },
      disabled: {
        true: 'cursor-not-allowed',
      },
      readOnly: {
        true: 'cursor-default',
      },
    },
    compoundVariants: [
      {
        disabled: false,
        state: undefined,
        class: 'hover:ring-outline-high',
      },
    ],
  }
)

export const Items = ({
  children,
  className,
  ref,
  ...rest
}: PropsWithChildren<ComponentPropsWithRef<'select'>>) => {
  const {
    state,
    disabled,
    readOnly,
    ariaLabel,
    fieldLabelId,
    isControlled,
    onValueChange,
    selectedItem,
    setValue,
    name,
    required,
    fieldId,
  } = useSelectContext()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (isControlled) {
      event.preventDefault()
      onValueChange?.(event.target.value)
    } else {
      setValue(event.target.value)
    }
  }

  return (
    <select
      data-spark-component="select-items"
      ref={ref}
      disabled={disabled || readOnly}
      name={name}
      required={required}
      aria-labelledby={fieldLabelId}
      {...(ariaLabel && { 'aria-label': ariaLabel })}
      className={styles({ className, state, disabled, readOnly })}
      value={selectedItem?.value}
      onChange={handleChange}
      id={fieldId}
      {...rest}
    >
      {children}
    </select>
  )
}

Items.displayName = 'Select.Items'
