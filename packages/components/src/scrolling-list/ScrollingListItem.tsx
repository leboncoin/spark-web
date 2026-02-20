import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { ReactNode, useContext, useRef } from 'react'

import { ScrollingListContext } from './ScrollingList'
import { useFocusWithinScroll } from './useFocusWithinScroll'

export interface ScrollingListItemProps extends useRender.ComponentProps<'div'> {
  children?: ReactNode
  /**
   * DO NOT USE. This prop is automatically managed by the parent ScrollingList.ListItems
   */
  index?: number
  className?: string
}

export const ScrollingListItem = ({
  children,
  index = 0,
  className = '',
  ref,
  render,
  ...rest
}: ScrollingListItemProps) => {
  const ctx = useContext(ScrollingListContext)
  const itemRef = useRef<HTMLDivElement>(null)

  const isSnapPoint = ctx.snapPointIndexes.has(index)

  useFocusWithinScroll(itemRef, ctx.scrollAreaRef)

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'scrolling-list-item',
    role: 'listitem',
    className: cx(
      'default:w-auto default:shrink-0',
      {
        'snap-start': isSnapPoint,
        'snap-normal': isSnapPoint && ctx.snapStop === 'normal',
        'snap-always': isSnapPoint && ctx.snapStop === 'always',
      },
      className
    ),
    children,
  }

  return useRender({
    defaultTagName: 'div',
    render,
    ref: ref ? [itemRef, ref] : itemRef,
    props: mergeProps<'div'>(defaultProps, rest),
  })
}

ScrollingListItem.displayName = 'ScrollingList.Item'
