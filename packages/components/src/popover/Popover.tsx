import { Popover as RadixPopover } from 'radix-ui'
import { useState } from 'react'

import { type PopoverIntent, PopoverProvider } from './PopoverContext'

export type PopoverProps = RadixPopover.PopoverProps & {
  intent?: PopoverIntent
  /**
   * Whether to prevent the popover from closing on outside presses (including on `Popover.Overlay`).
   * It also prevents the popover from closing when focus moves outside of it.
   * The popover can still be closed with the Escape key, `Popover.CloseButton` or the `open` prop.
   * @default false
   */
  disablePointerDismissal?: boolean
}

export const Popover = ({
  children,
  intent = 'surface',
  modal = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disablePointerDismissal = false,
  ...rest
}: PopoverProps) => {
  /**
   * Radix does not expose the open state of the popover, but some Spark parts (ex: Popover.Overlay) need it.
   * We mirror Radix's controlled/uncontrolled behaviour here and always control the Radix root.
   */
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  return (
    <PopoverProvider intent={intent} open={open} disablePointerDismissal={disablePointerDismissal}>
      <RadixPopover.Root
        data-spark-component="popover"
        modal={modal}
        open={open}
        onOpenChange={handleOpenChange}
        {...rest}
      >
        {children}
      </RadixPopover.Root>
    </PopoverProvider>
  )
}

Popover.displayName = 'Popover'
