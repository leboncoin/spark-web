import { useCombinedState } from '@spark-ui/hooks/use-combined-state'
import { cx } from 'class-variance-authority'
import {
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from 'react'

import { RatingStar } from './RatingStar'
import { getStarValue, splitAt } from './utils'

const STAR_LABELS = ['one star', 'two stars', 'three stars', 'four stars', 'five stars'] as const

const getRatingInteger = (value: number | undefined): number => {
  if (value === undefined || value < 1) {
    return 0
  }

  return Math.min(5, Math.max(1, Math.round(value)))
}

function createStarKeyDownHandler(
  index: number,
  starRefList: RefObject<(HTMLDivElement | null)[]>,
  setRatingValue: (value: number) => void,
  isInteractive: boolean
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        const nextIndex = Math.min(4, index + 1)
        setRatingValue(nextIndex + 1)
        starRefList.current[nextIndex]?.focus()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        const prevIndex = Math.max(0, index - 1)
        setRatingValue(prevIndex + 1)
        starRefList.current[prevIndex]?.focus()
        break
      case ' ':
        event.preventDefault()
        setRatingValue(index + 1)
        break
      default:
        break
    }
  }
}

export interface RatingProps extends PropsWithChildren<ComponentPropsWithRef<'div'>> {
  /**
   * Use the `defaultValue` prop to set the default value of the input, on a from 0 to 5.
   *
   * Use this when you want to use it in an uncontrolled manner
   */
  defaultValue?: number
  /**
   * The value is the number of the rating selected, on a scale from 0 to 5.
   *
   * Use this when you want to use it in a controlled manner,
   * in conjunction with the `onValueChange` prop
   */
  value?: number
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: number) => void
  /**
   * Sets the component as interactive or not.
   * @default undefined
   */
  readOnly?: boolean
  /**
   * When `true`, prevents the user from interacting.
   * @default false
   */
  disabled?: boolean
  /**
   * Name of the underlying hidden input (for form submission).
   * @default undefined
   */
  name?: string
  /**
   * id of the underlying hidden input.
   * @default undefined
   */
  id?: string
  /**
   * aria-label of the radiogroup.
   * @default undefined
   */
  'aria-label': string
}

export const Rating = ({
  defaultValue,
  value: propValue,
  onValueChange,
  disabled,
  readOnly,
  name,
  id,
  'aria-label': ariaLabel,
  ref,
  ...rest
}: RatingProps) => {
  const starRefList = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredStarIndex, setHoveredStarIndex] = useState<number | null>(null)

  const [value, setRatingValue] = useCombinedState(propValue, defaultValue, onValueChange)

  const ratingValue = getRatingInteger(value ?? 0)
  const isInteractive = !(disabled || readOnly)

  // When hovering, show filled up to hovered star and outlined for the rest
  const displayValue = hoveredStarIndex !== null ? hoveredStarIndex + 1 : ratingValue

  // Roving tabindex: checked radio or first has tabindex 0 (APG)
  const getTabIndex = useCallback(
    (index: number): number => {
      if (ratingValue >= 1) {
        return ratingValue - 1 === index ? 0 : -1
      }

      return index === 0 ? 0 : -1
    },
    [ratingValue]
  )

  function onStarClick(index: number) {
    if (!isInteractive) return
    const newValue = index + 1
    setRatingValue(newValue)
    starRefList.current[index]?.focus()
  }

  const onStarKeyDown = useCallback(
    (index: number) => createStarKeyDownHandler(index, starRefList, setRatingValue, isInteractive),
    [isInteractive, setRatingValue]
  )

  function onStarMouseEnter({ currentTarget }: MouseEvent<HTMLDivElement>) {
    const currentStarIndex = starRefList.current.findIndex(star => star === currentTarget)

    setHoveredStarIndex(currentStarIndex >= 0 ? currentStarIndex : null)

    const [previousStars, followingStars] = splitAt(starRefList.current, currentStarIndex + 1)

    previousStars.forEach(star => star?.setAttribute('data-hovered', ''))
    followingStars.forEach(star => star?.removeAttribute('data-hovered'))
  }

  const handleStarRef = useCallback(
    (index: number) => (elm: HTMLDivElement | null) => {
      starRefList.current[index] = elm
    },
    []
  )

  function resetDataPartStarAttr() {
    setHoveredStarIndex(null)
    starRefList.current.forEach(star => star?.removeAttribute('data-hovered'))
  }

  return (
    <div
      ref={ref}
      id={id}
      role="radiogroup"
      aria-label={ariaLabel}
      className="relative inline-flex"
      data-spark-component="rating"
      {...rest}
      onMouseLeave={resetDataPartStarAttr}
    >
      {name !== undefined && (
        <input type="hidden" name={name} value={ratingValue} aria-hidden data-part="input" />
      )}
      <div className={cx('gap-x-md', 'flex')}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingStar
            ref={handleStarRef(index)}
            key={index}
            disabled={disabled}
            readOnly={readOnly}
            size="lg"
            value={getStarValue({ index, value: displayValue })}
            checked={ratingValue === index + 1}
            ariaLabel={STAR_LABELS[index]}
            tabIndex={isInteractive ? getTabIndex(index) : -1}
            onClick={() => onStarClick(index)}
            onKeyDown={onStarKeyDown(index)}
            onMouseEnter={event => isInteractive && onStarMouseEnter(event)}
          />
        ))}
      </div>
    </div>
  )
}
