import { cx } from 'class-variance-authority'
import { Ref, useId } from 'react'

import { useAutoComplete } from './Root'
export interface ItemTextProps {
  children: string
  className?: string
  ref?: Ref<HTMLSpanElement>
}

export const ItemText = ({ children, className, ref: forwardedRef }: ItemTextProps) => {
  const { state } = useAutoComplete()
  const id = `${state.id}-item-text-${useId()}`

  return (
    <span id={id} className={cx('inline', className)} ref={forwardedRef}>
      {children}
    </span>
  )
}

ItemText.displayName = 'AutoComplete.ItemText'
