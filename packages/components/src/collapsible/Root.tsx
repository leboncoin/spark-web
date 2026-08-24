import { Collapsible } from '@base-ui/react/collapsible'
import { type ComponentProps } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface RootProps extends ComponentProps<typeof Collapsible.Root> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
}

export const Root = ({ asChild = false, children, ...props }: RootProps) => {
  const { renderProp, innerChildren } = useRenderSlot(asChild, children)

  return (
    <Collapsible.Root data-spark-component="collapsible" render={renderProp} {...props}>
      {innerChildren}
    </Collapsible.Root>
  )
}

Root.displayName = 'Collapsible'
