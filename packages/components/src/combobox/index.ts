import { Combobox as Root } from './Combobox'
import { ClearButton } from './ComboboxClearButton'
import { ComboboxProvider, useComboboxContext } from './ComboboxContext'
import { Disclosure } from './ComboboxDisclosure'
import { Empty } from './ComboboxEmpty'
import { Group } from './ComboboxGroup'
import { Input } from './ComboboxInput'
import { Item } from './ComboboxItem'
import { ItemIndicator } from './ComboboxItemIndicator'
import { Items } from './ComboboxItems'
import { ItemText } from './ComboboxItemText'
import { Label } from './ComboboxLabel'
import { LeadingIcon } from './ComboboxLeadingIcon'
import { Popover } from './ComboboxPopover'
import { Portal } from './ComboboxPortal'
import { SelectedItems } from './ComboboxSelectedItems'
import { Trigger } from './ComboboxTrigger'

export { useComboboxContext, ComboboxProvider }

export const Combobox: typeof Root & {
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
  SelectedItems: typeof SelectedItems
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
  SelectedItems,
  ClearButton,
  Portal,
})

Combobox.displayName = 'Combobox'
Group.displayName = 'Combobox.Group'
Items.displayName = 'Combobox.Items'
Item.displayName = 'Combobox.Item'
ItemText.displayName = 'Combobox.ItemText'
ItemIndicator.displayName = 'Combobox.ItemIndicator'
Label.displayName = 'Combobox.Label'
Popover.displayName = 'Combobox.Popover'
Trigger.displayName = 'Combobox.Trigger'
LeadingIcon.displayName = 'Combobox.LeadingIcon'
Empty.displayName = 'Combobox.Empty'
Input.displayName = 'Combobox.Input'
Disclosure.displayName = 'Combobox.Disclosure'
SelectedItems.displayName = 'Combobox.SelectedItems'
ClearButton.displayName = 'Combobox.ClearButton'
Portal.displayName = 'Combobox.Portal'
