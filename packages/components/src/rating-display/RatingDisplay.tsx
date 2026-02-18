import { type ComponentPropsWithRef, type PropsWithChildren } from 'react'

import { Slot } from '../slot'
import { RatingDisplayProvider } from './RatingDisplayContext'
import type { RatingDisplayStarProps } from './RatingDisplayStar'

export interface RatingDisplayProps extends PropsWithChildren<ComponentPropsWithRef<'div'>> {
  /**
   * When true, merges props onto the single child element instead of rendering a div.
   * Use to render the root as a link or another custom element.
   */
  asChild?: boolean
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
  asChild = false,
  ref,
  children,
  ...rest
}: RatingDisplayProps) => {
  const ratingValue = value ?? 0
  const Component = asChild ? Slot : 'div'

  return (
    <RatingDisplayProvider value={ratingValue} size={size} count={count}>
      <Component
        ref={ref}
        className="gap-x-sm relative inline-flex items-center"
        data-spark-component="rating-display"
        {...rest}
      >
        {children}
      </Component>
    </RatingDisplayProvider>
  )
}

RatingDisplay.displayName = 'RatingDisplay'
