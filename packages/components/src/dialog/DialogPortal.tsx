import { Dialog as RadixDialog } from 'radix-ui'
import { type ReactElement } from 'react'

export type PortalProps = RadixDialog.DialogPortalProps

export const Portal = ({ children, ...rest }: PortalProps): ReactElement => (
  <RadixDialog.Portal {...rest}>{children}</RadixDialog.Portal>
)

Portal.displayName = 'Dialog.Portal'
