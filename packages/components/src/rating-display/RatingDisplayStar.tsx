import { StarFill } from '@spark-ui/icons/StarFill'
import { StarOutline } from '@spark-ui/icons/StarOutline'
import { cva, cx, type VariantProps } from 'class-variance-authority'

import { Icon } from '../icon'
import type { StarValue } from './types'

const ratingDisplayStarStyles = cva(['relative block after:absolute after:block after:inset-0'], {
  variants: {
    gap: {
      sm: ['after:w-[calc(100%+(var(--spacing-sm)))]', 'last-of-type:after:content-none'],
      md: ['after:w-[calc(100%+(var(--spacing-md)))]', 'last-of-type:after:content-none'],
    },
  },
  defaultVariants: {
    gap: 'sm',
  },
})

const ratingDisplayStarIconStyles = cva('', {
  variants: {
    size: {
      sm: 'text-caption-link',
      md: 'text-body-1',
      lg: 'text-display-3',
    },
    design: {
      filled: ['text-main-variant'],
      outlined: ['text-on-surface/dim-3'],
    },
  },
})

type RatingDisplayStarstylesProps = Omit<VariantProps<typeof ratingDisplayStarStyles>, never>
type RatingDisplayStarIconStylesProps = Omit<
  VariantProps<typeof ratingDisplayStarIconStyles>,
  'design'
>

export interface RatingDisplayStarProps
  extends RatingDisplayStarstylesProps,
    RatingDisplayStarIconStylesProps {
  value: StarValue
}

export const RatingDisplayStar = ({ value, size }: RatingDisplayStarProps) => {
  return (
    <div
      data-spark-component="rating-display-star"
      data-part="star"
      className={ratingDisplayStarStyles({
        gap: size === 'lg' ? 'md' : 'sm',
      })}
    >
      <div className={cx('z-raised absolute overflow-hidden')} style={{ width: value * 100 + '%' }}>
        <Icon
          className={ratingDisplayStarIconStyles({
            size,
            design: 'filled',
          })}
        >
          <StarFill />
        </Icon>
      </div>

      <Icon className={ratingDisplayStarIconStyles({ size, design: 'outlined' })}>
        <StarOutline />
      </Icon>
    </div>
  )
}
