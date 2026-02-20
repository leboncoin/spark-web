import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

import { styles, type StylesProps } from './PopoverContent.styles'
import { usePopover } from './PopoverContext'

export type ContentProps = Omit<RadixPopover.PopoverContentProps, 'asChild' | 'children'> &
  StylesProps &
  useRender.ComponentProps<'div'> & {
    ref?: Ref<HTMLDivElement>
  }

export const Content = ({
  // Spark props
  className,
  children,
  render,
  matchTriggerWidth = false,
  // Radix props
  align = 'center',
  arrowPadding = 16,
  avoidCollisions = true,
  'aria-labelledby': ariaLabelledBy,
  collisionBoundary,
  collisionPadding = 0,
  hideWhenDetached = false,
  side = 'bottom',
  sideOffset = 8,
  sticky = 'partial',
  inset = false,
  elevation = 'popover',
  ref,
  ...rest
}: ContentProps) => {
  const { headerId, intent } = usePopover()

  const radixProps = {
    align,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    hideWhenDetached,
    side,
    sideOffset,
    sticky,
  }

  const defaultProps = {
    'aria-labelledby': headerId || ariaLabelledBy,
    'data-spark-component': 'popover-content',
    className: styles({
      enforceBoundaries: !!collisionBoundary,
      matchTriggerWidth,
      inset,
      elevation,
      intent,
      className,
    }),
    ...radixProps,
    ...rest,
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
      <RadixPopover.Content asChild {...radixProps} ref={ref}>
        {element}
      </RadixPopover.Content>
    )
  }

  return (
    <RadixPopover.Content
      aria-labelledby={headerId || ariaLabelledBy}
      className={styles({
        enforceBoundaries: !!collisionBoundary,
        matchTriggerWidth,
        inset,
        elevation,
        intent,
        className,
      })}
      data-spark-component="popover-content"
      ref={ref}
      asChild={false}
      {...radixProps}
      {...rest}
    >
      {children}
    </RadixPopover.Content>
  )
}

Content.displayName = 'Popover.Content'
