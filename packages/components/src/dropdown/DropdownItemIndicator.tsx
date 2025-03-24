import { Check } from '@spark-ui/icons/Check'
import { cx } from 'class-variance-authority'
import { ReactNode, Ref } from 'react'

import { Icon } from '../icon'
import { useDropdownItemContext } from './DropdownItemContext'

export interface ItemIndicatorProps {
  children?: ReactNode
  className?: string
  label?: string
  ref?: Ref<HTMLSpanElement>
}

export const ItemIndicator = ({
  className,
  children,
  label,
  ref: forwardedRef,
}: ItemIndicatorProps) => {
  const { disabled, isSelected } = useDropdownItemContext()

  const childElement = children || (
    <Icon size="sm">
      <Check aria-label={label} />
    </Icon>
  )

  return (
    <span
      ref={forwardedRef}
      className={cx('min-h-sz-16 min-w-sz-16 flex', disabled && 'opacity-dim-3', className)}
    >
      {isSelected && childElement}
    </span>
  )
}

ItemIndicator.displayName = 'Dropdown.ItemIndicator'
