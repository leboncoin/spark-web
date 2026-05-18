import { Menu as BaseMenu } from '@base-ui/react/menu'
import { type ComponentProps, type ReactNode } from 'react'

export interface MenuProps extends Omit<ComponentProps<typeof BaseMenu.Root>, 'children'> {
  /**
   * The content of the menu (trigger, portal, etc.)
   */
  children: ReactNode
}

/**
 * Root container for menu state and styling context.
 */
export const Menu = ({ children, ...rest }: MenuProps) => {
  return (
    <BaseMenu.Root data-spark-component="menu" {...rest}>
      {children}
    </BaseMenu.Root>
  )
}

Menu.displayName = 'Menu'
