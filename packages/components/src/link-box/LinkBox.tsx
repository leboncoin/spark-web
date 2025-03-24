import { cx } from 'class-variance-authority'
import { ComponentPropsWithRef } from 'react'

import { Slot } from '../slot'

export interface LinkBoxProps extends ComponentPropsWithRef<'div'> {
  asChild?: boolean
}

export const LinkBox = ({ className, asChild, ref, ...props }: LinkBoxProps) => {
  const Component = asChild ? Slot : 'div'

  return (
    <Component
      ref={ref}
      data-spark-component="link-box"
      className={cx('relative', className)}
      {...props}
    />
  )
}

LinkBox.displayName = 'LinkBox'
