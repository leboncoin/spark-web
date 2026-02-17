import { cva } from 'class-variance-authority'
import { type ComponentPropsWithRef, type ReactNode } from 'react'

import { useRatingDisplay } from './RatingDisplayContext'
import { formatRatingValue } from './utils'

export interface RatingDisplayValueProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  /**
   * Custom value content.
   * Pass a render function to receive the formatted value (first arg) and raw value (second arg),
   * then return the content to render.
   */
  children?: ReactNode | ((formattedValue: string, value: number) => ReactNode)
}

const ratingDisplayValueStyles = cva('text-on-surface font-bold', {
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

export const RatingDisplayValue = ({ className, children, ...rest }: RatingDisplayValueProps) => {
  const { value, size } = useRatingDisplay()
  const formattedValue = formatRatingValue(value)
  const renderedValue =
    typeof children === 'function' ? children(formattedValue, value) : (children ?? formattedValue)

  return (
    <span
      data-spark-component="rating-display-value"
      className={ratingDisplayValueStyles({ size: size ?? 'md', className })}
      {...rest}
    >
      {renderedValue}
    </span>
  )
}

RatingDisplayValue.displayName = 'RatingDisplay.Value'
