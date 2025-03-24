import { Popover as RadixPopover } from 'radix-ui'
import { Ref } from 'react'

import { styles, type StylesProps } from './PopoverContent.styles'
import { usePopover } from './PopoverContext'

export type ContentProps = RadixPopover.PopoverContentProps &
  StylesProps & {
    ref?: Ref<HTMLDivElement>
  }

export const Content = ({
  // Spark props
  className,
  children,
  matchTriggerWidth = false,
  // Radix props
  align = 'center',
  arrowPadding = 16, // In order not to overlap the arrow on the rounded corners of the popover.
  asChild = false,
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
      {...{
        align,
        arrowPadding,
        asChild,
        avoidCollisions,
        collisionBoundary,
        collisionPadding,
        hideWhenDetached,
        side,
        sideOffset,
        sticky,
      }}
      {...rest}
    >
      {children}
    </RadixPopover.Content>
  )
}

Content.displayName = 'Popover.Content'
