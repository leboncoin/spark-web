import { cx } from 'class-variance-authority'
import { Separator } from 'radix-ui'
import { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'

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
  ...props
}: DividerProps) => {
  const isEmpty = asChild ? !(children?.props as { children: ReactNode })?.children : !children

  return (
    <Separator.Root
      data-spark-component="divider"
      asChild={asChild}
      className={cx(
        dividerStyles({ isEmpty, orientation, alignment, intent, writingMode }),
        className
      )}
      orientation={orientation}
      ref={ref}
      decorative={isDecorative}
      {...props}
      data-writing-mode={writingMode}
    >
      {children}
    </Separator.Root>
  )
}

Divider.displayName = 'Divider'
