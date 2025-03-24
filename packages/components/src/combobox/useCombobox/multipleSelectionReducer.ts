import { useCombobox, UseComboboxProps, UseMultipleSelectionReturnValue } from 'downshift'
import { RefObject } from 'react'

import { ComboboxItem, ItemsMap } from '../types'
import { getIndexByKey } from '../utils'

interface Props {
  allowCustomValue?: boolean
  items: ItemsMap
  selectedItems: ComboboxItem[]
  multiselect: UseMultipleSelectionReturnValue<ComboboxItem>
  setSelectedItems: (items: ComboboxItem[]) => void
  triggerAreaRef: RefObject<HTMLDivElement | null>
}

export const multipleSelectionReducer = ({
  multiselect,
  selectedItems,
  allowCustomValue = false,
  setSelectedItems,
  triggerAreaRef,
  items,
}: Props) => {
  const reducer: UseComboboxProps<ComboboxItem>['stateReducer'] = (_, { changes, type }) => {
    const isFocusInsideTriggerArea = triggerAreaRef.current?.contains?.(document.activeElement)

    switch (type) {
      case useCombobox.stateChangeTypes.InputClick:
        return {
          ...changes,
          isOpen: true, // keep menu opened
        }
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
      case useCombobox.stateChangeTypes.ItemClick: {
        const newState = { ...changes }

        if (changes.selectedItem != null) {
          newState.inputValue = '' // keep input value after selection
          newState.isOpen = true // keep menu opened after selection

          const highlightedIndex = getIndexByKey(items, changes.selectedItem.value)

          newState.highlightedIndex = highlightedIndex // preserve highlighted item index after selection

          const isAlreadySelected = multiselect.selectedItems.some(
            selectedItem => selectedItem.value === changes.selectedItem?.value
          )

          const updatedItems = isAlreadySelected
            ? selectedItems.filter(item => item.value !== changes.selectedItem?.value)
            : [...selectedItems, changes.selectedItem]

          setSelectedItems(updatedItems)
        }

        return newState
      }

      case useCombobox.stateChangeTypes.ToggleButtonClick:
        return {
          ...changes,
          inputValue: allowCustomValue ? changes.inputValue : '',
        }
      case useCombobox.stateChangeTypes.InputChange:
        return {
          ...changes,
          selectedItem: changes.highlightedIndex === -1 ? null : changes.selectedItem,
        }
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          inputValue: allowCustomValue ? changes.inputValue : '',
          isOpen: isFocusInsideTriggerArea,
        }

      default:
        return changes
    }
  }

  return reducer
}
