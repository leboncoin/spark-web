import { AutoSuggest as Root } from './AutoSuggest'
import { ClearButton } from './AutoSuggestClearButton'
import { Disclosure } from './AutoSuggestDisclosure'
import { Empty } from './AutoSuggestEmpty'
import { Group } from './AutoSuggestGroup'
import { Input } from './AutoSuggestInput'
import { Item } from './AutoSuggestItem'
import { ItemIndicator } from './AutoSuggestItemIndicator'
import { Items } from './AutoSuggestItems'
import { ItemText } from './AutoSuggestItemText'
import { Label } from './AutoSuggestLabel'
import { LeadingIcon } from './AutoSuggestLeadingIcon'
import { Popover } from './AutoSuggestPopover'
import { Portal } from './AutoSuggestPortal'
import { Trigger } from './AutoSuggestTrigger'

export const AutoSuggest: typeof Root & {
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

AutoSuggest.displayName = 'AutoSuggest'
Group.displayName = 'AutoSuggest.Group'
Items.displayName = 'AutoSuggest.Items'
Item.displayName = 'AutoSuggest.Item'
ItemText.displayName = 'AutoSuggest.ItemText'
ItemIndicator.displayName = 'AutoSuggest.ItemIndicator'
Label.displayName = 'AutoSuggest.Label'
Popover.displayName = 'AutoSuggest.Popover'
Trigger.displayName = 'AutoSuggest.Trigger'
LeadingIcon.displayName = 'AutoSuggest.LeadingIcon'
Empty.displayName = 'AutoSuggest.Empty'
Input.displayName = 'AutoSuggest.Input'
Disclosure.displayName = 'AutoSuggest.Disclosure'
ClearButton.displayName = 'AutoSuggest.ClearButton'
Portal.displayName = 'AutoSuggest.Portal'
