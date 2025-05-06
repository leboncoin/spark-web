/* eslint-disable max-lines-per-function */
import { v4 as uuidv4 } from 'uuid'
import { proxy } from 'valtio'

import { createStoreActions } from './actions'
import { StoreInitialState, StoreState } from './types'

export * from './types'

export const createStore = (
  {
    value = '',
    getValueText = (option: any) => option.value,
    onValueChange,
    onOpenChange,
    options = [],
    state: fieldState = 'idle',
    disabled = false,
    readOnly = false,
    isOpen = false,
    hasPopover = false,
    isLoading = false,
    isTyping = false,
    autoHighlight = 'none',
    selectOnBlur = false,
  }: StoreInitialState,
  refs: {
    menuRef: React.RefObject<HTMLDivElement | null>
    triggerRef: React.RefObject<HTMLDivElement | null>
    inputRef: React.RefObject<HTMLInputElement | null>
  }
) => {
  const storeState = proxy<StoreState>({
    id: uuidv4(),
    value,
    getValueText,
    onValueChange,
    onOpenChange,
    options,
    highlightedOption: null,
    state: fieldState,
    disabled,
    readOnly,
    isOpen,
    isTyping,
    hasPopover,
    isLoading,
    autoHighlight,
    selectOnBlur,
    inputDisplayValue: getValueText(value),
    // Computed
    get hasNoSuggestions() {
      return this.options.length === 0
    },
    get highlightedOptionIndex(): number | null {
      return this.options.findIndex(option => option.value === this.highlightedOption?.value)
    },
  })

  const actions = createStoreActions(storeState, refs)

  return { state: storeState, actions, refs }
}
