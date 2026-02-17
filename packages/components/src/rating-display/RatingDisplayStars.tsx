import { cx } from 'class-variance-authority'

import { useRatingDisplay } from './RatingDisplayContext'
import { RatingDisplayStar, type RatingDisplayStarProps } from './RatingDisplayStar'
import type { StarValue } from './types'
import { getSingleStarValue, getStarValue } from './utils'

export interface RatingDisplayStarsProps {
  size?: RatingDisplayStarProps['size']
  /**
   * Sets the rendering mode for stars.
   * @default 'default'
   */
  variant?: 'default' | 'single-star'
  /**
   * Custom fill algorithm for each star.
   * By default, stars are rounded to the nearest 0.5.
   */
  getFillMode?: ({ value, index }: { value?: number; index: number }) => StarValue
}

export const RatingDisplayStars = ({
  size,
  variant = 'default',
  getFillMode,
}: RatingDisplayStarsProps) => {
  const { value, size: contextSize } = useRatingDisplay()
  const resolvedSize = size ?? contextSize
  const getDisplayValue = (index: number) => {
    if (getFillMode) {
      return getFillMode({ index, value })
    }

    return variant === 'single-star' ? getSingleStarValue(value) : getStarValue({ index, value })
  }

  const stars =
    variant === 'single-star'
      ? [getDisplayValue(0)]
      : Array.from({ length: 5 }, (_, index) => getDisplayValue(index))

  return (
    <div
      data-spark-component="rating-display-stars"
      className={cx(resolvedSize === 'lg' ? 'gap-x-md' : 'gap-x-sm', 'flex')}
    >
      {stars.map((starValue, index) => (
        <RatingDisplayStar key={index} size={resolvedSize} value={starValue} />
      ))}
    </div>
  )
}

RatingDisplayStars.displayName = 'RatingDisplay.Stars'
