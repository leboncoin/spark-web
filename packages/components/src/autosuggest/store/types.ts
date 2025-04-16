export type InputValue = string
export type State = 'idle' | 'error' | 'alert' | 'success'
export interface Option {
  value: string | unknown
  disabled?: boolean
}

interface OutsideCallbacks {
  onValueChange?: (value: unknown) => void
  onOpenChange?: (isOpen: boolean) => void
  // TODO: onOpenChange
}

export interface StoreState extends OutsideCallbacks {
  /**
   * The selected option
   */
  value: unknown | string
  inputDisplayValue: string
  getValueText: (option: Option) => string
  options: Option[]
  state: State
  disabled: boolean
  readOnly: boolean
  isOpen: boolean
  isTyping: boolean
  hasPopover: boolean
  isLoading: boolean
  highlightedOption: Option | null
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

export interface StoreInitialState extends OutsideCallbacks {
  value?: unknown | string
  getValueText?: (option: Option) => string
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
