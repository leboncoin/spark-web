import { Menu as BaseMenu } from '@base-ui/react/menu'
import { type ComponentProps, type Ref } from 'react'

import { menuItemStyles } from './MenuItemStyles'
import { useRenderSlot } from './useRenderSlot'

export interface MenuItemProps extends Omit<ComponentProps<typeof BaseMenu.Item>, 'render'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * A menu item that triggers an action when activated.
 * Renders a clickable menu option with keyboard support.
 */
export const MenuItem = ({ asChild = false, children, className, ref, ...rest }: MenuItemProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseMenu.Item
      ref={ref}
      data-spark-component="menu-item"
      render={renderSlot}
      className={menuItemStyles({
        className,
      })}
      {...rest}
    >
      {children}
    </BaseMenu.Item>
  )
}

MenuItem.displayName = 'Menu.Item'
