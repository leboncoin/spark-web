import { Menu as BaseMenu } from '@base-ui/react/menu'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { cx } from 'class-variance-authority'
import { type ComponentProps, type Ref } from 'react'

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
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <BaseMenu.GroupLabel
      ref={ref}
      data-spark-component="menu-group-label"
      render={renderProp}
      className={cx('text-on-surface/dim-1 text-body-2 font-bold', 'px-lg py-sm', className)}
      {...rest}
    >
      {innerChildren}
    </BaseMenu.GroupLabel>
  )
}

MenuGroupLabel.displayName = 'Menu.GroupLabel'
