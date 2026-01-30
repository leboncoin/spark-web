import { createContext, useContext } from 'react'

import { ProgressIndicatorStylesProps } from './ProgressIndicator'

export interface ProgressContextValue {
  value: number | null
  max: number
  min: number
  shape: 'square' | 'rounded'
  intent: ProgressIndicatorStylesProps['intent']
  onLabelId: (id?: string) => void
  onComplete?: () => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export const ID_PREFIX = ':progress'

export const useProgress = () => {
  const context = useContext(ProgressContext)

  if (!context) {
    throw new Error('useProgress must be used within a Progress provider')
  }

  return context
}
