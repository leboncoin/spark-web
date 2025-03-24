import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactNode, useContext, useRef } from 'react'

import { Slot } from '../slot'
import { ScrollingListContext } from './ScrollingList'
import { useFocusWithinScroll } from './useFocusWithinScroll'

export interface ScrollingListItemProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  children?: ReactNode
  /**
   * DO NOT USE. This prop is automatically managed by the parent ScrollingList.ListItems
   */
  index?: number
  className?: string
}

export const ScrollingListItem = ({
  asChild = false,
  children,
  index = 0,
  className = '',
  ...rest
}: ScrollingListItemProps) => {
  const ctx = useContext(ScrollingListContext)
  const itemRef = useRef<HTMLDivElement>(null)

  const isSnapPoint = ctx.snapPointIndexes.has(index)

  useFocusWithinScroll(itemRef, ctx.scrollAreaRef)

  const Component = asChild ? Slot : 'div'

  return (
    <Component
      role="listitem"
      ref={itemRef}
      className={cx(
        'default:w-auto default:shrink-0',
        {
          'snap-start': isSnapPoint,
          'snap-normal': isSnapPoint && ctx.snapStop === 'normal',
          'snap-always': isSnapPoint && ctx.snapStop === 'always',
        },
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

ScrollingListItem.displayName = 'ScrollingList.Item'
