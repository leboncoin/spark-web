/* eslint-disable max-lines-per-function */
import { cx } from 'class-variance-authority'
import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
  useMemo,
} from 'react'

import { InputOTPContext } from './InputOTPContext'
import { InputOTPSlot } from './InputOTPSlot'
import { useInputOTP } from './useInputOTP'

/**
 * Counts the number of InputOTPSlot components in the children tree
 */
const countSlots = (children: ReactNode): number => {
  let count = 0

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      const props = child.props as { children?: ReactNode }
      // Check if it's an InputOTPSlot by checking displayName
      if (
        child.type === InputOTPSlot ||
        (child.type as { displayName?: string })?.displayName === 'InputOTP.Slot'
      ) {
        count++
      } else if (props.children) {
        // Recursively count slots in nested children (e.g., inside InputOTPGroup)
        count += countSlots(props.children)
      }
    }
  })

  return count
}

/**
 * Recursively assigns index to InputOTPSlot components
 * Returns a tuple of [processedChildren, nextIndex]
 */
const assignSlotIndexes = (children: ReactNode, startIndex: number = 0): [ReactNode, number] => {
  let currentIndex = startIndex

  const processed = Children.map(children, child => {
    if (isValidElement(child)) {
      const props = child.props as { index?: number; children?: ReactNode }
      // Check if it's an InputOTPSlot
      if (
        child.type === InputOTPSlot ||
        (child.type as { displayName?: string })?.displayName === 'InputOTP.Slot'
      ) {
        // Only assign index if not already provided
        const slotIndex = typeof props.index === 'number' ? props.index : currentIndex++

        return cloneElement(child as ReactElement<{ index?: number }>, {
          ...props,
          index: slotIndex,
        })
      } else if (props.children) {
        // Recursively process nested children
        const [processedChildren, nextIndex] = assignSlotIndexes(props.children, currentIndex)
        currentIndex = nextIndex

        return cloneElement(child, {
          ...(child.props as Record<string, unknown>),
          children: processedChildren,
        } as Parameters<typeof cloneElement>[1])
      }
    }

    return child
  })

  return [processed, currentIndex]
}

export interface InputOTPProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'inputMode'> {
  /**
   * Maximum length of the input value.
   * If not provided, will be automatically detected from the number of InputOTP.Slot children.
   */
  maxLength?: number
  /**
   * Type of input
   * @default 'text'
   */
  type?: 'text' | 'number' | 'password' | 'tel'
  /**
   * Current value (controlled mode)
   */
  value?: string
  /**
   * Default value (uncontrolled mode)
   */
  defaultValue?: string
  /**
   * Callback fired when the value changes
   */
  onValueChange?: (value: string) => void
  /**
   * Whether the input is valid
   * @default true
   */
  isValid?: boolean
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether to auto-focus the input
   * @default false
   */
  autoFocus?: boolean
  /**
   * Auto-complete attribute
   * @default 'off'
   */
  autoComplete?: string
  /**
   * Whether to force uppercase
   * @default false
   */
  forceUppercase?: boolean
  /**
   * Array of keys to filter out (using KeyboardEvent.key values)
   * @default ['-', '.']
   */
  filterKeys?: string[]
  /**
   * Pattern attribute for input validation and character filtering.
   * Uses a regular expression to filter allowed characters in real-time.
   * For example: "[0-9]" for digits only, "[a-c]" for letters a, b, c only.
   */
  pattern?: string
  /**
   * Input mode attribute
   */
  inputMode?: string
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Name attribute for form integration
   */
  name?: string
  /**
   * Children components (InputOTPGroup, InputOTPSlot, InputOTPSeparator)
   */
  children: ReactNode
  /**
   * Ref callback for the container
   */
  ref?: Ref<HTMLDivElement>
}

export const InputOTP = ({
  maxLength: maxLengthProp,
  type = 'text',
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  isValid = true,
  disabled: disabledProp = false,
  autoFocus = false,
  autoComplete = 'off',
  forceUppercase = false,
  filterKeys = ['-', '.'],
  pattern,
  inputMode,
  placeholder = '',
  name: nameProp,
  className,
  children,
  ...others
}: InputOTPProps) => {
  // Auto-detect maxLength from children if not provided
  const maxLength = useMemo(() => {
    if (maxLengthProp !== undefined) {
      return maxLengthProp
    }

    const detectedLength = countSlots(children)

    return detectedLength > 0 ? detectedLength : 4 // fallback to 4 if no slots found
  }, [maxLengthProp, children])

  // Assign indexes to slots automatically
  const processedChildren = useMemo(() => {
    const [processed] = assignSlotIndexes(children)

    return processed
  }, [children])

  // Use the hook for all business logic
  const {
    uuid,
    inputRef,
    containerRef,
    name,
    disabled,
    isInvalid,
    isRequired,
    description,
    currentValue,
    contextValue,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleFocus,
    handleBlur,
    handleClick,
    labelId,
  } = useInputOTP({
    maxLength,
    type,
    value: controlledValue,
    defaultValue,
    onValueChange,
    isValid,
    disabledProp,
    autoFocus,
    forceUppercase,
    filterKeys,
    pattern,
    placeholder,
    nameProp,
  })

  // Extract aria-label from others if provided (for cases without FormField)
  const ariaLabel =
    'aria-label' in others ? (others['aria-label'] as string | undefined) : undefined
  const { 'aria-label': _, ...restOthers } = others

  // Determine accessible name props
  const getAccessibleNameProps = (): Record<string, string | undefined> => {
    if (labelId) {
      return { 'aria-labelledby': labelId }
    }

    if (ariaLabel) {
      return { 'aria-label': ariaLabel }
    }

    return {}
  }

  const accessibleNameProps = getAccessibleNameProps()

  return (
    <InputOTPContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        data-spark-component="input-otp"
        role="group"
        {...accessibleNameProps}
        {...(description ? { 'aria-describedby': description } : {})}
        className={cx(
          'gap-md relative inline-flex items-center',
          disabled ? 'cursor-not-allowed' : 'cursor-text',
          className
        )}
        onClick={handleClick}
        {...restOthers}
      >
        {/* Hidden input for form submission with complete value */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue}
            required={isRequired}
            aria-invalid={isInvalid}
            {...accessibleNameProps}
          />
        )}
        {/* Actual input that handles all interactions */}
        <input
          ref={inputRef}
          id={uuid}
          type={type === 'password' ? 'password' : 'text'}
          value={currentValue}
          maxLength={maxLength}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled}
          pattern={pattern}
          inputMode={inputMode as React.InputHTMLAttributes<HTMLInputElement>['inputMode']}
          {...accessibleNameProps}
          {...(description ? { 'aria-describedby': description } : {})}
          aria-invalid={isInvalid}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="bg-success z-raised absolute inset-0 m-0 p-0 opacity-0 disabled:cursor-not-allowed"
          tabIndex={0}
        />
        {/* Children render slots with auto-assigned indexes */}
        {processedChildren}
      </div>
    </InputOTPContext.Provider>
  )
}

InputOTP.displayName = 'InputOTP'
