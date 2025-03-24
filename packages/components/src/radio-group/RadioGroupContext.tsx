import { createContext, useContext } from 'react'

import type { RadioGroupProps } from './RadioGroup'
import type { RadioInputProps } from './RadioInput'

export type RadioGroupContextState = Pick<RadioInputProps, 'intent' | 'disabled'> &
  Pick<RadioGroupProps, 'reverse'>

export const RadioGroupContext = createContext<RadioGroupContextState | null>(null)

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw Error('useRadioGroup must be used within a RadioGroup provider')
  }

  return context
}
