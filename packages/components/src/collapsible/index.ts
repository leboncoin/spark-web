import { Collapsible as Root } from './Collapsible'
import { Content } from './CollapsibleContent'
import { Trigger } from './CollapsibleTrigger'

export const Collapsible: typeof Root & {
  Trigger: typeof Trigger
  Content: typeof Content
} = Object.assign(Root, {
  Trigger,
  Content,
})

Collapsible.displayName = 'Collapsible'
Trigger.displayName = 'Collapsible.Trigger'
Content.displayName = 'Collapsible.Content'

export { type CollapsibleProps } from './Collapsible'
export { type CollapsibleContentProps } from './CollapsibleContent'
export { type CollapsibleTriggerProps } from './CollapsibleTrigger'
