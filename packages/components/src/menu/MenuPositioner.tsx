import { Menu as BaseMenu } from '@base-ui/react/menu'
import { type ComponentProps } from 'react'

import { useIsSubmenu } from './MenuSubmenuContext'

export interface MenuPositionerProps extends ComponentProps<typeof BaseMenu.Positioner> {}

/**
 * Positioning wrapper for the menu with collision detection.
 * Handles menu placement relative to the trigger and viewport boundaries.
 */
export const MenuPositioner = ({ children, sideOffset, ...rest }: MenuPositionerProps) => {
  const isSubmenu = useIsSubmenu()

  // Apply sideOffset of 8 for root menu, 0 for submenus (unless explicitly overridden)
  const defaultSideOffset = isSubmenu ? 0 : 8
  const finalSideOffset = sideOffset ?? defaultSideOffset

  return (
    <BaseMenu.Positioner sideOffset={finalSideOffset} {...rest}>
      {children}
    </BaseMenu.Positioner>
  )
}

MenuPositioner.displayName = 'Menu.Positioner'
