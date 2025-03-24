import { UseMultipleSelectionReturnValue, type UseSelectReturnValue } from 'downshift'

export interface DropdownItem {
  disabled: boolean
  value: string
  text: string
}

export type ItemsMap = Map<string, DropdownItem>

export type DownshiftState = UseSelectReturnValue<DropdownItem> &
  UseMultipleSelectionReturnValue<DropdownItem>
