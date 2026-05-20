import { Link } from '@spark-ui/icons/Link'
import { type ComponentPropsWithoutRef } from 'react'

import { Icon } from '../icon'
import { MenuItem } from './MenuItem'

export interface MenuLinkItemProps extends Omit<
  ComponentPropsWithoutRef<typeof MenuItem>,
  'asChild'
> {
  /**
   * The URL to navigate to.
   */
  href: string
  /**
   * Where to display the linked URL.
   * @default undefined
   */
  target?: string
  /**
   * The relationship between the current document and the linked document.
   * @default undefined
   */
  rel?: string
}

/**
 * A menu item that acts as a link.
 * Navigates to a URL when activated, useful for navigation menus.
 * Use with Next.js Link or React Router Link via the children prop.
 */
export const MenuLinkItem = ({ children, href, target, rel, ...rest }: MenuLinkItemProps) => {
  return (
    <MenuItem asChild {...rest}>
      <a href={href} target={target} rel={rel}>
        <Icon size="sm" intent="current" className="ml-auto shrink-0">
          <Link />
        </Icon>
        <span className="flex-1">{children}</span>
      </a>
    </MenuItem>
  )
}

MenuLinkItem.displayName = 'Menu.LinkItem'
