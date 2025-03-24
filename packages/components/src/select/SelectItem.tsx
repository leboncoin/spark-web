import { type Ref } from 'react'

export interface ItemProps {
  disabled?: boolean
  value: string
  children: string
  ref?: Ref<HTMLOptionElement>
}

export const Item = ({ disabled = false, value, children, ref: forwardedRef }: ItemProps) => {
  return (
    <option
      data-spark-component="select-item"
      ref={forwardedRef}
      key={value}
      value={value}
      disabled={disabled}
      // label
    >
      {children}
    </option>
  )
}

Item.displayName = 'Select.Item'
