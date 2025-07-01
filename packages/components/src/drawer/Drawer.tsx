import { Dialog as RadixDrawer } from 'radix-ui'
import { type ReactElement, ReactNode } from 'react'

import { DrawerProvider } from './DrawerContext'

export interface DrawerProps {
  /**
   * Children of the component.
   */
  children?: RadixDrawer.DialogProps['children']
  /**
   * Specifies if the dialog is open or not.
   */
  open?: RadixDrawer.DialogProps['open']
  /**
   * Default open state.
   */
  defaultOpen?: RadixDrawer.DialogProps['defaultOpen']
  /**
   * Handler executed on every dialog open state change.
   */
  onOpenChange?: RadixDrawer.DialogProps['onOpenChange']
  /**
   * Specifies if the dialog is a modal.
   */
  modal?: RadixDrawer.DialogProps['modal']
  /**
   * Specifies if the drawer should have a fade animation on its body (in case it is scrollable).
   */
  withFade?: boolean
}

export interface DialogProps {
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  modal?: boolean
}

export const Drawer = ({ children, withFade = false, ...rest }: DrawerProps): ReactElement => (
  <DrawerProvider withFade={withFade}>
    <RadixDrawer.Root {...rest}>{children}</RadixDrawer.Root>
  </DrawerProvider>
)

Drawer.displayName = 'Drawer.Root'
