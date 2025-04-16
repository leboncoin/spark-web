import { cx } from 'class-variance-authority'
import { type ReactNode, Ref } from 'react'
import { useSnapshot } from 'valtio'

import { useAutoComplete } from './Root'

export const AutoCompleteEmpty = () => {
  const { state } = useAutoComplete()
  const snap = useSnapshot(state)

  if (!snap.hasNoSuggestions) return null

  return <div>No results found</div>
}

interface EmptyProps {
  className?: string
  children: ReactNode
  ref?: Ref<HTMLLIElement>
}

export const Empty = ({ className, children, ref: forwardedRef }: EmptyProps) => {
  const { state } = useAutoComplete()
  const snap = useSnapshot(state)

  return snap.hasNoSuggestions ? (
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

Empty.displayName = 'AutoComplete.Empty'
