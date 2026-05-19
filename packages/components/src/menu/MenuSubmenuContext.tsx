import { createContext, useContext } from 'react'

/**
 * Context to track if we're inside a submenu
 */
export const MenuSubmenuContext = createContext<boolean>(false)

/**
 * Hook to check if the current menu is a submenu
 */
export const useIsSubmenu = () => {
  return useContext(MenuSubmenuContext)
}
