import { Select as Root } from './Select'
import { SelectProvider, useSelectContext } from './SelectContext'
import { Group } from './SelectGroup'
import { Item } from './SelectItem'
import { Items } from './SelectItems'
import { Label } from './SelectLabel'
import { LeadingIcon } from './SelectLeadingIcon'
import { Placeholder } from './SelectPlaceholder'
import { Trigger } from './SelectTrigger'
import { Value } from './SelectValue'

export { useSelectContext, SelectProvider }

export const Select: typeof Root & {
  Group: typeof Group
  Item: typeof Item
  Items: typeof Items
  Placeholder: typeof Placeholder
  Label: typeof Label
  Trigger: typeof Trigger
  Value: typeof Value
  LeadingIcon: typeof LeadingIcon
} = Object.assign(Root, {
  Group,
  Item,
  Items,
  Placeholder,
  Label,
  Trigger,
  Value,
  LeadingIcon,
})

Select.displayName = 'Select'
Group.displayName = 'Select.Group'
Items.displayName = 'Select.Items'
Item.displayName = 'Select.Item'
Placeholder.displayName = 'Select.Placeholder'
Label.displayName = 'Select.Label'
Trigger.displayName = 'Select.Trigger'
Value.displayName = 'Select.Value'
LeadingIcon.displayName = 'Select.LeadingIcon'
