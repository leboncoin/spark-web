import { Collapsible } from '@base-ui-components/react/collapsible'
import { type ComponentProps } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface TriggerProps extends ComponentProps<'button'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
}

export const Trigger = ({ asChild = false, children, ...props }: TriggerProps) => {
  const renderSlot = useRenderSlot(asChild, 'button')

  return (
    <Collapsible.Trigger data-spark-component="collapsible-trigger" render={renderSlot} {...props}>
      {children}
    </Collapsible.Trigger>
  )
}

Trigger.displayName = 'Collapsible.Trigger'
