import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

export type TriggerProps = RadixPopover.PopoverTriggerProps & {
  ref?: Ref<HTMLButtonElement>
}

export const Trigger = ({ asChild = false, children, ref, ...rest }: TriggerProps) => (
  <RadixPopover.Trigger
    data-spark-component="popover-trigger"
    ref={ref}
    asChild={asChild}
    {...rest}
  >
    {children}
  </RadixPopover.Trigger>
)

Trigger.displayName = 'Popover.Trigger'
