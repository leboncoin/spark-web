import { cva } from 'class-variance-authority'
import { type ComponentPropsWithRef, type ReactNode } from 'react'

import { useRatingDisplay } from './RatingDisplayContext'

export interface RatingDisplayCountProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  /**
   * Custom count content.
   * Pass a render function to receive the count value and return the content to render.
   */
  children?: ReactNode | ((count: number) => ReactNode)
}

const ratingDisplayCountStyles = cva('text-on-surface/dim-1', {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-body-2',
      lg: 'text-display-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const RatingDisplayCount = ({ className, children, ...rest }: RatingDisplayCountProps) => {
  const { count, size } = useRatingDisplay()
  if (count === undefined) return null
  const renderedCount = typeof children === 'function' ? children(count) : (children ?? count)

  return (
    <span className={ratingDisplayCountStyles({ size: size ?? 'md', className })} {...rest}>
      ({renderedCount})
    </span>
  )
}

RatingDisplayCount.displayName = 'RatingDisplay.Count'
