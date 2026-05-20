import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cx } from 'class-variance-authority'
import { type ComponentProps } from 'react'

export interface MenuSeparatorProps extends ComponentProps<typeof BaseMenu.Separator> {}

/**
 * A visual divider between menu items or groups.
 * Creates clear separation between different sections of the menu.
 */
export const MenuSeparator = ({ className, ...rest }: MenuSeparatorProps) => {
  return (
    <BaseMenu.Separator
      data-spark-component="menu-separator"
      className={cx('my-sm h-px bg-outline/dim-2', className)}
      {...rest}
    />
  )
}

MenuSeparator.displayName = 'Menu.Separator'
