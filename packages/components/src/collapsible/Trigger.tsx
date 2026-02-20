import { Collapsible } from '@base-ui/react/collapsible'
import { type ComponentProps } from 'react'

export interface TriggerProps extends ComponentProps<typeof Collapsible.Trigger> {}

export const Trigger = ({ children, ...props }: TriggerProps) => {
  return (
    <Collapsible.Trigger data-spark-component="collapsible-trigger" {...props}>
      {children}
    </Collapsible.Trigger>
  )
}

Trigger.displayName = 'Collapsible.Trigger'
