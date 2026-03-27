import { Radio } from '@base-ui/react/radio'
import { Children, type ComponentProps, Ref } from 'react'

import { itemStyles } from './SegmentedControl.styles'

export interface SegmentedControlItemProps extends Omit<
  ComponentProps<typeof Radio.Root>,
  'value'
> {
  /**
   * A unique value that identifies this item within the segmented control.
   */
  value: string
  /**
   * When true, prevents the user from interacting with this item.
   * @default false
   */
  disabled?: boolean
  ref?: Ref<HTMLElement>
}

export const SegmentedControlItem = ({
  value,
  disabled = false,
  children,
  className,
  ref,
  ...rest
}: SegmentedControlItemProps) => {
  const content = Children.toArray(children).map((child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <span key={`text-${index}`} data-spark-segmented-control-text>
          {child}
        </span>
      )
    }

    return child
  })

  return (
    <Radio.Root
      ref={ref}
      data-spark-component="segmented-control-item"
      data-value={value}
      value={value}
      disabled={disabled}
      className={itemStyles({ className })}
      {...rest}
    >
      {content}
    </Radio.Root>
  )
}

SegmentedControlItem.displayName = 'SegmentedControl.Item'
