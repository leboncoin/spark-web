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

        const firstMatchingOption = state.options.find(option => {
          if (option.disabled) {
            return false
          }

          if (state.autoHighlight === 'match') {
            return state
              .getValueText(option)
              .toLowerCase()
              .includes(state.inputDisplayValue.toLowerCase())
          }

          if (state.autoHighlight === 'exactMatch') {
            return (
              state.getValueText(option).toLowerCase() === state.inputDisplayValue.toLowerCase()
            )
          }

          return false
        })

        if (firstMatchingOption) {
          actions.highlightOption(firstMatchingOption)
        } else {
          actions.unsetHighlightedOption()
        }
      }
    },
    clear: () => {
      state.inputDisplayValue = ''
      state.isTyping = false
      state.value = null
      actions.unsetHighlightedOption()
      actions.focusInput()
      state.onValueChange?.(null)
    },
    // Menu
    onBlur: ({ type }: { type: 'mouse' | 'keyboard' }) => {
      state.isTyping = false

      if (state.highlightedOption && state.selectOnBlur && type === 'keyboard') {
        actions.selectHighlightedOption()
      } else if (state.value) {
        console.log('SYNC ON BLUR')
        actions.selectOption(state.value)
        // state.inputDisplayValue = state.getValueText(state.value)
      } else {
        actions.clear()
      }

      actions.closeMenu()
    },
    closeMenu: () => {
      console.log('CLOSE MENU')
      state.isOpen = false
      state.highlightedOption = null
      state.isTyping = false
    },
    openMenu: () => {
      console.log('OPEN MENU')
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
    selectOption: (optionToSelect: string | unknown) => {
      if (!optionToSelect || optionToSelect.disabled) {
        return
      }

      state.inputDisplayValue = state.getValueText(optionToSelect)
      state.onValueChange?.(optionToSelect)
    },
    selectHighlightedOption: () => {
      if (state.highlightedOption) {
        actions.selectOption(state.highlightedOption)
      }
    },
    unsetHighlightedOption: () => {
      state.highlightedOption = null
    },
    highlightOption: (value: string | unknown) => {
      const option = state.options.find(
        option => !option.disabled && state.getValueText(option) === state.getValueText(value)
      )

      if (option) {
        state.highlightedOption = option
      }
    },
    highlightNextOption: () => {
      const startIndex = state.highlightedOptionIndex != null ? state.highlightedOptionIndex + 1 : 0
      const nextInteractiveOption = state.options.slice(startIndex).find(option => !option.disabled)

      if (nextInteractiveOption) {
        state.highlightedOption = nextInteractiveOption
      }
    },
    highlightPreviousOption: () => {
      const startIndex =
        state.highlightedOptionIndex != null
          ? state.highlightedOptionIndex - 1
          : state.options.length - 1
      const previousInteractiveOption = state.options
        .slice(0, startIndex + 1)
        .reverse()
        .find(option => !option.disabled)

      if (previousInteractiveOption) {
        state.highlightedOption = previousInteractiveOption
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
