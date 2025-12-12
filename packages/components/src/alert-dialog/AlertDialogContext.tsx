import { createContext, MutableRefObject, type ReactNode, useContext } from 'react'

export interface AlertDialogContextValue {
  cancelRef: MutableRefObject<HTMLButtonElement | null>
  withFade: boolean
}

export const AlertDialogContext = createContext<AlertDialogContextValue | null>(null)

export const AlertDialogProvider = ({
  children,
  withFade = false,
  cancelRef,
}: {
  children: ReactNode
  withFade?: boolean
  cancelRef: MutableRefObject<HTMLButtonElement | null>
}) => {
  return (
    <AlertDialogContext.Provider
      value={{
        cancelRef,
        withFade,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  )
}

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext)

  if (!context) {
    throw Error('useAlertDialog must be used within an AlertDialog provider')
  }

  return context
}
