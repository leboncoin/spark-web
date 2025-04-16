export type InputValue = string
export type State = 'idle' | 'error' | 'alert' | 'success'
export interface Option {
  value: string
  text: string
  disabled?: boolean
}

export interface StoreState {
  /**
   * The selected option
   */
  value: string | null
  inputDisplayValue: string
  options: Option[]
  state: State
  disabled: boolean
  readOnly: boolean
  isOpen: boolean
  isTyping: boolean
  hasPopover: boolean
  isLoading: boolean
  highlightedOption: string | null
  hasNoSuggestions: boolean
  highlightedOptionIndex: number | null
  id: string
  /**
   * Filter behavior to target the first matching option and highlight it.
   * A function can be used to customize the matching logic.
   */
  autoHighlight: 'none' | 'match' | 'exactMatch'
  /**
   * If true, the highlighted option will be selected when the focus leaves the input.
   */
  selectOnBlur: boolean
}

export interface StoreInitialState {
  value?: string | null
  options?: Option[]
  state?: State
  disabled?: boolean
  readOnly?: boolean
  isOpen?: boolean
  isTyping?: boolean
  hasPopover?: boolean
  isLoading?: boolean
  autoHighlight?: 'none' | 'match' | 'exactMatch'

  selectOnBlur?: boolean
}
