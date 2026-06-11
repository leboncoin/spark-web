import { createContext, type ReactNode, useContext, useState } from 'react'

export interface DialogContextState {
  isFullScreen: boolean
  setIsFullScreen: (value: boolean) => void
  withFade: boolean
}

const DialogContext = createContext<DialogContextState | null>(null)

export const DialogProvider = ({
  children: childrenProp,
  withFade = false,
}: {
  children: ReactNode
  withFade?: boolean
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  return (
    <DialogContext
      value={{
        isFullScreen,
        setIsFullScreen,
        withFade,
      }}
    >
      {childrenProp}
    </DialogContext>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw Error('useDialog must be used within a Dialog provider')
  }

  return context
}
