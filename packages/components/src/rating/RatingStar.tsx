import { StarFill } from '@spark-ui/icons/StarFill'
import { StarOutline } from '@spark-ui/icons/StarOutline'
import { cx } from 'class-variance-authority'
import { type MouseEvent, Ref } from 'react'

import { Icon } from '../icon'
import {
  ratingStarIconStyles,
  type RatingStarIconStylesProps,
  ratingStarStyles,
  type RatingStarstylesProps,
} from './RatingStar.styles'
import type { StarValue } from './types'

export interface RatingStarProps extends RatingStarstylesProps, RatingStarIconStylesProps {
  value: StarValue
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void
  ref?: Ref<HTMLDivElement>
}

export const RatingStar = ({
  value,
  size,
  disabled,
  readOnly,
  onClick,
  onMouseEnter,
  ref: forwardedRef,
}: RatingStarProps) => {
  return (
    <div
      ref={forwardedRef}
      onMouseEnter={onMouseEnter}
      className={ratingStarStyles({
        gap: size === 'lg' ? 'md' : 'sm',
        disabled,
        readOnly,
      })}
      data-part="star"
      onClick={onClick}
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
    </div>
  )
}
