import { createContext, type PropsWithChildren, useContext, useId } from 'react'

export interface AutoSuggestContextState {
  groupLabelId: string
}

type AutoSuggestContextProps = PropsWithChildren

const AutoSuggestGroupContext = createContext<AutoSuggestContextState | null>(null)

export const AutoSuggestGroupProvider = ({ children }: AutoSuggestContextProps) => {
  const ID_PREFIX = 'TODO'
  const groupLabelId = `${ID_PREFIX}-group-label-${useId()}`

  return (
    <AutoSuggestGroupContext.Provider value={{ groupLabelId }}>
      {children}
    </AutoSuggestGroupContext.Provider>
  )
}

export const useAutoSuggestGroupContext = () => {
  const context = useContext(AutoSuggestGroupContext)

  if (!context) {
    throw Error('useAutoSuggestGroupContext must be used within a AutoSuggestGroup provider')
  }

  return context
}
