import { Tabs as Root } from './Tabs'
import { TabsContent as Content } from './TabsContent'
import { TabsList as List } from './TabsList'
import { TabsPopup as Popup } from './TabsPopup'
import { TabsTrigger as Trigger } from './TabsTrigger'

export const Tabs: typeof Root & {
  List: typeof List
  Trigger: typeof Trigger
  Content: typeof Content
  Popup: typeof Popup
} = Object.assign(Root, {
  List,
  Trigger,
  Content,
  Popup,
})

Tabs.displayName = 'Tabs'
List.displayName = 'Tabs.List'
Trigger.displayName = 'Tabs.Trigger'
Content.displayName = 'Tabs.Content'
Popup.displayName = 'Tabs.Popup'

export { type TabsContentProps } from './TabsContent'
export { type TabsListProps } from './TabsList'
export { type TabsPopupProps } from './TabsPopup'
export { type TabsProps, type TabsRootProps } from './Tabs'
export { type TabsTriggerProps } from './TabsTrigger'
