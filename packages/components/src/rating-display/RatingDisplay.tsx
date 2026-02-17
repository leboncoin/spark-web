import { type ComponentPropsWithRef, type PropsWithChildren } from 'react'

import { RatingDisplayProvider } from './RatingDisplayContext'
import type { RatingDisplayStarProps } from './RatingDisplayStar'

export interface RatingDisplayProps extends PropsWithChildren<ComponentPropsWithRef<'div'>> {
  /**
   * The rating value to display, on a scale from 0 to 5.
   */
  value?: number
  /**
   * Sets the size of the stars.
   * @default 'md'
   */
  size?: RatingDisplayStarProps['size']
  /**
   * Optional count value available to `RatingDisplay.Count`.
   */
  count?: number
  /**
   * Accessible description of the rating content.
   */
  'aria-label': string
}

export type RatingDisplayRootProps = RatingDisplayProps

export const RatingDisplay = ({
  value = 0,
  size = 'md',
  count,
  ref,
  children,
  ...rest
}: RatingDisplayProps) => {
  const ratingValue = value ?? 0

  return (
    <RatingDisplayProvider value={ratingValue} size={size} count={count}>
      <div
        ref={ref}
        className="gap-x-sm relative inline-flex items-center"
        data-spark-component="rating-display"
        {...rest}
      >
        {children}
      </div>
    </RatingDisplayProvider>
  )
}

RatingDisplay.displayName = 'RatingDisplay'
