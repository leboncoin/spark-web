import { type SelectContextProps, SelectProvider } from './SelectContext'
import { findElement } from './utils'

export type SelectProps = Omit<SelectContextProps, 'itemsComponent'>

export const Select = ({ children, ...props }: SelectProps) => {
  const finder = findElement(children)
  const trigger = finder('Trigger')
  const items = finder('Items')

  return (
    <SelectProvider {...props} itemsComponent={items}>
      {trigger}
    </SelectProvider>
  )
}

Select.displayName = 'Select'
