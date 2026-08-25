import { Menu as BaseMenu } from '@base-ui/react/menu'
import { ArrowVerticalRight } from '@spark-ui/icons/ArrowVerticalRight'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { type ComponentProps, type Ref } from 'react'

import { Icon } from '../icon'
import { menuItemStyles } from './MenuItemStyles'

export interface MenuSubmenuTriggerProps extends Omit<
  ComponentProps<typeof BaseMenu.SubmenuTrigger>,
  'render'
> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * A menu item that opens a submenu when activated.
 * Displays an arrow indicator to show submenu availability.
 */
export const MenuSubmenuTrigger = ({
  asChild = false,
  children,
  className,
  ref,
  ...rest
}: MenuSubmenuTriggerProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseMenu.SubmenuTrigger
      ref={ref}
      data-spark-component="menu-submenu-trigger"
      render={renderProp}
      className={menuItemStyles({
        className,
      })}
      {...rest}
    >
      <span className="flex-1">{innerChildren}</span>
      <Icon size="sm" intent="current" className="ml-auto shrink-0">
        <ArrowVerticalRight />
      </Icon>
    </BaseMenu.SubmenuTrigger>
  )
}

MenuSubmenuTrigger.displayName = 'Menu.SubmenuTrigger'
