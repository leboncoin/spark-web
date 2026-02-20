import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { Separator } from 'radix-ui'
import { HTMLAttributes, Ref } from 'react'

import { dividerStyles, type DividerStylesProps } from './Divider.styles'

export interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<DividerStylesProps, 'isEmpty'>,
    useRender.ComponentProps<'div'> {
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
  render,
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
  const isEmpty = !children

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'divider',
    className: cx(
      dividerStyles({ isEmpty, orientation, alignment, intent, writingMode }),
      className
    ),
    'data-writing-mode': writingMode,
    ...props,
    children,
  }

  const element = useRender({
    defaultTagName: 'div',
    render: (render ?? (() => null)) as useRender.RenderProp,
    ref,
    props: mergeProps<'div'>(defaultProps, {}),
  })

  if (render) {
    return (
      <Separator.Root asChild orientation={orientation} decorative={isDecorative} ref={ref}>
        {element}
      </Separator.Root>
    )
  }

  return (
    <Separator.Root
      data-spark-component="divider"
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
