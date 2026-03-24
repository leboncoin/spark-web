import { RadioGroup } from '@base-ui/react/radio-group'
import { useFormFieldControl } from '@spark-ui/components/form-field'
import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { Children, type ComponentProps, isValidElement, Ref, useRef, useState } from 'react'

import type { SegmentedControlStylesProps } from './SegmentedControl.styles'
import { rootStyles } from './SegmentedControl.styles'
import { SegmentedControlContext } from './SegmentedControlContext'

export interface SegmentedControlProps
  extends Omit<ComponentProps<typeof RadioGroup>, 'value' | 'defaultValue' | 'onValueChange'>,
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
  onValueChange?: (value: string) => void
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

  const handleValueChange = (newValue: unknown) => {
    const next = newValue as string

    if (!isControlled) {
      setInternalValue(next)
    }

    onValueChange?.(next)
  }

  const { labelId, description, isRequired, isInvalid, name } = useFormFieldControl()

  return (
    <SegmentedControlContext.Provider
      value={{
        checkedValue,
        containerRef,
      }}
    >
      <RadioGroup
        ref={mergedRef}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? (defaultValue ?? firstValue ?? undefined) : undefined}
        onValueChange={handleValueChange}
        data-spark-component="segmented-control"
        className={rootStyles({ className })}
        aria-labelledby={labelId}
        aria-describedby={description}
        aria-required={isRequired || undefined}
        aria-invalid={isInvalid || undefined}
        name={name}
        {...rest}
      >
        {children}
      </RadioGroup>
    </SegmentedControlContext.Provider>
  )
}

SegmentedControl.displayName = 'SegmentedControl'
