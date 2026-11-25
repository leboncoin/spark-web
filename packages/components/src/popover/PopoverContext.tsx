import { createContext, type ReactNode, useContext, useState } from 'react'

type HeaderId = string | null

export type PopoverIntent =
  | 'surface'
  | 'main'
  | 'support'
  | 'accent'
  | 'success'
  | 'alert'
  | 'danger'
  | 'info'
  | 'neutral'
export interface PopoverContextState {
  headerId: HeaderId
  setHeaderId: (id: HeaderId) => void
  intent: PopoverIntent
  open: boolean
  /**
   * DOM elements registered by Popover.Anchor and Popover.Trigger, used by Popover.Overlay to highlight them (spotlight).
   */
  anchorElement: HTMLElement | null
  setAnchorElement: (element: HTMLElement | null) => void
  triggerElement: HTMLElement | null
  setTriggerElement: (element: HTMLElement | null) => void
}

const PopoverContext = createContext<PopoverContextState | null>(null)

export const ID_PREFIX = ':popover'

export const PopoverProvider = ({
  children,
  intent,
  open,
}: {
  children: ReactNode
  intent: PopoverIntent
  open: boolean
}) => {
  const [headerId, setHeaderId] = useState<HeaderId>(null)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null)

  return (
    <PopoverContext
      value={{
        headerId,
        setHeaderId,
        intent,
        open,
        anchorElement,
        setAnchorElement,
        triggerElement,
        setTriggerElement,
      }}
    >
      {children}
    </PopoverContext>
  )
}

export const usePopover = () => {
  const context = useContext(PopoverContext)

  if (!context) {
    throw Error('usePopover must be used within a Popover provider')
  }

  return context
}
