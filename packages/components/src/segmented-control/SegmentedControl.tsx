import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import {
  Children,
  type ComponentProps,
  CSSProperties,
  isValidElement,
  Ref,
  useRef,
  useState,
} from 'react'

import type { SegmentedControlStylesProps } from './SegmentedControl.styles'
import { rootStyles } from './SegmentedControl.styles'
import { SegmentedControlContext } from './SegmentedControlContext'
import { useSegmentedControlNavigation } from './useSegmentedControlNavigation'

export interface SegmentedControlProps
  extends Omit<ComponentProps<'div'>, 'onValueChange'>, SegmentedControlStylesProps {
  /**
   * The controlled selected value.
   */
  value?: string
  /**
   * The uncontrolled default selected value.
   */
  defaultValue?: string
  /**
   * Callback fired when the selected value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * Number of items per row in multi-row layout.
   * When undefined, items display in a single row (default behavior).
   * @default undefined
   * @example
   * // Create 3-column grid with wrapping rows
   * <SegmentedControl rowLength={3}>
   */
  rowLength?: number
  /**
   * The name attribute for the radio group (used in form submissions).
   */
  name?: string
  ref?: Ref<HTMLDivElement>
}

const getFirstItemValue = (children: React.ReactNode): string | null => {
  let firstValue: string | null = null

  Children.forEach(children, child => {
    if (firstValue !== null) return
    if (isValidElement(child) && typeof (child.props as { value?: string }).value === 'string') {
      firstValue = (child.props as { value: string }).value
    }
  })

  return firstValue
}

export const SegmentedControl = ({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  rowLength,
  name: nameProp,
  ref,
  ...rest
}: SegmentedControlProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mergedRef = useMergeRefs(containerRef, ref)

  const firstValue = getFirstItemValue(children)

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string | null>(
    () => defaultValue ?? firstValue
  )
  const checkedValue = isControlled ? (value ?? null) : internalValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }

    onValueChange?.(newValue)
  }

  const { labelId, description, isRequired, isInvalid, name: nameFromField } = useFormFieldControl()
  const name = nameProp ?? nameFromField

  // Get all item values in order
  const itemValues: string[] = []
  Children.forEach(children, child => {
    if (isValidElement(child) && typeof (child.props as { value?: string }).value === 'string') {
      itemValues.push((child.props as { value: string }).value)
    }
  })

  // Keyboard navigation (sequential left/right)
  const { handleKeyDown } = useSegmentedControlNavigation({
    itemValues,
    containerRef,
    onValueChange: handleValueChange,
  })

  // Compute dynamic flex styles for multi-row layout
  const flexStyles = rowLength
    ? ({
        '--segmented-control-cols': rowLength,
        rowGap: 'var(--spacing-md)',
      } as CSSProperties)
    : undefined

  return (
    <SegmentedControlContext
      value={{
        checkedValue,
        containerRef,
        onValueChange: handleValueChange,
        name,
        rowLength,
        itemValues,
      }}
    >
      <div
        ref={mergedRef}
        role="radiogroup"
        data-spark-component="segmented-control"
        className={rootStyles({ className })}
        style={flexStyles}
        aria-labelledby={labelId}
        aria-describedby={description}
        aria-required={isRequired || undefined}
        aria-invalid={isInvalid || undefined}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    </SegmentedControlContext>
  )
}

SegmentedControl.displayName = 'SegmentedControl'
