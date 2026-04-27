import { type Ref, useEffect } from 'react'

import { useSelectContext } from './SelectContext'

export interface PlaceholderProps {
  disabled?: boolean
  children: string
  ref?: Ref<HTMLOptionElement>
}

/**
 * Placeholder text shown when no item is selected. Renders a <span> element.
 */

export const Placeholder = ({
  disabled = false,
  children,
  ref: forwardedRef,
}: PlaceholderProps) => {
  const { setPlaceholder } = useSelectContext()

  useEffect(() => {
    setPlaceholder(children)
  }, [children])

  return (
    <option
      data-spark-component="select-placeholder"
      ref={forwardedRef}
      key="placeholder"
      value=""
      disabled={disabled}
    >
      {children}
    </option>
  )
}

Placeholder.displayName = 'Select.Placeholder'
