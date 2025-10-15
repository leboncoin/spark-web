import { createContext, useContext } from 'react'

export interface SegmentedGaugeContextValue {
  value: number
  min: number
  max: number
  segments: number
  segmentLabels: string[]
  currentIndex: number
  activeLabel: string
  size: 'sm' | 'md'
  intent: 'basic' | 'success' | 'alert' | 'danger' | 'info' | string
  labelId: string
}

export const SegmentedGaugeContext = createContext<SegmentedGaugeContextValue | null>(null)

export const useSegmentedGaugeContext = () => {
  const context = useContext(SegmentedGaugeContext)

  if (!context) {
    throw new Error('useSegmentedGaugeContext must be used within a SegmentedGauge provider')
  }

  return context
}
