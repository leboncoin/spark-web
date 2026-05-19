import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cx } from 'class-variance-authority'
import { type ComponentProps, type Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface MenuGroupLabelProps extends Omit<
  ComponentProps<typeof BaseMenu.GroupLabel>,
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
 * A label for a group of menu items.
 * Provides semantic context and visual separation for grouped items.
 */
export const MenuGroupLabel = ({
  asChild = false,
  children,
  className,
  ref,
  ...rest
}: MenuGroupLabelProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseMenu.GroupLabel
      ref={ref}
      data-spark-component="menu-group-label"
      render={renderSlot}
      className={cx('text-on-surface/dim-1 text-body-2 font-bold', 'px-lg py-sm', className)}
      {...rest}
    >
      {children}
    </BaseMenu.GroupLabel>
  )
}

MenuGroupLabel.displayName = 'Menu.GroupLabel'
