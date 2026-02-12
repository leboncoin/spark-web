import { StarFill } from '@spark-ui/icons/StarFill'
import { StarOutline } from '@spark-ui/icons/StarOutline'
import { cx } from 'class-variance-authority'
import { type KeyboardEvent, type MouseEvent, type PropsWithChildren, Ref, useState } from 'react'

import { Icon } from '../icon'
import {
  ratingStarIconStyles,
  type RatingStarIconStylesProps,
  ratingStarStyles,
  type RatingStarstylesProps,
} from './RatingStar.styles'
import type { StarValue } from './types'

export interface RatingStarProps
  extends PropsWithChildren<RatingStarstylesProps>,
    RatingStarIconStylesProps {
  value: StarValue
  /** Whether this radio option is selected (for radiogroup pattern). */
  checked?: boolean
  /** Accessible name for the radio (e.g. "one star", "two stars"). */
  ariaLabel?: string
  /** Accessible ids used to compose the radio name. */
  ariaLabelledBy?: string
  /** Tab index for roving tabindex (0 or -1). */
  tabIndex?: number
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void
  ref?: Ref<HTMLDivElement>
}

export const RatingStar = ({
  value,
  size,
  disabled,
  readOnly,
  checked = false,
  ariaLabel,
  ariaLabelledBy,
  tabIndex,
  onClick,
  onKeyDown,
  onMouseEnter,
  children,
  ref: forwardedRef,
}: RatingStarProps) => {
  const isInteractive = !disabled && !readOnly
  const [justClicked, setJustClicked] = useState(false)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    if (isInteractive) setJustClicked(true)
  }

  const clearJustClicked = () => setJustClicked(false)

  return (
    <div
      ref={forwardedRef}
      role="radio"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={tabIndex}
      data-spark-component="rating-star"
      data-part="star"
      {...(isInteractive && justClicked && { 'data-suppress-scale': '' })}
      className={ratingStarStyles({
        gap: size === 'lg' ? 'md' : 'sm',
        disabled,
        readOnly,
      })}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={clearJustClicked}
      onMouseMove={clearJustClicked}
    >
      <div
        className={cx(
          'z-raised absolute overflow-hidden',
          'group-[[data-part=star][data-hovered]]:overflow-visible'
        )}
        style={{ width: value * 100 + '%' }}
      >
        <Icon
          className={ratingStarIconStyles({
            size,
            design: 'filled',
          })}
        >
          <StarFill />
        </Icon>
      </div>

      <Icon className={ratingStarIconStyles({ size, design: 'outlined' })}>
        <StarOutline />
      </Icon>
      {children}
    </div>
  )
}
