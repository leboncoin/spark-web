import type { AriaCheckboxProps } from '@react-types/checkbox'

import { Checkbox } from '../../checkbox'

export interface TableSelectionCheckboxProps {
  checkboxProps: AriaCheckboxProps
  className?: string
  /**
   * When true, marks inner controls as ignored by React Aria's focusable tree walker so Arrow keys
   * move to adjacent cells instead of trapping focus inside the checkbox (grid navigation mode).
   */
  suppressFocusWalker?: boolean
}

/**
 * Adapter that renders Spark `Checkbox` from React Aria checkbox props.
 * Used for row selection and "select all" in the table header.
 */
export function TableSelectionCheckbox({
  checkboxProps,
  className,
  suppressFocusWalker,
}: TableSelectionCheckboxProps) {
  const { isSelected, isIndeterminate, isDisabled, onChange, ...domProps } = checkboxProps

  const checked = isIndeterminate === true ? 'indeterminate' : Boolean(isSelected)

  return (
    <span
      {...(suppressFocusWalker ? { 'data-react-aria-prevent-focus': true } : undefined)}
      onClick={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}
      className={className ?? 'flex h-full min-h-full items-center justify-center'}
    >
      <Checkbox
        checked={checked}
        disabled={isDisabled}
        onCheckedChange={onChange}
        {...(domProps as any)}
      />
    </span>
  )
}

TableSelectionCheckbox.displayName = 'Table.SelectionCheckbox'
