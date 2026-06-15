import { Toggle } from '@base-ui/react/toggle'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface ToggleGroupToggleProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * A unique value that identifies the toggle within the group.
   */
  value: any
  /**
   * Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  /**
   * When true, prevents the user from interacting with the toggle.
   * @default false
   */
  disabled?: boolean
  ref?: Ref<HTMLButtonElement>
}

/** A toggle button within a toggle group. Renders a <button> element. */
export const ToggleGroupToggle = ({
  /**
   * Default Base UI Primitive values
   * see https://base-ui.com/react/components/toggle
   */
  asChild = false,
  value,
  disabled = false,
  children,
  className,
  ref,
  ...rest
}: ToggleGroupToggleProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <Toggle
      data-spark-component="toggle-group-toggle"
      ref={ref}
      className={cx(
        'focus-visible:u-outline-inset',
        'disabled:cursor-not-allowed disabled:opacity-dim-3',
        className
      )}
      {...(asChild && { render: renderSlot })}
      disabled={disabled}
      value={value}
      {...rest}
    >
      {children}
    </Toggle>
  )
}

ToggleGroupToggle.displayName = 'ToggleGroup.Toggle'
