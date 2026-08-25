import { Collapsible } from '@base-ui/react/collapsible'
import { createRenderSlot } from '@spark-ui/internal-utils'
import { type ComponentProps } from 'react'

export interface TriggerProps extends ComponentProps<'button'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
}

/**
 * A button that toggles the collapsible content. Renders a <button> element.
 */
export const Trigger = ({ asChild = false, children, ...props }: TriggerProps) => {
  const { renderProp, innerChildren } = createRenderSlot(asChild, children)

  return (
    <Collapsible.Trigger data-spark-component="collapsible-trigger" render={renderProp} {...props}>
      {innerChildren}
    </Collapsible.Trigger>
  )
}

Trigger.displayName = 'Collapsible.Trigger'
