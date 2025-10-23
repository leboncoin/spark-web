import { createContext, useContext } from 'react'

export interface SegmentedGaugeContextValue {
  value?: number
  min: number
  max: number
  segments: number
  currentIndex: number
  size: 'sm' | 'md'
  intent:
    | 'main'
    | 'support'
    | 'basic'
    | 'accent'
    | 'success'
    | 'alert'
    | 'danger'
    | 'info'
    | 'neutral'
  customColor?: string
  labelId: string
  gaugeId: string
}

export const SegmentedGaugeContext = createContext<SegmentedGaugeContextValue | null>(null)

export const useSegmentedGaugeContext = () => {
  const context = useContext(SegmentedGaugeContext)

  if (!context) {
    throw new Error('useSegmentedGaugeContext must be used within a SegmentedGauge provider')
  }

  return context
}
