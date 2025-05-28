/* eslint-disable max-lines-per-function */
import { Option, StoreState } from './types'

export const createStoreActions = (
  state: StoreState,
  refs: {
    menuRef: React.RefObject<HTMLDivElement | null>
    triggerRef: React.RefObject<HTMLDivElement | null>
    inputRef: React.RefObject<HTMLInputElement | null>
  }
) => {
  const actions = {
    // Input
    typeInputValue: (value: string) => {
      if (!state.isOpen) {
        actions.openMenu()
      }

      actions.setInputDisplayValue(value)
      state.isTyping = true

      if (value === '') {
        actions.clear()
      }
    },
    setInputDisplayValue: (queryValue: string) => {
      state.inputDisplayValue = queryValue

      if (state.highlightedOption != null) {
        const isHighlightedOptionStillInteractive = state.options.some(
          option => option.value === state.highlightedOption?.value && !option.disabled
        )

        if (!isHighlightedOptionStillInteractive) {
          actions.unsetHighlightedOption()
        }
      }

      // Sync autoHighlight
      if (state.autoHighlight !== 'none') {
        if (state.inputDisplayValue === '') {
          actions.unsetHighlightedOption()

          return
        }

        /**
         * As the state.options is updated asynchronously by parsing the children, we need to wait for the next tick to ensure the options are updated in the store.
         */
        requestAnimationFrame(() => {
          const firstMatchingOption = state.options.find(option => {
            if (option.disabled) {
              return false
            }

            if (state.autoHighlight === 'match') {
              return option.text.toLowerCase().includes(state.inputDisplayValue.toLowerCase())
            }

            if (state.autoHighlight === 'exactMatch') {
              return option.text.toLowerCase() === state.inputDisplayValue.toLowerCase()
            }

            return false
          })

          if (firstMatchingOption) {
            actions.highlightOption(firstMatchingOption.value)
          } else {
            actions.unsetHighlightedOption()
          }
        })
      }
    },
    clear: () => {
      state.inputDisplayValue = ''
      state.isTyping = false
      state.value = undefined
      actions.unsetHighlightedOption()
      actions.focusInput()
    },
    // Menu
    onBlur: ({ type }: { type: 'mouse' | 'keyboard' }) => {
      state.isTyping = false

      if (state.highlightedOption && state.selectOnBlur && type === 'keyboard') {
        actions.selectHighlightedOption()
      } else if (state.value) {
        actions.selectOption(state.value)
      } else {
        actions.clear()
      }

      actions.closeMenu()
    },
    closeMenu: () => {
      state.isOpen = false
      state.highlightedOption = null
      state.isTyping = false
    },
    openMenu: () => {
      if (state.disabled) {
        return
      }

      state.isOpen = true
      actions.focusInput()

      if (state.value) {
        state.highlightedOption = state.value
      }
    },
    toggleMenu: () => {
      if (state.disabled) {
        return
      }

      actions.focusInput()

      if (!state.isOpen) {
        actions.openMenu()
      } else {
        actions.closeMenu()
      }
    },
    focusInput: () => {
      requestAnimationFrame(() => {
        refs.inputRef.current?.focus()
      })
    },
    // Options
    selectOption: (optionToSelect: string | undefined) => {
      const option = state.options.find(option => option.value === optionToSelect)

      if (!option || option.disabled) {
        return
      }

      state.inputDisplayValue = option.text
      state.value = optionToSelect
    },
    selectHighlightedOption: () => {
      if (state.highlightedOption) {
        actions.selectOption(state.highlightedOption)
      }
    },
    unsetHighlightedOption: () => {
      state.highlightedOption = null
    },
    highlightOption: (value: string | null) => {
      state.highlightedOption = value
    },
    highlightNextOption: () => {
      const startIndex = state.highlightedOptionIndex != null ? state.highlightedOptionIndex + 1 : 0
      const match = state.options.slice(startIndex).find(option => !option.disabled)

      if (match) {
        state.highlightedOption = match.value
      }
    },
    highlightPreviousOption: () => {
      const startIndex =
        state.highlightedOptionIndex != null
          ? state.highlightedOptionIndex - 1
          : state.options.length - 1
      const match = state.options
        .slice(0, startIndex + 1)
        .reverse()
        .find(option => !option.disabled)

      if (match) {
        state.highlightedOption = match.value
      }
    },
    setOptions: (options: Option[]) => {
      state.options = options
    },
    setHasPopover: (hasPopover: boolean) => {
      state.hasPopover = hasPopover
    },
  }

  return actions
}
