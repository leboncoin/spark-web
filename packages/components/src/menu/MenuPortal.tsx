import { Menu as BaseMenu } from '@base-ui/react/menu'
import { type ComponentProps } from 'react'

export interface MenuPortalProps extends ComponentProps<typeof BaseMenu.Portal> {}

/**
 * Portal wrapper that renders the menu in a different part of the DOM tree.
 * Useful for avoiding z-index and overflow issues.
 */
export const MenuPortal = ({ children, ...rest }: MenuPortalProps) => {
  return <BaseMenu.Portal {...rest}>{children}</BaseMenu.Portal>
}

MenuPortal.displayName = 'Menu.Portal'
