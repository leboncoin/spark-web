import { useCombobox, UseComboboxProps } from 'downshift'

import { ComboboxItem } from '../types'

interface Props {
  allowCustomValue?: boolean
  filteredItems: ComboboxItem[]
  setSelectedItem: (value: ComboboxItem | null) => void
}

export const singleSelectionReducer = ({
  filteredItems,
  allowCustomValue = false,
  setSelectedItem,
}: Props) => {
  const reducer: UseComboboxProps<ComboboxItem>['stateReducer'] = (state, { changes, type }) => {
    const exactMatch = filteredItems.find(
      item => item.text.toLowerCase() === state.inputValue.toLowerCase()
    )

    switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEscape:
        if (!changes.selectedItem) {
          setSelectedItem(null)
        }

        return changes
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
        if (changes.selectedItem) {
          setSelectedItem(changes.selectedItem)
        }

        return changes
      case useCombobox.stateChangeTypes.InputClick:
        return { ...changes, isOpen: true }
      case useCombobox.stateChangeTypes.ToggleButtonClick:
      case useCombobox.stateChangeTypes.InputBlur:
        if (allowCustomValue) return changes

        if (state.inputValue === '') {
          setSelectedItem(null)

          return { ...changes, selectedItem: null }
        }

        if (exactMatch) {
          setSelectedItem(exactMatch)

          return { ...changes, selectedItem: exactMatch, inputValue: exactMatch.text }
        }

        if (state.selectedItem) {
          return { ...changes, inputValue: state.selectedItem.text }
        }

        return { ...changes, inputValue: '' }
      default:
        return changes
    }
  }

  return reducer
}
