import { type UseAutoSuggestReturnValue } from 'downshift'

export interface AutoSuggestItem {
  disabled: boolean
  value: string
  text: string
}

export type ItemsMap = Map<string, AutoSuggestItem>

export type DownshiftState = UseAutoSuggestReturnValue<AutoSuggestItem>
