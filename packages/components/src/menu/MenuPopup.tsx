import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cx } from 'class-variance-authority'
import { type ComponentProps, type Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface MenuPopupProps extends Omit<ComponentProps<typeof BaseMenu.Popup>, 'render'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * The scrollable menu container that holds menu items.
 * Serves as the viewport for menu content with overflow handling.
 */
export const MenuPopup = ({
  asChild = false,
  children,
  className,
  ref,
  ...rest
}: MenuPopupProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseMenu.Popup
      ref={ref}
      data-spark-component="menu-popup"
      render={renderSlot}
      className={cx(
        [
          'rounded-md bg-surface shadow-lg min-w-sz-192',
          'p-sm',
          'overflow-auto',
          'z-popover',
          'data-starting-style:opacity-0',
          'data-ending-style:opacity-0',
          'opacity-100',
          'transition-opacity duration-200',
        ],
        className
      )}
      {...rest}
    >
      {children}
    </BaseMenu.Popup>
  )
}

MenuPopup.displayName = 'Menu.Popup'
