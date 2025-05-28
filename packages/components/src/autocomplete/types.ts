export interface AutoCompleteItem {
  disabled: boolean
  value: string
  text: string
}

export type ItemsMap = Map<string, AutoCompleteItem>
