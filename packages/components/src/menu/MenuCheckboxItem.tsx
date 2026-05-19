import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Check } from '@spark-ui/icons/Check'
import { cx } from 'class-variance-authority'
import { type ComponentProps, type Ref } from 'react'

import { Icon } from '../icon'
import { menuItemStyles } from './MenuItemStyles'
import { useRenderSlot } from './useRenderSlot'

export interface MenuCheckboxItemProps extends Omit<
  ComponentProps<typeof BaseMenu.CheckboxItem>,
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
 * A menu item with checkbox functionality.
 * Can be toggled on and off, allowing multiple selections.
 * The checkbox indicator is automatically rendered on the left side.
 */
export const MenuCheckboxItem = ({
  asChild = false,
  children,
  className,
  ref,
  ...rest
}: MenuCheckboxItemProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseMenu.CheckboxItem
      ref={ref}
      data-spark-component="menu-checkbox-item"
      render={renderSlot}
      className={cx(
        menuItemStyles({
          className,
        }),
        'data-checked:font-bold'
      )}
      {...rest}
    >
      <BaseMenu.CheckboxItemIndicator
        keepMounted
        className={cx(
          'mr-md flex shrink-0 items-center justify-center',
          'w-sz-16 h-sz-16',
          'transition-opacity',
          'data-checked:opacity-100',
          'opacity-0'
        )}
      >
        <Icon size="sm" intent="current">
          <Check />
        </Icon>
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

MenuCheckboxItem.displayName = 'Menu.CheckboxItem'
