import { createContext, useContext, MutableRefObject } from 'react'

export interface AlertDialogContextValue {
  cancelRef: MutableRefObject<HTMLButtonElement | null>
}

export const AlertDialogContext = createContext<AlertDialogContextValue | null>(null)

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext)

  if (!context) {
    throw Error('useAlertDialog must be used within a RadioGroup provider')
  }

  return context
}
