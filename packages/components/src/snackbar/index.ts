import {
  addSnackbar,
  type AddSnackbarArgs,
  clearSnackbarQueue,
  Snackbar as Root,
  type SnackbarProps,
} from './Snackbar'
import { SnackbarItem as Item, type SnackbarItemProps } from './SnackbarItem'
import {
  SnackbarItemAction as ItemAction,
  type SnackbarItemActionProps,
} from './SnackbarItemAction'
import { SnackbarItemClose as ItemClose, type SnackbarItemCloseProps } from './SnackbarItemClose'
import { SnackbarItemIcon as ItemIcon, type SnackbarItemIconProps } from './SnackbarItemIcon'

export const Snackbar: typeof Root & {
  Item: typeof Item
  ItemAction: typeof ItemAction
  ItemClose: typeof ItemClose
  ItemIcon: typeof ItemIcon
} = Object.assign(Root, {
  Item,
  ItemAction,
  ItemClose,
  ItemIcon,
})

Snackbar.displayName = 'Snackbar'
Item.displayName = 'Snackbar.Item'
ItemAction.displayName = 'Snackbar.ItemAction'
ItemClose.displayName = 'Snackbar.ItemClose'
ItemIcon.displayName = 'Snackbar.ItemIcon'

export type {
  SnackbarProps,
  SnackbarItemProps,
  SnackbarItemActionProps,
  SnackbarItemCloseProps,
  SnackbarItemIconProps,
  AddSnackbarArgs,
}
export { addSnackbar, clearSnackbarQueue }
