import { cx } from 'class-variance-authority'
import { type ReactNode, Ref } from 'react'

import { useComboboxContext } from './ComboboxContext'

interface EmptyProps {
  className?: string
  children: ReactNode
  ref?: Ref<HTMLLIElement>
}

export const Empty = ({ className, children, ref: forwardedRef }: EmptyProps) => {
  const ctx = useComboboxContext()
  const hasNoItemVisible = ctx.filteredItemsMap.size === 0

  return hasNoItemVisible ? (
    <li
      ref={forwardedRef}
      role="option"
      aria-selected={false}
      className={cx('px-lg py-md text-body-1 text-on-surface/dim-1', className)}
    >
      {children}
    </li>
  ) : null
}

Empty.displayName = 'Combobox.Empty'
