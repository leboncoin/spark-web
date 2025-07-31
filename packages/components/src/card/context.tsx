import { createContext, useContext } from 'react'

import type { CardStylesProps } from './Card.styles'

export interface CardContextValue {
  design: CardStylesProps['design']
  intent: CardStylesProps['intent']
  hasBackdrop: boolean
  inset: boolean
  isInteractive: boolean
}

const CardContext = createContext<CardContextValue | undefined>(undefined)

export const useCardContext = () => {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('useCardContext must be used within a Card component')
  }

  return context
}

export { CardContext }
