import { ArrowVerticalRight } from '@spark-ui/icons/ArrowVerticalRight'
import { cx } from 'class-variance-authority'
import { useContext } from 'react'

import { Icon } from '../icon'
import { IconButton, IconButtonProps } from '../icon-button'
import { ScrollingListContext } from './ScrollingList'

export const ScrollingListNextButton = ({ 'aria-label': ariaLabel, ...rest }: IconButtonProps) => {
  const ctx = useContext(ScrollingListContext)

  const handleNextPage = () => {
    if (ctx.hasNextPage) {
      ctx.next({ behavior: ctx.scrollBehavior })
    } else {
      ctx.goTo(0, { behavior: ctx.scrollBehavior })
    }
  }

  const listHasOverflow = ctx.overflow.left || ctx.overflow.right
  const isDisabled = !listHasOverflow || (!ctx.loop && !ctx.overflow.right)

  return (
    <IconButton
      size="sm"
      intent="surface"
      design="filled"
      className={cx(
        'pointer-events-auto opacity-(--scrolling-list-controls-opacity) shadow-sm disabled:invisible',
        'group-hover/scrolling-list:opacity-none focus-visible:opacity-none'
      )}
      onClick={handleNextPage}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-controls="scrolling-list-items"
      {...rest}
    >
      <Icon>
        <ArrowVerticalRight />
      </Icon>
    </IconButton>
  )
}

ScrollingListNextButton.displayName = 'ScrollingList.NextButton'
