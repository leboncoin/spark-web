import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

import { usePopover } from './PopoverContext'

export type AnchorProps = RadixPopover.PopoverAnchorProps & {
  ref?: Ref<HTMLDivElement>
}

/**
 * The anchor element for positioning the popover. Renders a <div> element.
 */

export const Anchor = ({ asChild = false, children, ref, ...rest }: AnchorProps) => {
  const { setAnchorElement } = usePopover()
  const mergedRef = useMergeRefs<HTMLDivElement | null>(ref, setAnchorElement)

  return (
    <RadixPopover.Anchor
      data-spark-component="popover-anchor"
      ref={mergedRef}
      asChild={asChild}
      {...rest}
    >
      {children}
    </RadixPopover.Anchor>
  )
}

Anchor.displayName = 'Popover.Anchor'
