import { Popover as RadixPopover } from 'radix-ui'
import { ReactElement } from 'react'

export type PortalProps = RadixPopover.PopoverPortalProps

/**
 * A portal that renders the popover in a different part of the DOM. Renders a <div> element.
 */

export const Portal = ({ children, ...rest }: PortalProps): ReactElement => (
  <RadixPopover.Portal {...rest}>{children}</RadixPopover.Portal>
)

Portal.displayName = 'Popover.Portal'
