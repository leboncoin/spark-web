import { Toggle } from '@base-ui/react/toggle'
import { type ComponentProps, Ref } from 'react'

import { itemStyles } from './SegmentedControl.styles'
import { useSegmentedControlContext } from './SegmentedControlContext'

export interface SegmentedControlItemProps extends Omit<ComponentProps<typeof Toggle>, 'value'> {
  /**
   * A unique value that identifies this item within the segmented control.
   */
  value: string
  /**
   * When true, prevents the user from interacting with this item.
   * @default false
   */
  disabled?: boolean
  ref?: Ref<HTMLButtonElement>
}

export const SegmentedControlItem = ({
  value,
  disabled = false,
  children,
  className,
  ref,
  ...rest
}: SegmentedControlItemProps) => {
  const { size } = useSegmentedControlContext()

  return (
    <Toggle
      ref={ref}
      data-spark-component="segmented-control-item"
      data-value={value}
      value={value}
      disabled={disabled}
      className={itemStyles({ size, className })}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="bg-success pointer-events-none h-0 overflow-hidden font-bold content-[attr(data-text)/'']"
      >
        {children}
      </span>
    </Toggle>
  )
}

SegmentedControlItem.displayName = 'SegmentedControl.Item'
