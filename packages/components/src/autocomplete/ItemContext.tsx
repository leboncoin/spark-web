import { createContext, type PropsWithChildren, useContext } from 'react'
import { useSnapshot } from 'valtio'

import { useAutoComplete } from './Root'

interface ItemContextState {
  isSelected: boolean
  disabled: boolean
}

const ComboboxItemContext = createContext<ItemContextState | null>(null)

export const ItemContext = ({
  value,
  disabled = false,
  children,
}: PropsWithChildren<{ value: string; disabled?: boolean }>) => {
  const { state } = useAutoComplete()
  const snap = useSnapshot(state)

  const isSelected = snap.value === value

  return (
    <ComboboxItemContext.Provider value={{ isSelected, disabled }}>
      {children}
    </ComboboxItemContext.Provider>
  )
}

export const useItemContext = () => {
  const context = useContext(ComboboxItemContext)

  if (!context) {
    throw Error('useComboboxItemContext must be used within a ComboboxItem provider')
  }

  return context
}
