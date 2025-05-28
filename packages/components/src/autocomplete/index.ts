import { AutoComplete as Root } from './Root'
import { ClearButton } from './ClearButton'
import { Disclosure } from './Disclosure'
import { Empty } from './Empty'
import { Group } from './Group'
import { Input } from './Input'
import { Item } from './Item'
import { ItemIndicator } from './ItemIndicator'
import { Items } from './Items'
import { ItemText } from './ItemText'
import { Label } from './Label'
import { LeadingIcon } from './LeadingIcon'
import { Popover } from './Popover'
import { Portal } from './Portal'
import { Trigger } from './Trigger'

export const AutoComplete: typeof Root & {
  Group: typeof Group
  Item: typeof Item
  Items: typeof Items
  ItemText: typeof ItemText
  ItemIndicator: typeof ItemIndicator
  Label: typeof Label
  Popover: typeof Popover
  Trigger: typeof Trigger
  LeadingIcon: typeof LeadingIcon
  Empty: typeof Empty
  Input: typeof Input
  Disclosure: typeof Disclosure
  ClearButton: typeof ClearButton
  Portal: typeof Portal
} = Object.assign(Root, {
  Group,
  Item,
  Items,
  ItemText,
  ItemIndicator,
  Label,
  Popover,
  Trigger,
  LeadingIcon,
  Empty,
  Input,
  Disclosure,
  ClearButton,
  Portal,
})

AutoComplete.displayName = 'AutoComplete'
Group.displayName = 'AutoComplete.Group'
Items.displayName = 'AutoComplete.Items'
Item.displayName = 'AutoComplete.Item'
ItemText.displayName = 'AutoComplete.ItemText'
ItemIndicator.displayName = 'AutoComplete.ItemIndicator'
Label.displayName = 'AutoComplete.Label'
Popover.displayName = 'AutoComplete.Popover'
Trigger.displayName = 'AutoComplete.Trigger'
LeadingIcon.displayName = 'AutoComplete.LeadingIcon'
Empty.displayName = 'AutoComplete.Empty'
Input.displayName = 'AutoComplete.Input'
Disclosure.displayName = 'AutoComplete.Disclosure'
ClearButton.displayName = 'AutoComplete.ClearButton'
Portal.displayName = 'AutoComplete.Portal'
