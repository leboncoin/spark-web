/* eslint-disable max-lines-per-function */
import { v4 as uuidv4 } from 'uuid'
import { proxy } from 'valtio'

import { createStoreActions } from './actions'
import { StoreInitialState, StoreState } from './types'

export * from './types'

export const createStore = (
  {
    value = '',
    options = [],
    state: fieldState = 'idle',
    disabled = false,
    readOnly = false,
    isOpen = false,
    hasPopover = false,
    isLoading = false,
    isTyping = false,
    autoHighlight = 'match',
    selectOnBlur = true,
  }: StoreInitialState,
  refs: {
    menuRef: React.RefObject<HTMLDivElement | null>
    triggerRef: React.RefObject<HTMLDivElement | null>
    inputRef: React.RefObject<HTMLInputElement | null>
  }
) => {
  const inputDisplayValue = options.find(option => option.value === value)?.text

  const storeState = proxy<StoreState>({
    id: uuidv4(),
    value,
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
    // inputDisplayValue: getValueText(value),
    inputDisplayValue: inputDisplayValue ?? '',
    // Computed
    get hasNoSuggestions() {
      return this.options.length === 0
    },
    get highlightedOptionIndex(): number | null {
      return this.options.findIndex(option => option.value === this.highlightedOption)
    },
  })

  const actions = createStoreActions(storeState, refs)

  return { state: storeState, actions, refs }
}
