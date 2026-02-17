import { createContext, useContext } from 'react'

export interface InputOTPContextValue {
  value: string
  maxLength: number
  slots: {
    char: string
    isActive: boolean
    hasFakeCaret: boolean
  }[]
  activeIndex: number
  intent: 'neutral' | 'success' | 'alert' | 'error'
  disabled: boolean
  readOnly: boolean
  placeholder?: string
  type: 'text' | 'number' | 'password' | 'tel'
}

export const InputOTPContext = createContext<InputOTPContextValue | null>(null)

export const useInputOTPContext = () => {
  const context = useContext(InputOTPContext)
  if (!context) {
    throw new Error('InputOTP components must be used within InputOTP')
  }

  return context
}
