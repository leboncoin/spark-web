import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

export type ChipContentProps = ComponentPropsWithoutRef<'span'> & {
  ref?: Ref<HTMLSpanElement>
}

export const ChipContent = ({ children, className, ref: forwardedRef }: ChipContentProps) => {
  return (
    <span className={cx('inline-block grow truncate', className)} ref={forwardedRef}>
      {children}
    </span>
  )
}

ChipContent.displayName = 'Chip.Content'
