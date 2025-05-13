import { Content } from './Content'
import { Root } from './Root'
import { Trigger } from './Trigger'

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
