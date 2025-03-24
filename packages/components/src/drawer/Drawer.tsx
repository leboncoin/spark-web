import { Dialog as RadixDrawer } from 'radix-ui'
import { type ReactElement, ReactNode } from 'react'

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
}

export interface DialogProps {
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  modal?: boolean
}

export const Drawer = ({ children, ...rest }: DrawerProps): ReactElement => (
  <RadixDrawer.Root {...rest}>{children}</RadixDrawer.Root>
)

Drawer.displayName = 'Drawer.Root'
