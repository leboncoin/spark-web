import { cx } from 'class-variance-authority'
import { type ComponentPropsWithRef, type ReactNode } from 'react'

import { useRatingDisplay } from './RatingDisplayContext'

export interface RatingDisplayCountProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  /**
   * Custom count content.
   * Pass a render function to receive the count value and return the content to render.
   */
  children?: ReactNode | ((count: number) => ReactNode)
}

export const RatingDisplayCount = ({ className, children, ...rest }: RatingDisplayCountProps) => {
  const { count } = useRatingDisplay()
  if (count === undefined) return null
  const renderedCount = typeof children === 'function' ? children(count) : (children ?? count)

  return (
    <span className={cx('text-on-surface/dim-1', className)} {...rest}>
      ({renderedCount})
    </span>
  )
}

RatingDisplayCount.displayName = 'RatingDisplay.Count'
