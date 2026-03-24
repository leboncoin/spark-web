import { ToggleGroup } from '@base-ui/react/toggle-group'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { Children, type ComponentProps, isValidElement, Ref, useRef, useState } from 'react'

import type { SegmentedControlStylesProps } from './SegmentedControl.styles'
import { rootStyles } from './SegmentedControl.styles'
import { SegmentedControlContext } from './SegmentedControlContext'

export interface SegmentedControlProps
  extends Omit<
      ComponentProps<typeof ToggleGroup>,
      'multiple' | 'value' | 'defaultValue' | 'onValueChange'
    >,
    SegmentedControlStylesProps {
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
  onValueChange?: (value: string | null) => void
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
  size = 'md',
  className,
  children,
  ref,
  ...rest
}: SegmentedControlProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [internalValue, setInternalValue] = useState<string | null>(
    () => defaultValue ?? getFirstItemValue(children)
  )

  const isControlled = value !== undefined
  const pressedValue = isControlled ? (value ?? null) : internalValue

  const handleValueChange = (newValues: unknown[]) => {
    const next = (newValues[0] as string) ?? null

    if (!isControlled) {
      setInternalValue(next)
    }

    onValueChange?.(next)
  }

  const mergedRef = useMergeRefs(containerRef, ref)
  const groupValue = pressedValue != null ? [pressedValue] : []

  return (
    <SegmentedControlContext.Provider
      value={{
        pressedValue,
        containerRef,
        size: size ?? 'md',
      }}
    >
      <ToggleGroup
        ref={mergedRef}
        multiple={false}
        value={groupValue}
        onValueChange={handleValueChange}
        data-spark-component="segmented-control"
        className={rootStyles({ className })}
        {...rest}
      >
        {children}
      </ToggleGroup>
    </SegmentedControlContext.Provider>
  )
}

SegmentedControl.displayName = 'SegmentedControl'
