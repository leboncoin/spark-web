import { createContext, type ReactNode, useContext, useState } from 'react'

export interface DialogContextState {
  isFullScreen: boolean
  setIsFullScreen: (value: boolean) => void
}

const DialogContext = createContext<DialogContextState | null>(null)

export const DialogProvider = ({ children: childrenProp }: { children: ReactNode }) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  return (
    <DialogContext.Provider
      value={{
        isFullScreen,
        setIsFullScreen,
      }}
    >
      {childrenProp}
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw Error('useDialog must be used within a Dialog provider')
  }

  return context
}
