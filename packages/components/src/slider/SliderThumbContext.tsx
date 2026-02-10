import { createContext, useContext } from 'react'

export interface SliderThumbContextValue {
  isInsideThumb: true
}

export const SliderThumbContext = createContext<SliderThumbContextValue | null>(null)

export const useSliderThumbContext = () => useContext(SliderThumbContext)
