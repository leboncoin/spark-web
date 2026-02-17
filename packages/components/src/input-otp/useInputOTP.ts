/* eslint-disable max-lines-per-function */
import { useFormFieldControl } from '@spark-ui/components/form-field'
import {
  ChangeEventHandler,
  ClipboardEventHandler,
  KeyboardEventHandler,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import type { InputOTPContextValue } from './InputOTPContext'

const BACKSPACE_KEY = 'Backspace'
const LEFT_ARROW_KEY = 'ArrowLeft'
const UP_ARROW_KEY = 'ArrowUp'
const RIGHT_ARROW_KEY = 'ArrowRight'
const DOWN_ARROW_KEY = 'ArrowDown'
const E_KEY = 'e'

export interface UseInputOTPProps {
  maxLength: number
  type: 'text' | 'number' | 'password' | 'tel'
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
  isValid: boolean
  disabledProp: boolean
  readOnlyProp: boolean
  autoFocus: boolean
  forceUppercase: boolean
  filterKeys: string[]
  pattern?: string
  placeholder: string
  nameProp?: string
}

export interface UseInputOTPReturn {
  uuid: string
  inputRef: React.RefObject<HTMLInputElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  name: string | undefined
  disabled: boolean
  readOnly: boolean
  isInvalid: boolean
  isRequired: boolean
  description: string | undefined
  maxLength: number
  intent: 'neutral' | 'success' | 'alert' | 'error'
  currentValue: string
  activeIndex: number
  slots: {
    char: string
    isActive: boolean
    hasFakeCaret: boolean
  }[]
  contextValue: InputOTPContextValue
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>
  handleCopy: ClipboardEventHandler<HTMLInputElement>
  handlePaste: ClipboardEventHandler<HTMLInputElement>
  handleFocus: () => void
  handleBlur: () => void
  handleClick: () => void
  labelId: string | undefined
}

export const useInputOTP = ({
  maxLength,
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  isValid,
  disabledProp,
  readOnlyProp,
  autoFocus,
  forceUppercase,
  filterKeys,
  pattern,
  placeholder,
  nameProp,
}: UseInputOTPProps): UseInputOTPReturn => {
  const uuid = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get FormField context (optional, falls back gracefully if not present)
  const field = useFormFieldControl()

  // Use FormField values if available, otherwise fall back to props
  // Use FormField id when available so label htmlFor works correctly
  const id = field.id ?? uuid
  const name = nameProp ?? field.name
  const disabled = field.disabled ?? disabledProp
  const readOnly = field.readOnly ?? readOnlyProp
  const isInvalid = field.isInvalid ?? !isValid
  const isRequired = field.isRequired ?? false
  const labelId = field.labelId
  const description = field.description
  const fieldState = field.state

  // Determine intent based on FormField state or isValid prop
  const getIntent = (): 'neutral' | 'success' | 'alert' | 'error' => {
    // FormField state takes priority
    if (['success', 'alert', 'error'].includes(fieldState ?? '')) {
      return fieldState as 'success' | 'alert' | 'error'
    }

    // Fallback to isValid prop for backward compatibility
    if (isInvalid) {
      return 'error'
    }

    return 'neutral'
  }

  const intent = getIntent()

  // Initialize value
  const initialValue = controlledValue !== undefined ? controlledValue : defaultValue
  const processedValue = forceUppercase ? initialValue.toUpperCase() : initialValue

  const [internalValue, setInternalValue] = useState<string>(processedValue)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue

  // Calculate active index: last empty slot, or last slot if all are filled
  const activeIndex = Math.min(currentValue.length, maxLength - 1)

  // Sync cursor position with active index
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(activeIndex, activeIndex)
    }
  }, [activeIndex, currentValue.length, maxLength])

  // Create slots array
  const slots = useMemo(
    () =>
      Array.from({ length: maxLength }, (_, i) => ({
        char: currentValue[i] || '',
        isActive: i === activeIndex && isFocused,
        hasFakeCaret: i === activeIndex && !currentValue[i] && !disabled && !readOnly && isFocused,
      })),
    [maxLength, currentValue, activeIndex, isFocused, disabled, readOnly]
  )

  // Sync controlled value with input ref
  useEffect(() => {
    if (inputRef.current && controlledValue !== undefined) {
      inputRef.current.value = controlledValue
    }
  }, [controlledValue])

  // Focus management
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const processInputValue = (inputValue: string): string => {
    let processed = inputValue

    if (forceUppercase) {
      processed = processed.toUpperCase()
    }

    if (type === 'number') {
      processed = processed.replace(/[^\d]/g, '')
    }

    // Filter characters using pattern if provided
    if (pattern) {
      try {
        // Convert HTML pattern (string) to RegExp
        // HTML patterns validate the entire string, but we need to test each character
        // We create a regex that tests if a single character matches the pattern
        // For example: [0-9]* becomes ^[0-9]$ to test a single digit
        // We wrap the pattern in ^...$ to ensure it matches a single character
        let regexPattern = pattern
        // If pattern doesn't start with ^, wrap it to test single character
        if (!pattern.startsWith('^')) {
          regexPattern = `^${pattern}$`
        }
        const regex = new RegExp(regexPattern)
        processed = processed
          .split('')
          .filter(currChar => {
            // Test if the character matches the pattern
            return regex.test(currChar)
          })
          .join('')
      } catch (error) {
        // If pattern is invalid, ignore it and continue with other filters
        console.error('Invalid pattern provided to InputOTP:', pattern, error)
      }
    }

    return processed
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (disabled || readOnly) return

    const inputValue = e.target.value
    const processedValue = processInputValue(inputValue)

    // Limit to maxLength
    const newValue = processedValue.slice(0, maxLength)

    // Call onValueChange callback first (before updating state)
    if (onValueChange) {
      onValueChange(newValue)
    }

    // Update state only in uncontrolled mode
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }

    // Active index is automatically calculated based on value length
    // Sync cursor position
    const newActiveIndex = Math.min(newValue.length, maxLength - 1)
    if (inputRef.current) {
      inputRef.current.setSelectionRange(newActiveIndex, newActiveIndex)
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (disabled || readOnly) return

    // Allow copy/cut/paste/selectAll shortcuts even when key is in filterKeys
    const isShortcut =
      (e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())

    // Filter keys
    if (filterKeys.length > 0 && filterKeys.includes(e.key) && !isShortcut) {
      e.preventDefault()

      return
    }

    switch (e.key) {
      case BACKSPACE_KEY:
        e.preventDefault()
        const currentLength = currentValue.length
        if (currentLength > 0) {
          const newValue = currentValue.slice(0, currentLength - 1)

          // Call onValueChange first
          if (onValueChange) {
            onValueChange(newValue)
          }

          // Update state only in uncontrolled mode
          if (controlledValue === undefined) {
            setInternalValue(newValue)
          }

          // Active index is automatically calculated based on value length
          // Sync cursor position
          const newActiveIndex = Math.max(0, newValue.length)
          if (inputRef.current) {
            inputRef.current.setSelectionRange(newActiveIndex, newActiveIndex)
          }
        }
        break

      case LEFT_ARROW_KEY:
      case RIGHT_ARROW_KEY:
        // Prevent navigation with arrow keys - focus stays on last empty slot
        e.preventDefault()
        break

      case UP_ARROW_KEY:
      case DOWN_ARROW_KEY:
        e.preventDefault()
        break

      case E_KEY:
      case 'E':
        // Prevent 'e' or 'E' in number inputs
        if (type === 'number') {
          e.preventDefault()
        }
        break

      default:
        break
    }
  }

  const handleCopy: ClipboardEventHandler<HTMLInputElement> = e => {
    if (disabled) return

    e.preventDefault()
    if (currentValue.length > 0) {
      e.clipboardData.setData('text/plain', currentValue)
    }
  }

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
    if (disabled || readOnly) return

    e.preventDefault()

    const pastedText = e.clipboardData.getData('text')

    if (!pastedText) return

    const processedText = processInputValue(pastedText)
    const newValue = processedText.slice(0, maxLength)

    // Call onValueChange callback first (before updating state)
    if (onValueChange) {
      onValueChange(newValue)
    }

    // Update state only in uncontrolled mode
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }

    // Active index is automatically calculated based on value length
    // Move cursor to end
    const newActiveIndex = Math.min(newValue.length, maxLength - 1)
    if (inputRef.current) {
      inputRef.current.setSelectionRange(newActiveIndex, newActiveIndex)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (inputRef.current) {
      // Focus on last empty slot, or last slot if all are filled
      const cursorPosition = Math.min(currentValue.length, maxLength - 1)
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const contextValue: InputOTPContextValue = {
    value: currentValue,
    maxLength,
    slots,
    activeIndex,
    intent,
    disabled,
    readOnly,
    placeholder,
    type,
  }

  const returnValue: UseInputOTPReturn = {
    uuid: id,
    inputRef,
    containerRef,
    name,
    disabled,
    readOnly,
    isInvalid,
    isRequired,
    description,
    maxLength,
    intent,
    currentValue,
    activeIndex,
    slots,
    contextValue,
    handleChange,
    handleKeyDown,
    handleCopy,
    handlePaste,
    handleFocus,
    handleBlur,
    handleClick,
    labelId,
  }

  return returnValue
}
