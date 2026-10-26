import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref } from 'react'

import { TextLink } from '../text-link'

export interface LinkProps extends ComponentPropsWithoutRef<typeof TextLink> {
  asChild?: boolean
  className?: string
  href?: string
  ref?: Ref<HTMLAnchorElement>
}

/**
 * A navigable breadcrumb link. Renders an <a> element.
 */
export const Link = ({
  asChild = false,
  className,
  bold = true,
  intent = 'current',
  underline = true,
  href,
  ref,
  ...rest
}: LinkProps) => {
  return (
    <TextLink
      asChild={asChild}
      data-spark-component="breadcrumb-link"
      href={href}
      ref={ref}
      className={cx('inline! overflow-hidden text-ellipsis whitespace-nowrap', className)}
      bold={bold}
      intent={intent}
      underline={underline}
      {...rest}
    />
  )
}

Link.displayName = 'Breadcrumb.Link'
