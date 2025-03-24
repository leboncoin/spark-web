import { Popover as RadixPopover } from 'radix-ui'
import { ReactElement } from 'react'

export type PortalProps = RadixPopover.PopoverPortalProps

export const Portal = ({ children, ...rest }: PortalProps): ReactElement => (
  <RadixPopover.Portal {...rest}>{children}</RadixPopover.Portal>
)

Portal.displayName = 'Popover.Portal'
