import { createContext, type ReactNode, useContext, useState } from 'react'

type HeaderId = string | null

export type PopoverIntent =
  | 'surface'
  | 'main'
  | 'support'
  | 'accent'
  | 'basic'
  | 'success'
  | 'alert'
  | 'danger'
  | 'info'
  | 'neutral'
export interface PopoverContextState {
  headerId: HeaderId
  setHeaderId: (id: HeaderId) => void
  intent: PopoverIntent
}

const PopoverContext = createContext<PopoverContextState | null>(null)

export const ID_PREFIX = ':popover'

export const PopoverProvider = ({
  children,
  intent,
}: {
  children: ReactNode
  intent: PopoverIntent
}) => {
  const [headerId, setHeaderId] = useState<HeaderId>(null)

  return (
    <PopoverContext.Provider
      value={{
        headerId,
        setHeaderId,
        intent,
      }}
    >
      {children}
    </PopoverContext.Provider>
  )
}

export const usePopover = () => {
  const context = useContext(PopoverContext)

  if (!context) {
    throw Error('usePopover must be used within a Popover provider')
  }

  return context
}
