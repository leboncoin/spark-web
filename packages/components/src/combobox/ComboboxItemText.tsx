import { cx } from 'class-variance-authority'
import { Ref, useEffect, useId } from 'react'

import { ID_PREFIX } from './ComboboxContext'
import { useComboboxItemContext } from './ComboboxItemContext'

export interface ItemTextProps {
  children: string
  className?: string
  ref?: Ref<HTMLSpanElement>
}

/**
 * The text content of a combobox item. Renders a <span> element.
 */
export const ItemText = ({ children, className, ref: forwardedRef }: ItemTextProps) => {
  const id = `${ID_PREFIX}-item-text-${useId()}`

  const { setTextId } = useComboboxItemContext()

  useEffect(() => {
    setTextId(id)

    return () => setTextId(undefined)
  })

  return (
    <span id={id} className={cx('inline', className)} ref={forwardedRef}>
      {children}
    </span>
  )
}

ItemText.displayName = 'Combobox.ItemText'
