import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cx } from 'class-variance-authority'
import { type ComponentProps, type Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface MenuRadioItemIndicatorProps extends Omit<
  ComponentProps<typeof BaseMenu.RadioItemIndicator>,
  'render'
> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  /**
   * If true, renders a custom keepMounted container instead of default radio dot.
   * When false (default), renders a radio dot that appears when selected.
   * @default false
   */
  keepMounted?: boolean
  ref?: Ref<HTMLSpanElement>
}

/**
 * Displays a radio dot when the radio item is selected.
 * Automatically shows/hides based on the selected state.
 */
export const MenuRadioItemIndicator = ({
  asChild = false,
  keepMounted = false,
  className,
  ref,
  children,
  ...rest
}: MenuRadioItemIndicatorProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseMenu.RadioItemIndicator
      ref={ref}
      data-spark-component="menu-radio-item-indicator"
      render={renderSlot}
      keepMounted={keepMounted}
      className={cx('flex shrink-0 items-center justify-center', className)}
      {...rest}
    >
      {children || <div className={cx('rounded-full bg-current', 'sz-10')} aria-hidden="true" />}
    </BaseMenu.RadioItemIndicator>
  )
}

MenuRadioItemIndicator.displayName = 'Menu.RadioItemIndicator'
