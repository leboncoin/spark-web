import { createContext, type PropsWithChildren, useContext, useState } from 'react'

export interface SelectContextState {
  groupLabel: string
  setGroupLabel: (label: string) => void
}

type SelectContextProps = PropsWithChildren

const SelectGroupContext = createContext<SelectContextState | null>(null)

export const SelectGroupProvider = ({ children }: SelectContextProps) => {
  const [groupLabel, setGroupLabel] = useState('')

  return (
    <SelectGroupContext.Provider value={{ groupLabel, setGroupLabel }}>
      {children}
    </SelectGroupContext.Provider>
  )
}

export const useSelectGroupContext = () => {
  const context = useContext(SelectGroupContext)

  if (!context) {
    throw Error('useSelectGroupContext must be used within a SelectGroup provider')
  }

  return context
}
