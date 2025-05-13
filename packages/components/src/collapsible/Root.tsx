import { Collapsible } from '@base-ui-components/react/collapsible'
import { type ComponentProps } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface RootProps extends ComponentProps<typeof Collapsible.Root> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
}

export const Root = ({ asChild = false, children, ...props }: RootProps) => {
  const renderSlot = useRenderSlot(asChild, 'div')

  return (
    <Collapsible.Root data-spark-component="collapsible" render={renderSlot} {...props}>
      {children}
    </Collapsible.Root>
  )
}

Root.displayName = 'Collapsible'
