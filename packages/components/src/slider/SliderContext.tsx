import type { RefObject } from 'react'
import { createContext, useContext } from 'react'

import type { SliderProps } from './Slider'

export type SliderContextInterface = Pick<SliderProps, 'intent' | 'min' | 'max'> & {
  fieldLabelId?: string
  fieldId?: string
  onLabelId?: (id: string | undefined) => void
  hasValueInThumb: boolean
  registerValueInThumb: () => () => void
  controlRef: RefObject<HTMLElement | null>
  thumbRef: RefObject<HTMLElement | null>
}

export const SliderContext = createContext<SliderContextInterface>({} as SliderContextInterface)

export const useSliderContext = () => useContext(SliderContext)
