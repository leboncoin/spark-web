import { mergeProps } from '@zag-js/react'
import { type ComponentPropsWithoutRef, Ref } from 'react'

import { Slot } from '../slot'
import { useCollapsibleContext } from './Collapsible'

export interface CollapsibleTriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const Trigger = ({ asChild = false, children, ref, ...props }: CollapsibleTriggerProps) => {
  const collapsibleContext = useCollapsibleContext()
  const Component = asChild ? Slot : 'button'
  const mergedProps = mergeProps(collapsibleContext.getTriggerProps(), props)

  return (
    <Component ref={ref} data-spark-component="collapsible-trigger" {...mergedProps}>
      {children}
    </Component>
  )
}

Trigger.displayName = 'Collapsible.Trigger'
