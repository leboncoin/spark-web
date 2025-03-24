import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

export type ChipIconProps = ComponentPropsWithoutRef<'span'> & {
  ref?: Ref<HTMLSpanElement>
}

export const ChipIcon = ({ children, className, ref: forwardedRef }: ChipIconProps) => {
  return (
    <span className={cx('flex h-full items-center justify-center', className)} ref={forwardedRef}>
      {children}
    </span>
  )
}

ChipIcon.displayName = 'Chip.Icon'
