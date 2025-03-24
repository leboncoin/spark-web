import { Portal as RadixPortal } from 'radix-ui'
import { type PropsWithChildren, Ref } from 'react'

interface PortalProps {
  /**
   * An optional different container where the portaled content should be appended.
   */
  container?: HTMLElement | null
  ref?: Ref<HTMLDivElement>
}

export const Portal = (props: PropsWithChildren<PortalProps>) => {
  return <RadixPortal.Portal {...props} />
}
