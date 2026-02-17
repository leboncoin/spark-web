/* eslint-disable max-lines-per-function */
import { useCombinedState } from '@spark-ui/hooks/use-combined-state'
import { cx } from 'class-variance-authority'
import {
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react'

import { useFormFieldControl } from '../form-field'
import { RatingStar } from './RatingStar'
import type { RatingValue } from './types'
import { getStarValue, splitAt } from './utils'

const getRatingInteger = (value: number | undefined): RatingValue => {
  if (value === undefined || !Number.isInteger(value) || value < 1) {
    return 0
  }

  return Math.min(5, Math.max(1, value)) as RatingValue
}

function createStarKeyDownHandler(
  index: number,
  starRefList: RefObject<(HTMLDivElement | null)[]>,
  setRatingValue: (value: RatingValue) => void,
  isInteractive: boolean
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        const nextIndex = Math.min(4, index + 1)
        setRatingValue((nextIndex + 1) as RatingValue)
        starRefList.current[nextIndex]?.focus()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        const prevIndex = Math.max(0, index - 1)
        setRatingValue((prevIndex + 1) as RatingValue)
        starRefList.current[prevIndex]?.focus()
        break
      case ' ':
        event.preventDefault()
        setRatingValue((index + 1) as RatingValue)
        break
      default:
        break
    }
  }
}

function getStarTabIndex(index: number, ratingValue: RatingValue): number {
  if (ratingValue >= 1) {
    return ratingValue - 1 === index ? 0 : -1
  }

  return index === 0 ? 0 : -1
}

export interface RatingProps extends PropsWithChildren<ComponentPropsWithRef<'div'>> {
  /**
   * Use the `defaultValue` prop to set the default value of the input, on a from 0 to 5.
   *
   * Use this when you want to use it in an uncontrolled manner
   */
  defaultValue?: RatingValue
  /**
   * The value is the number of the rating selected, on a scale from 0 to 5.
   *
   * Use this when you want to use it in a controlled manner,
   * in conjunction with the `onValueChange` prop
   */
  value?: RatingValue
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: RatingValue) => void
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
   * When true, indicates that the user must select a rating before form submission.
   * @default false
   */
  required?: boolean
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
  'aria-label'?: string
  /**
   * Returns the aria-label applied to each radio star.
   * Defaults to `${aria-label} ${index + 1}`.
   */
  getStarLabel?: (index: number) => string
}

export const Rating = ({
  defaultValue,
  value: propValue,
  onValueChange,
  disabled,
  readOnly,
  required: requiredProp,
  name,
  id,
  'aria-label': ariaLabel,
  getStarLabel,
  ref,
  ...rest
}: RatingProps) => {
  const {
    labelId,
    isInvalid,
    isRequired,
    description,
    name: formFieldName,
    disabled: formFieldDisabled,
    readOnly: formFieldReadOnly,
  } = useFormFieldControl()
  const starRefList = useRef<(HTMLDivElement | null)[]>([])
  const ratingId = useId()
  const [hoveredStarIndex, setHoveredStarIndex] = useState<number | null>(null)
  const [value, setRatingValue] = useCombinedState(propValue, defaultValue, onValueChange)
  const ratingValue = getRatingInteger(value ?? 0)
  const resolvedDisabled = disabled ?? formFieldDisabled
  const resolvedReadOnly = readOnly ?? formFieldReadOnly
  const required = requiredProp !== undefined ? requiredProp : isRequired
  const groupName = name ?? formFieldName
  const isInteractive = !(resolvedDisabled || resolvedReadOnly)
  const hasExplicitStarLabel = getStarLabel !== undefined || ariaLabel !== undefined
  const displayValue = hoveredStarIndex !== null ? hoveredStarIndex + 1 : ratingValue

  function onStarClick(index: number) {
    if (!isInteractive) return

    const newValue = (index + 1) as RatingValue
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
      aria-labelledby={labelId}
      aria-invalid={isInvalid}
      aria-required={required}
      aria-describedby={description}
      className="relative inline-flex"
      data-spark-component="rating"
      {...rest}
      onMouseLeave={resetDataPartStarAttr}
    >
      {groupName !== undefined && (
        <input type="hidden" name={groupName} value={ratingValue} aria-hidden data-part="input" />
      )}
      <div className={cx('gap-x-md', 'flex')}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingStar
            ref={handleStarRef(index)}
            key={index}
            disabled={resolvedDisabled}
            readOnly={resolvedReadOnly}
            size="lg"
            value={getStarValue({ index, value: displayValue })}
            checked={ratingValue === index + 1}
            ariaLabel={
              hasExplicitStarLabel
                ? (getStarLabel?.(index) ?? `${ariaLabel} ${index + 1}`)
                : undefined
            }
            ariaLabelledBy={
              !hasExplicitStarLabel && labelId
                ? `${labelId} ${ratingId}-star-${index + 1}`
                : undefined
            }
            tabIndex={isInteractive ? getStarTabIndex(index, ratingValue) : -1}
            onClick={() => onStarClick(index)}
            onKeyDown={onStarKeyDown(index)}
            onMouseEnter={event => isInteractive && onStarMouseEnter(event)}
          >
            {!hasExplicitStarLabel && (
              <span id={`${ratingId}-star-${index + 1}`} className="sr-only">
                {index + 1}
              </span>
            )}
          </RatingStar>
        ))}
      </div>
    </div>
  )
}
