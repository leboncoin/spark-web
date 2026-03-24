import { Radio } from '@base-ui/react/radio'
import { type ComponentProps, Ref } from 'react'

import { itemStyles } from './SegmentedControl.styles'

export interface SegmentedControlItemProps
  extends Omit<ComponentProps<typeof Radio.Root>, 'value'> {
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
      {children}
      <span
        aria-hidden="true"
        className="bg-success pointer-events-none h-0 overflow-hidden font-bold content-[attr(data-text)/'']"
      >
        {children}
      </span>
    </Radio.Root>
  )
}

SegmentedControlItem.displayName = 'SegmentedControl.Item'
