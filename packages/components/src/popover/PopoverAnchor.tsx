import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

export type AnchorProps = RadixPopover.PopoverAnchorProps & {
  ref?: Ref<HTMLDivElement>
}

export const Anchor = ({ asChild = false, children, ref, ...rest }: AnchorProps) => (
  <RadixPopover.Anchor data-spark-component="popover-anchor" ref={ref} asChild={asChild} {...rest}>
    {children}
  </RadixPopover.Anchor>
)

Anchor.displayName = 'Popover.Anchor'
