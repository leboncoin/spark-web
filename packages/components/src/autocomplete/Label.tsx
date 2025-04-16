import { cx } from 'class-variance-authority'
import { Ref } from 'react'

import { useGroupContext } from './ItemsGroupContext'

interface LabelProps {
  children: string
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const Label = ({ children, className, ref: forwardedRef }: LabelProps) => {
  const groupCtx = useGroupContext()

  return (
    <div
      ref={forwardedRef}
      id={groupCtx.groupLabelId}
      className={cx('px-md py-sm text-body-2 text-neutral italic', className)}
    >
      {children}
    </div>
  )
}

Label.displayName = 'AutoComplete.Label'
