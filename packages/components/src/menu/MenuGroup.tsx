import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cx } from 'class-variance-authority'
import { type ComponentProps } from 'react'

export interface MenuGroupProps extends ComponentProps<typeof BaseMenu.Group> {}

/**
 * A container for grouping related menu items together.
 * Works with Menu.GroupLabel for semantic grouping.
 */
export const MenuGroup = ({ children, className, ...rest }: MenuGroupProps) => {
  return (
    <BaseMenu.Group data-spark-component="menu-group" className={cx('py-sm', className)} {...rest}>
      {children}
    </BaseMenu.Group>
  )
}

MenuGroup.displayName = 'Menu.Group'
