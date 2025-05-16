import { cx } from 'class-variance-authority'
import { Ref, useId } from 'react'

import { useAutoSuggest } from './AutoSuggest'
export interface ItemTextProps {
  children: string
  className?: string
  ref?: Ref<HTMLSpanElement>
}

export const ItemText = ({ children, className, ref: forwardedRef }: ItemTextProps) => {
  const ID_PREFIX = 'TODO'
  const id = `${ID_PREFIX}-item-text-${useId()}`

  const { actions } = useAutoSuggest()

  // TODO SYNC VALUE IN SNAP OPTIONS (FROM ACTION)

  actions.registerOptionText(children)

  return (
    <span id={id} className={cx('inline', className)} ref={forwardedRef}>
      {children}
    </span>
  )
}

ItemText.displayName = 'AutoSuggest.ItemText'
