import { Collapsible } from '@base-ui/react/collapsible'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { type ComponentProps } from 'react'

export interface RootProps extends ComponentProps<typeof Collapsible.Root> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
}

export const Root = ({ asChild = false, children, ...props }: RootProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <Collapsible.Root data-spark-component="collapsible" render={renderProp} {...props}>
      {innerChildren}
    </Collapsible.Root>
  )
}

Root.displayName = 'Collapsible'
