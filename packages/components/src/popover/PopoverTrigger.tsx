import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

import { usePopover } from './PopoverContext'

export type TriggerProps = RadixPopover.PopoverTriggerProps & {
  ref?: Ref<HTMLButtonElement>
}

/**
 * A button that opens the popover. Renders a <button> element.
 */

export const Trigger = ({ asChild = false, children, ref, ...rest }: TriggerProps) => {
  const { setTriggerElement } = usePopover()
  const mergedRef = useMergeRefs<HTMLButtonElement | null>(ref, setTriggerElement)

  return (
    <RadixPopover.Trigger
      data-spark-component="popover-trigger"
      ref={mergedRef}
      asChild={asChild}
      {...rest}
    >
      {children}
    </RadixPopover.Trigger>
  )
}

Trigger.displayName = 'Popover.Trigger'
