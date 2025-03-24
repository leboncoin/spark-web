import { type DropdownContextProps, DropdownProvider } from './DropdownContext'

export type DropdownProps = DropdownContextProps

export const Dropdown = ({ children, ...props }: DropdownProps) => {
  return <DropdownProvider {...props}>{children}</DropdownProvider>
}

Dropdown.displayName = 'Dropdown'
