import { createContext, type PropsWithChildren, useContext, useId } from 'react'

export interface GroupContextState {
  groupLabelId: string
}

type GroupContextProps = PropsWithChildren

const GroupContext = createContext<GroupContextState | null>(null)

export const GroupProvider = ({ children }: GroupContextProps) => {
  const ID_PREFIX = 'TODO'
  const groupLabelId = `${ID_PREFIX}-group-label-${useId()}`

  return <GroupContext.Provider value={{ groupLabelId }}>{children}</GroupContext.Provider>
}

export const useGroupContext = () => {
  const context = useContext(GroupContext)

  if (!context) {
    throw Error('useGroupContext must be used within a Group provider')
  }

  return context
}
