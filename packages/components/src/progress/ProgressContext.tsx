import { createContext, useContext } from 'react'

import { ProgressIndicatorStylesProps } from './ProgressIndicator.styles'

export interface ProgressContextValue {
  value: number
  max: number
  isIndeterminate: boolean
  shape: 'square' | 'rounded'
  intent: ProgressIndicatorStylesProps['intent']
  onLabelId: (id?: string) => void
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
