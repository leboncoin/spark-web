import {
  createContext,
  Dispatch,
  type PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { useComboboxContext } from './ComboboxContext'
import { ComboboxItem } from './types'
import { getIndexByKey, getItemText } from './utils'

type ItemTextId = string | undefined

interface ComboboxItemContextState {
  textId: ItemTextId
  setTextId: Dispatch<SetStateAction<ItemTextId>>
  isSelected: boolean
  itemData: ComboboxItem
  index: number
  disabled: boolean
}

const ComboboxItemContext = createContext<ComboboxItemContextState | null>(null)

export const ComboboxItemProvider = ({
  value,
  disabled = false,
  children,
}: PropsWithChildren<{ value: string; disabled?: boolean }>) => {
  const ctx = useComboboxContext()

  const [textId, setTextId] = useState<ItemTextId>(undefined)

  const index = getIndexByKey(ctx.filteredItemsMap, value)
  const itemData: ComboboxItem = { disabled, value, text: getItemText(children) }

  const isSelected = ctx.multiple
    ? ctx.selectedItems.some(selectedItem => selectedItem.value === value)
    : ctx.selectedItem?.value === value

  return (
    <ComboboxItemContext.Provider
      value={{ textId, setTextId, isSelected, itemData, index, disabled }}
    >
      {children}
    </ComboboxItemContext.Provider>
  )
}

export const useComboboxItemContext = () => {
  const context = useContext(ComboboxItemContext)

  if (!context) {
    throw Error('useComboboxItemContext must be used within a ComboboxItem provider')
  }

  return context
}
