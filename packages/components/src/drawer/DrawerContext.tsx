import { createContext, type ReactNode, useContext } from 'react'

export interface DrawerContextState {
  withFade: boolean
}

const DrawerContext = createContext<DrawerContextState | null>(null)

export const DrawerProvider = ({
  children: childrenProp,
  withFade = false,
}: {
  children: ReactNode
  withFade?: boolean
}) => {
  return (
    <DrawerContext.Provider
      value={{
        withFade,
      }}
    >
      {childrenProp}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) {
    throw Error('useDrawer must be used within a Drawer provider')
  }

  return context
}
