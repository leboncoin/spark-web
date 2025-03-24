import { cx } from 'class-variance-authority'
import { ComponentPropsWithRef } from 'react'

import { Slot } from '../slot'

export interface LinkBoxLinkProps extends ComponentPropsWithRef<'a'> {
  asChild?: boolean
}

export const LinkBoxLink = ({ className, asChild, ref, ...props }: LinkBoxLinkProps) => {
  const Component = asChild ? Slot : 'a'

  return (
    <Component
      ref={ref}
      data-spark-component="link-box-link"
      className={cx(
        "before:z-base static before:absolute before:top-0 before:left-0 before:block before:size-full before:content-['']",
        className
      )}
      {...props}
    />
  )
}

LinkBoxLink.displayName = 'LinkBox.Link'
