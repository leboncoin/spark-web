import { cx } from 'class-variance-authority'
import { ReactNode, type Ref } from 'react'

import { useSelectContext } from './SelectContext'

export interface ValueProps {
  children?: ReactNode
  className?: string
  /**
   * Optional placeholder value for the trigger.
   * If not specified, the value inside `Select.Placeholder` item will be used.
   */
  placeholder?: string
  ref?: Ref<HTMLSpanElement>
}

export const Value = ({
  children,
  className,
  placeholder: customPlaceholder,
  ref: forwardedRef,
}: ValueProps) => {
  const { selectedItem, placeholder, disabled } = useSelectContext()

  const isPlaceholderSelected = selectedItem?.value == null
  const valuePlaceholder = customPlaceholder || placeholder

  return (
    <span
      role="presentation"
      data-spark-component="select-value"
      ref={forwardedRef}
      className={cx('flex shrink items-center text-left', className)}
    >
      <span
        className={cx(
          'line-clamp-1 flex-1 overflow-hidden break-all text-ellipsis',
          isPlaceholderSelected && !disabled && 'text-on-surface/dim-1'
        )}
      >
        {isPlaceholderSelected ? valuePlaceholder : children || selectedItem?.text}
      </span>
    </span>
  )
}

Value.displayName = 'Select.Value'
