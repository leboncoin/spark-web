import { screen, within } from '@testing-library/react'

export const getInput = (accessibleName: string) => {
  return screen.getByRole('combobox', { name: accessibleName })
}

export const getListbox = (accessibleName: string) => {
  return screen.getByRole('listbox', { name: accessibleName })
}

export const getItemsGroup = (accessibleName: string) => {
  return screen.getByRole('group', { name: accessibleName })
}

export const getItem = (accessibleName: string) => {
  return screen.getByRole('option', { name: accessibleName })
}

export const queryItem = (accessibleName: string) => {
  return screen.queryByRole('option', { name: accessibleName })
}

export const getSelectedItem = (accessibleName: string) => {
  const selectedItemDivs = screen.queryAllByRole('presentation')

  const matchingItem = selectedItemDivs.find(item => {
    return within(item).queryByText(accessibleName)
  })

  return matchingItem || (null as any as HTMLElement)
}

export const getSelectedItemClearButton = (accessibleName: string) => {
  const selectedItem = getSelectedItem(accessibleName)

  return within(selectedItem as HTMLElement).getByRole('button', { hidden: true })
}

export const getClearButton = (accessibleName: string) => {
  return screen.getByRole('button', { name: accessibleName })
}
