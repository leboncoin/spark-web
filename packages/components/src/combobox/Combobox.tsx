import { type ComboboxContextProps, ComboboxProvider } from './ComboboxContext'

export type ComboboxProps = ComboboxContextProps

export const Combobox = ({ children, ...props }: ComboboxProps) => {
  return <ComboboxProvider {...props}>{children}</ComboboxProvider>
}

Combobox.displayName = 'Combobox'
