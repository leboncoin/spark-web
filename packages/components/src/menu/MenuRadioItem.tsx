import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Check } from '@spark-ui/icons/Check'
import { cx } from 'class-variance-authority'
import { type ComponentProps, type Ref } from 'react'

import { Icon } from '../icon'
import { menuItemStyles } from './MenuItemStyles'
import { useRenderSlot } from './useRenderSlot'

export interface MenuRadioItemProps extends Omit<
  ComponentProps<typeof BaseMenu.RadioItem>,
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
 * A menu item with radio button functionality.
 * Only one radio item can be selected within its RadioGroup.
 * The radio indicator is automatically rendered on the left side.
 */
export const MenuRadioItem = ({
  asChild = false,
  children,
  className,
  ref,
  ...rest
}: MenuRadioItemProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseMenu.RadioItem
      ref={ref}
      data-spark-component="menu-radio-item"
      render={renderSlot}
      className={cx(
        menuItemStyles({
          className,
        }),
        'data-checked:font-bold'
      )}
      {...rest}
    >
      <BaseMenu.RadioItemIndicator
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
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  )
}

MenuRadioItem.displayName = 'Menu.RadioItem'
