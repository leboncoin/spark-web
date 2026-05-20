import { Menu as Root } from './Menu'
import { MenuCheckboxItem } from './MenuCheckboxItem'
import { MenuGroup } from './MenuGroup'
import { MenuGroupLabel } from './MenuGroupLabel'
import { MenuItem } from './MenuItem'
import { MenuLinkItem } from './MenuLinkItem'
import { MenuPopup } from './MenuPopup'
import { MenuPortal } from './MenuPortal'
import { MenuPositioner } from './MenuPositioner'
import { MenuRadioGroup } from './MenuRadioGroup'
import { MenuRadioItem } from './MenuRadioItem'
import { MenuSeparator } from './MenuSeparator'
import { MenuSubmenu } from './MenuSubmenu'
import { MenuSubmenuTrigger } from './MenuSubmenuTrigger'
import { MenuTrigger } from './MenuTrigger'

/**
 * A menu component that enables users to select options from a dropdown menu triggered by a button or other interactive element.
 */
export const Menu: typeof Root & {
  Trigger: typeof MenuTrigger
  Portal: typeof MenuPortal
  Positioner: typeof MenuPositioner
  Popup: typeof MenuPopup
  Item: typeof MenuItem
  LinkItem: typeof MenuLinkItem
  Submenu: typeof MenuSubmenu
  SubmenuTrigger: typeof MenuSubmenuTrigger
  Group: typeof MenuGroup
  GroupLabel: typeof MenuGroupLabel
  RadioGroup: typeof MenuRadioGroup
  RadioItem: typeof MenuRadioItem
  CheckboxItem: typeof MenuCheckboxItem
  Separator: typeof MenuSeparator
} = Object.assign(Root, {
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Item: MenuItem,
  LinkItem: MenuLinkItem,
  Submenu: MenuSubmenu,
  SubmenuTrigger: MenuSubmenuTrigger,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  CheckboxItem: MenuCheckboxItem,
  Separator: MenuSeparator,
})

Menu.displayName = 'Menu'
MenuTrigger.displayName = 'Menu.Trigger'
MenuPortal.displayName = 'Menu.Portal'
MenuPositioner.displayName = 'Menu.Positioner'
MenuPopup.displayName = 'Menu.Popup'
MenuItem.displayName = 'Menu.Item'
MenuLinkItem.displayName = 'Menu.LinkItem'
MenuSubmenu.displayName = 'Menu.Submenu'
MenuSubmenuTrigger.displayName = 'Menu.SubmenuTrigger'
MenuGroup.displayName = 'Menu.Group'
MenuGroupLabel.displayName = 'Menu.GroupLabel'
MenuRadioGroup.displayName = 'Menu.RadioGroup'
MenuRadioItem.displayName = 'Menu.RadioItem'
MenuCheckboxItem.displayName = 'Menu.CheckboxItem'
MenuSeparator.displayName = 'Menu.Separator'

export { type MenuProps } from './Menu'
export { type MenuTriggerProps } from './MenuTrigger'
export { type MenuPortalProps } from './MenuPortal'
export { type MenuPositionerProps } from './MenuPositioner'
export { type MenuPopupProps } from './MenuPopup'
export { type MenuItemProps } from './MenuItem'
export { type MenuLinkItemProps } from './MenuLinkItem'
export { type MenuSubmenuProps } from './MenuSubmenu'
export { type MenuSubmenuTriggerProps } from './MenuSubmenuTrigger'
export { type MenuGroupProps } from './MenuGroup'
export { type MenuGroupLabelProps } from './MenuGroupLabel'
export { type MenuRadioGroupProps } from './MenuRadioGroup'
export { type MenuRadioItemProps } from './MenuRadioItem'
export { type MenuCheckboxItemProps } from './MenuCheckboxItem'
export { type MenuSeparatorProps } from './MenuSeparator'
