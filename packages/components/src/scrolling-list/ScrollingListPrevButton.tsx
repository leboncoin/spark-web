import { ArrowVerticalLeft } from '@spark-ui/icons/ArrowVerticalLeft'
import { cx } from 'class-variance-authority'
import { useContext } from 'react'

import { Icon } from '../icon'
import { IconButton, IconButtonProps } from '../icon-button'
import { ScrollingListContext } from './ScrollingList'

export const ScrollingListPrevButton = ({
  'aria-label': ariaLabel,

  ...rest
}: IconButtonProps) => {
  const ctx = useContext(ScrollingListContext)

  const handlePrevPage = () => {
    const shouldSnapFirstPage =
      ctx.activePageIndex === 0 && (ctx.scrollAreaRef.current?.scrollLeft || 0) > 0

    if (shouldSnapFirstPage) {
      ctx.goTo(0, { behavior: ctx.scrollBehavior })
    } else if (ctx.hasPrevPage) {
      ctx.prev({ behavior: ctx.scrollBehavior })
    } else {
      ctx.goTo(ctx.pages.length - 1, { behavior: ctx.scrollBehavior })
    }
  }

  const listHasOverflow = ctx.overflow.left || ctx.overflow.right
  const isDisabled = !listHasOverflow || (!ctx.loop && !ctx.overflow.left)

  return (
    <IconButton
      size="sm"
      intent="surface"
      design="filled"
      className={cx(
        'pointer-events-auto opacity-(--scrolling-list-controls-opacity) shadow-sm disabled:invisible',
        'group-hover/scrolling-list:opacity-none focus-visible:opacity-none'
      )}
      onClick={handlePrevPage}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-controls="scrolling-list-items"
      {...rest}
    >
      <Icon>
        <ArrowVerticalLeft />
      </Icon>
    </IconButton>
  )
}

ScrollingListPrevButton.displayName = 'ScrollingList.PrevButton'
