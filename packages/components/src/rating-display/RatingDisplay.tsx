import { cx } from 'class-variance-authority'
import {
  type ComponentPropsWithRef,
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useContext,
} from 'react'

import { RatingDisplayStar, type RatingDisplayStarProps } from './RatingDisplayStar'
import { formatRatingValue, getSingleStarValue, getStarValue } from './utils'

interface RatingDisplayContextValue {
  value: number
  size: RatingDisplayStarProps['size']
  count?: number
}

const RatingDisplayContext = createContext<RatingDisplayContextValue | null>(null)

function useRatingDisplay() {
  const context = useContext(RatingDisplayContext)
  if (!context) {
    throw new Error('RatingDisplay compound components must be used within RatingDisplay.')
  }

  return context
}

export interface RatingDisplayRootProps extends PropsWithChildren<ComponentPropsWithRef<'div'>> {
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

export interface RatingDisplayStarsProps {
  size?: RatingDisplayStarProps['size']
  /**
   * Sets the rendering mode for stars.
   * @default 'default'
   */
  variant?: 'default' | 'single-star'
}

export interface RatingDisplayValueProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  children?: ReactNode | ((formattedValue: string, value: number) => ReactNode)
}

export interface RatingDisplayCountProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  children?: ReactNode | ((count: number) => ReactNode)
}

const Root = ({
  value = 0,
  size = 'md',
  count,
  ref,
  children,
  ...rest
}: RatingDisplayRootProps) => {
  const ratingValue = value ?? 0
  const contextValue: RatingDisplayContextValue = { value: ratingValue, size, count }

  return (
    <RatingDisplayContext.Provider value={contextValue}>
      <div
        ref={ref}
        className="gap-x-sm relative inline-flex items-center"
        data-spark-component="rating-display"
        {...rest}
      >
        {children}
      </div>
    </RatingDisplayContext.Provider>
  )
}

const Stars = ({ size, variant = 'default' }: RatingDisplayStarsProps) => {
  const { value, size: contextSize } = useRatingDisplay()
  const resolvedSize = size ?? contextSize
  const stars =
    variant === 'single-star'
      ? [getSingleStarValue(value)]
      : Array.from({ length: 5 }).map((_, index) => getStarValue({ index, value }))

  return (
    <div className={cx(resolvedSize === 'lg' ? 'gap-x-md' : 'gap-x-sm', 'flex')}>
      {stars.map((starValue, index) => (
        <RatingDisplayStar key={index} size={resolvedSize} value={starValue} />
      ))}
    </div>
  )
}

const Value = ({ className, children, ...rest }: RatingDisplayValueProps) => {
  const { value } = useRatingDisplay()
  const formattedValue = formatRatingValue(value)
  const renderedValue =
    typeof children === 'function' ? children(formattedValue, value) : (children ?? formattedValue)

  return (
    <span className={cx('text-on-surface font-bold', className)} {...rest}>
      {renderedValue}
    </span>
  )
}

const Count = ({ className, children, ...rest }: RatingDisplayCountProps) => {
  const { count } = useRatingDisplay()
  if (count === undefined) return null
  const renderedCount = typeof children === 'function' ? children(count) : (children ?? count)

  return (
    <span className={cx('text-on-surface/dim-1', className)} {...rest}>
      ({renderedCount})
    </span>
  )
}

export const RatingDisplay: typeof Root & {
  Stars: typeof Stars
  Value: typeof Value
  Count: typeof Count
} = Object.assign(Root, {
  Stars,
  Value,
  Count,
})

Root.displayName = 'RatingDisplay'
Stars.displayName = 'RatingDisplay.Stars'
Value.displayName = 'RatingDisplay.Value'
Count.displayName = 'RatingDisplay.Count'
