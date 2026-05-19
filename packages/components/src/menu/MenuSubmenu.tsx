import { Menu as BaseMenu } from '@base-ui/react/menu'
import { type ComponentProps, type ReactNode } from 'react'

import { MenuSubmenuContext } from './MenuSubmenuContext'

export interface MenuSubmenuProps extends Omit<
  ComponentProps<typeof BaseMenu.SubmenuRoot>,
  'children'
> {
  /**
   * The content of the submenu (trigger, positioner, popup, etc.)
   */
  children: ReactNode
}

/**
 * A nested submenu that appears when its trigger is activated.
 * Inherits styling context from the parent menu.
 */
export const MenuSubmenu = ({ children, ...rest }: MenuSubmenuProps) => {
  return (
    <BaseMenu.SubmenuRoot data-spark-component="menu-submenu" {...rest}>
      <MenuSubmenuContext.Provider value={true}>{children}</MenuSubmenuContext.Provider>
    </BaseMenu.SubmenuRoot>
  )
}

MenuSubmenu.displayName = 'Menu.Submenu'
