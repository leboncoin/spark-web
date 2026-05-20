import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cx } from 'class-variance-authority'
import { type ComponentProps } from 'react'

export interface MenuRadioGroupProps extends ComponentProps<typeof BaseMenu.RadioGroup> {}

/**
 * A container for radio menu items where only one item can be selected at a time.
 * Manages the selection state for its radio items.
 */
export const MenuRadioGroup = ({ children, className, ...rest }: MenuRadioGroupProps) => {
  return (
    <BaseMenu.RadioGroup
      data-spark-component="menu-radio-group"
      className={cx('py-sm', className)}
      {...rest}
    >
      {children}
    </BaseMenu.RadioGroup>
  )
}

MenuRadioGroup.displayName = 'Menu.RadioGroup'
