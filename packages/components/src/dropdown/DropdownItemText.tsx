import { cx } from 'class-variance-authority'
import { Ref, useEffect, useId } from 'react'

import { ID_PREFIX } from './DropdownContext'
import { useDropdownItemContext } from './DropdownItemContext'

export interface ItemTextProps {
  children: string
  ref?: Ref<HTMLSpanElement>
}

export const ItemText = ({ children, ref: forwardedRef }: ItemTextProps) => {
  const id = `${ID_PREFIX}-item-text-${useId()}`

  const { setTextId } = useDropdownItemContext()

  useEffect(() => {
    setTextId(id)

    return () => setTextId(undefined)
  })

  return (
    <span id={id} className={cx('inline')} ref={forwardedRef}>
      {children}
    </span>
  )
}

ItemText.displayName = 'Dropdown.ItemText'
