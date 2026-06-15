import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef, type PropsWithChildren, Ref } from 'react'

import { useRenderSlot } from './useRenderSlot'

export interface ToggleGroupProps extends PropsWithChildren, ComponentPropsWithoutRef<'div'> {
  /**
   * Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.
   * @default false
   */
  asChild?: boolean
  /**
   * Whether multiple toggles can be pressed at the same time.
   * @default false
   */
  multiple?: boolean
  /**
   * The default value(s) of the toggle group when it is initially rendered.
   * Use when you do not need to control its value(s).
   * Must be an array even for single selection mode.
   */
  defaultValue?: readonly any[]
  /**
   * The controlled value(s) of the toggle group.
   * Must be used in conjunction with `onValueChange`.
   * Must be an array even for single selection mode.
   */
  value?: readonly any[]
  /**
   * Event handler called when the value changes.
   * Always receives an array, even for single selection mode.
   */
  onValueChange?: (value: readonly any[]) => void
  ref?: Ref<HTMLDivElement>
}

export const ToggleGroup = ({
  /**
   * Default Base UI Primitive values
   * see https://base-ui.com/react/components/toggle-group
   */
  asChild = false,
  multiple = false,
  children,
  className,
  ref,
  ...rest
}: ToggleGroupProps) => {
  const renderSlot = useRenderSlot(asChild)

  return (
    <BaseToggleGroup
      {...rest}
      ref={ref}
      multiple={multiple}
      className={cx('gap-none inline-flex', className)}
      data-spark-component="toggle-group"
      {...(asChild && { render: renderSlot })}
    >
      {children}
    </BaseToggleGroup>
  )
}

ToggleGroup.displayName = 'ToggleGroup'
