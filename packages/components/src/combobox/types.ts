import { type UseComboboxReturnValue, type UseMultipleSelectionReturnValue } from 'downshift'

export interface ComboboxItem {
  disabled: boolean
  value: string
  text: string
}

export type ItemsMap = Map<string, ComboboxItem>

export type DownshiftState = UseComboboxReturnValue<ComboboxItem> &
  UseMultipleSelectionReturnValue<ComboboxItem>
