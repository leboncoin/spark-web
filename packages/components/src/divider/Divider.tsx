import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cx } from 'class-variance-authority'
import { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'

import { Slot } from '../slot'
import { dividerStyles, type DividerStylesProps } from './Divider.styles'

export interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<DividerStylesProps, 'isEmpty'> {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  children?: ReactElement
  /**
   * The orientation of the inner content.
   */
  alignment?: 'start' | 'end' | 'center'
  /**
   * The orientation of the separator.
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * When true, signifies that it is purely visual, carries no semantic meaning, and ensures it is not present in the accessibility tree.
   */
  isDecorative?: boolean
  /**
   * Color scheme of the divider.
   */
  intent?: 'outline' | 'current'
  ref?: Ref<HTMLDivElement>
}

export const Divider = ({
  asChild,
  className,
  isDecorative = false,
  children,
  orientation = 'horizontal',
  writingMode = 'horizontal-tb',
  alignment = 'center',
  intent = 'outline',
  ref,
  role: roleProp,
  ...props
}: DividerProps) => {
  const isEmpty = asChild ? !(children?.props as { children: ReactNode })?.children : !children

  let roleProps: { role: string } | undefined
  if (isDecorative) {
    roleProps = { role: 'none' }
  } else if (roleProp !== undefined) {
    roleProps = { role: roleProp }
  }

  const renderSlot = asChild
    ? // Base UI uses its `render` prop to swap the underlying element.
      // We rely on Spark's `Slot` to mimic Radix's `asChild` behavior.
      (slotProps: any) => <Slot {...slotProps} />
    : undefined

  return (
    <BaseSeparator
      data-spark-component="divider"
      className={cx(
        dividerStyles({ isEmpty, orientation, alignment, intent, writingMode }),
        className
      )}
      orientation={orientation}
      ref={ref}
      {...props}
      render={renderSlot}
      {...roleProps}
      data-writing-mode={writingMode}
    >
      {children}
    </BaseSeparator>
  )
}

Divider.displayName = 'Divider'
