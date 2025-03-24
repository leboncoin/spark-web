import { ReactNode, useMemo } from 'react'

import type { RadioGroupProps } from './RadioGroup'
import { RadioGroupContext } from './RadioGroupContext'
import type { RadioInputProps } from './RadioInput'

export interface RadioGroupProviderProps
  extends Pick<RadioInputProps, 'intent' | 'disabled'>,
    Pick<RadioGroupProps, 'reverse'> {
  children: ReactNode
}

export const RadioGroupProvider = ({
  intent,
  disabled,
  reverse,
  children,
}: RadioGroupProviderProps) => {
  const value = useMemo(() => ({ intent, disabled, reverse }), [intent, disabled, reverse])

  return <RadioGroupContext.Provider value={value}>{children}</RadioGroupContext.Provider>
}
