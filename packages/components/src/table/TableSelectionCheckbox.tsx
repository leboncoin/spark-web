import { forwardRef } from 'react'
import { CheckboxContext, useContextProps } from 'react-aria-components'

import { Checkbox } from '../checkbox'

/**
 * Adapter that receives table selection state from React Aria's CheckboxContext
 * and renders Spark Checkbox. Used for row selection and "select all" in table header.
 */
export const TableSelectionCheckbox = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Checkbox>
>(function TableSelectionCheckbox(props, ref) {
  // Aria's CheckboxContext is typed for HTMLLabelElement; we render Spark Checkbox (button).
  // We only consume context props (isSelected, isIndeterminate, onChange), ref comes from our forwardRef.
  const [mergedProps, mergedRef] = useContextProps(
    { ...props, slot: 'selection' as const },
    ref,
    CheckboxContext as any
  )

  const { isSelected, isIndeterminate, onChange, ...rest } = mergedProps as typeof props & {
    isSelected?: boolean
    isIndeterminate?: boolean
    onChange?: (checked: boolean) => void
  }

  const checked = isIndeterminate === true ? 'indeterminate' : Boolean(isSelected)

  return (
    <span
      onClick={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}
      className="flex h-full min-h-full items-center justify-center"
    >
      <Checkbox
        ref={mergedRef as React.Ref<HTMLButtonElement>}
        checked={checked}
        onCheckedChange={onChange}
        {...rest}
      />
    </span>
  )
})

TableSelectionCheckbox.displayName = 'Table.SelectionCheckbox'
