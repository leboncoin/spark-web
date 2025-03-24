import { createContext, type PropsWithChildren, useContext, useId } from 'react'

import { ID_PREFIX } from './DropdownContext'

export interface DropdownContextState {
  labelId: string
}

type DropdownContextProps = PropsWithChildren

const DropdownGroupContext = createContext<DropdownContextState | null>(null)

export const DropdownGroupProvider = ({ children }: DropdownContextProps) => {
  const labelId = `${ID_PREFIX}-group-label-${useId()}`

  return (
    <DropdownGroupContext.Provider value={{ labelId }}>{children}</DropdownGroupContext.Provider>
  )
}

export const useDropdownGroupContext = () => {
  const context = useContext(DropdownGroupContext)

  if (!context) {
    throw Error('useDropdownGroupContext must be used within a DropdownGroup provider')
  }

  return context
}
