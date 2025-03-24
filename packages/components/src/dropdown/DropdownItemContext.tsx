import {
  createContext,
  Dispatch,
  type PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { useDropdownContext } from './DropdownContext'
import { DropdownItem } from './types'
import { getIndexByKey, getItemText } from './utils'

type ItemTextId = string | undefined

interface DropdownItemContextState {
  textId: ItemTextId
  setTextId: Dispatch<SetStateAction<ItemTextId>>
  isSelected: boolean
  itemData: DropdownItem
  index: number
  disabled: boolean
}

const DropdownItemContext = createContext<DropdownItemContextState | null>(null)

export const DropdownItemProvider = ({
  value,
  disabled = false,
  children,
}: PropsWithChildren<{ value: string; disabled?: boolean }>) => {
  const { multiple, itemsMap, selectedItem, selectedItems } = useDropdownContext()

  const [textId, setTextId] = useState<ItemTextId>(undefined)

  const index = getIndexByKey(itemsMap, value)
  const itemData: DropdownItem = { disabled, value, text: getItemText(children) }

  const isSelected = multiple
    ? selectedItems.some(selectedItem => selectedItem.value === value)
    : selectedItem?.value === value

  return (
    <DropdownItemContext.Provider
      value={{ textId, setTextId, isSelected, itemData, index, disabled }}
    >
      {children}
    </DropdownItemContext.Provider>
  )
}

export const useDropdownItemContext = () => {
  const context = useContext(DropdownItemContext)

  if (!context) {
    throw Error('useDropdownItemContext must be used within a DropdownItem provider')
  }

  return context
}
