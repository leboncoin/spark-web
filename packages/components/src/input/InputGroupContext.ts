import { createContext, useContext } from 'react'

export interface InputGroupContextValue {
  disabled?: boolean
  readOnly?: boolean
  hasLeadingIcon: boolean
  hasTrailingIcon: boolean
  hasLeadingAddon: boolean
  hasTrailingAddon: boolean
  hasClearButton: boolean
  state: null | undefined | 'error' | 'alert' | 'success'
  isStandalone?: boolean
  onClear: () => void
}

export const InputGroupContext = createContext<Partial<InputGroupContextValue> | null>(null)

export const useInputGroup = () => {
  const context = useContext(InputGroupContext)

  return context || { isStandalone: true }
}
