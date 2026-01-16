import { createContext, useContext } from 'react'

import type { SliderProps } from './Slider'

export type SliderContextInterface = Pick<SliderProps, 'intent' | 'shape'> & {
  fieldLabelId?: string
  fieldId?: string
}

export const SliderContext = createContext<SliderContextInterface>({} as SliderContextInterface)

export const useSliderContext = () => useContext(SliderContext)
