import { Children, type ComponentProps, Ref } from 'react'

import { itemStyles } from './SegmentedControl.styles'
import { useSegmentedControlContext } from './SegmentedControlContext'

export interface SegmentedControlItemProps extends Omit<
  ComponentProps<'button'>,
  'value' | 'onClick'
> {
  /**
   * A unique value that identifies this item within the segmented control.
   */
  value: string
  /**
   * When true, prevents the user from interacting with this item.
   * @default false
   */
  disabled?: boolean
  ref?: Ref<HTMLButtonElement>
}

/** A selectable item in the segmented control. Renders a <button> element. */
export const SegmentedControlItem = ({
  value,
  disabled = false,
  children,
  className,
  ref,
  ...rest
}: SegmentedControlItemProps) => {
  const { checkedValue, onValueChange, name, rowLength, itemValues } = useSegmentedControlContext()

  const isChecked = checkedValue === value

  const handleClick = () => {
    if (!disabled) {
      onValueChange(value)
    }
  }

  const content = Children.toArray(children).map((child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <span key={`text-${index}`} data-spark-segmented-control-text>
          {child}
        </span>
      )
    }

    return child
  })

  // Calculate flex-basis for multi-row layout and horizontal separator visibility
  const itemIndex = itemValues.indexOf(value)
  const itemStyle = rowLength
    ? { flexBasis: `calc(100% / var(--segmented-control-cols))` }
    : undefined

  let showHorizontalSeparator = false

  if (rowLength && rowLength > 0 && itemIndex !== -1) {
    const cols = rowLength
    const currentCol = itemIndex % cols
    const currentRow = Math.floor(itemIndex / cols)
    const totalRows = Math.ceil(itemValues.length / cols)

    // Show horizontal separator only on the first column of each row (except last row)
    showHorizontalSeparator = currentRow < totalRows - 1 && currentCol === 0
  }

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      data-spark-component="segmented-control-item"
      data-value={value}
      aria-checked={isChecked}
      data-checked={isChecked || undefined}
      data-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={isChecked ? 0 : -1}
      className={itemStyles({ className })}
      style={itemStyle}
      onClick={handleClick}
      {...rest}
    >
      {content}
      {/* Hidden input for form submission */}
      {name && isChecked && <input type="hidden" name={name} value={value} />}
      {/* Horizontal separator between rows (full width across all columns) */}
      {showHorizontalSeparator && rowLength && (
        <div
          className="bg-outline/dim-3 -mx-sm absolute left-0 h-px"
          style={{
            bottom: 'calc(var(--spacing-md) / -2)',
            width: `calc(${rowLength * 100}% + var(--spacing-sm) * 2)`,
          }}
          aria-hidden="true"
        />
      )}
    </button>
  )
}

SegmentedControlItem.displayName = 'SegmentedControl.Item'
