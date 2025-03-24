import { Popover as RadixPopover } from 'radix-ui'

import { type PopoverIntent, PopoverProvider } from './PopoverContext'

export type PopoverProps = RadixPopover.PopoverProps & {
  intent?: PopoverIntent
}

export const Popover = ({ children, intent = 'surface', modal = false, ...rest }: PopoverProps) => {
  return (
    <PopoverProvider intent={intent}>
      <RadixPopover.Root data-spark-component="popover" modal={modal} {...rest}>
        {children}
      </RadixPopover.Root>
    </PopoverProvider>
  )
}

Popover.displayName = 'Popover'
