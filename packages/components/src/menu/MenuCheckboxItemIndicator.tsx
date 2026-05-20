import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Check } from '@spark-ui/icons/Check'
import { cx } from 'class-variance-authority'
import { type ComponentProps, type Ref } from 'react'

import { Icon } from '../icon'
import { useRenderSlot } from './useRenderSlot'

export interface MenuCheckboxItemIndicatorProps extends Omit<
  ComponentProps<typeof BaseMenu.CheckboxItemIndicator>,
  'render'
> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  /**
   * If true, renders a custom keepMounted container instead of default check icon.
   * When false (default), renders a check icon that appears when checked.
   * @default false
   */
  keepMounted?: boolean
  ref?: Ref<HTMLSpanElement>
}

/**
 * Displays a checkmark icon when the checkbox item is checked.
 * Automatically shows/hides based on the checked state.
 */
export const MenuCheckboxItemIndicator = ({
  asChild = false,
  keepMounted = false,
  className,
  ref,
  children,
  ...rest
}: MenuCheckboxItemIndicatorProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseMenu.CheckboxItemIndicator
      ref={ref}
      data-spark-component="menu-checkbox-item-indicator"
      render={renderSlot}
      keepMounted={keepMounted}
      className={cx('flex shrink-0 items-center justify-center', className)}
      {...rest}
    >
      {children || (
        <Icon size="sm" intent="current">
          <Check />
        </Icon>
      )}
    </BaseMenu.CheckboxItemIndicator>
  )
}

MenuCheckboxItemIndicator.displayName = 'Menu.CheckboxItemIndicator'
