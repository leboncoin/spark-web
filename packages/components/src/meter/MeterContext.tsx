import { createContext, useContext } from 'react'

import { MeterIndicatorStylesProps } from './MeterTrack.styles'

export interface MeterContextValue {
  value: number
  max: number
  min: number
  intent: MeterIndicatorStylesProps['intent']
  shape: 'square' | 'rounded'
  onLabelId: (id?: string) => void
}

export const MeterContext = createContext<MeterContextValue | null>(null)

export const ID_PREFIX = ':meter'

export const useMeter = () => {
  const context = useContext(MeterContext)

  if (!context) {
    throw new Error('useMeter must be used within a Meter provider')
  }

  return context
}
