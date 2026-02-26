import { createContext, useContext } from 'react'

export interface TableResizableContextValue {
  isResizable: boolean
}

export const TableResizableContext = createContext<TableResizableContextValue>({
  isResizable: false,
})

export function useTableResizableContext() {
  return useContext(TableResizableContext)
}
