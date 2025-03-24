import { createContext, useContext } from 'react'

import { type ChipProps } from './Chip'

export type ChipsContextType = Pick<ChipProps, 'disabled' | 'design' | 'intent' | 'onClear'>

export const ChipContext = createContext<ChipsContextType>({} as ChipsContextType)
export const useChipContext = () => useContext(ChipContext) || {}
