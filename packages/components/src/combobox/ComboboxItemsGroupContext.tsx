import { createContext, type PropsWithChildren, useContext, useId } from 'react'

import { ID_PREFIX } from './ComboboxContext'

export interface ComboboxContextState {
  groupLabelId: string
}

type ComboboxContextProps = PropsWithChildren

const ComboboxGroupContext = createContext<ComboboxContextState | null>(null)

export const ComboboxGroupProvider = ({ children }: ComboboxContextProps) => {
  const groupLabelId = `${ID_PREFIX}-group-label-${useId()}`

  return (
    <ComboboxGroupContext.Provider value={{ groupLabelId }}>
      {children}
    </ComboboxGroupContext.Provider>
  )
}

export const useComboboxGroupContext = () => {
  const context = useContext(ComboboxGroupContext)

  if (!context) {
    throw Error('useComboboxGroupContext must be used within a ComboboxGroup provider')
  }

  return context
}
