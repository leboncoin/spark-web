import { Dialog as RadixDrawer } from 'radix-ui'
import { type ReactElement } from 'react'

export type DrawerPortalProps = RadixDrawer.DialogPortalProps

export const DrawerPortal = ({ children, ...rest }: DrawerPortalProps): ReactElement => (
  <RadixDrawer.Portal {...rest}>{children}</RadixDrawer.Portal>
)

DrawerPortal.displayName = 'Drawer.Portal'
