import { useCombinedState } from '@spark-ui/use-combined-state'
import { cx } from 'class-variance-authority'
import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type MouseEvent,
  type PropsWithChildren,
  useCallback,
  useRef,
} from 'react'

import { RatingStar, type RatingStarProps } from './RatingStar'
import { getNearestHalfDecimal, getStarValue, splitAt } from './utils'

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
   * Sets the size of the stars.
   * @default 'md'
   */
  size?: RatingStarProps['size']
  /**
   * Name of the underlying input.
   * @default undefined
   */
  name?: string
  /**
   * id of the underlying input.
   * @default undefined
   */
  id?: string
  /**
   * aria-label of the underlying input.
   * @default undefined
   */
  'aria-label': string
}

export const Rating = ({
  defaultValue,
  value: propValue,
  onValueChange,
  size = 'md',
  disabled,
  readOnly,
  name,
  id,
  'aria-label': ariaLabel,
  ref,
  ...rest
}: RatingProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const starRefList = useRef<HTMLDivElement[]>([])

  const [value, setRatingValue] = useCombinedState(propValue, defaultValue, onValueChange)

  const valueRef = useRef(value)
  const isInteractive = !(disabled || readOnly)

  function onStarClick(index: number) {
    if (!inputRef.current) return

    setRatingValue(index + 1)
    valueRef.current = index + 1

    inputRef.current.focus()
    inputRef.current.setAttribute('data-clicked', '')
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    // 1. Avoiding unnecessary calls to onValueChange prop if value doesn't change
    // 2. Preventing value to be resetted to 0
    if (valueRef.current === Number(event.target.value) || Number(event.target.value) === 0) {
      return
    }
    valueRef.current = Number(event.target.value)

    setRatingValue(Number(event.target.value))
  }

  function onStarMouseEnter({ currentTarget }: MouseEvent<HTMLDivElement>) {
    const currentStarIndex = starRefList.current.findIndex(star => star === currentTarget)

    const [previousStars, followingStars] = splitAt(starRefList.current, currentStarIndex + 1)

    previousStars.forEach(star => star.setAttribute('data-hovered', ''))
    followingStars.forEach(star => star.removeAttribute('data-hovered'))
  }

  const handleStarRef = useCallback((elm: HTMLDivElement | null) => {
    if (!elm) return
    starRefList.current.push(elm)
  }, [])

  function resetDataPartInputAttr() {
    inputRef.current?.removeAttribute('data-clicked')
  }

  function resetDataPartStarAttr() {
    starRefList.current.forEach(star => star.removeAttribute('data-hovered'))
  }

  return (
    <div
      className="relative inline-flex"
      ref={ref}
      data-spark-component="rating"
      {...rest}
      onMouseLeave={resetDataPartStarAttr}
    >
      <input
        name={name}
        id={id}
        aria-label={ariaLabel}
        ref={inputRef}
        data-part="input"
        className="peer absolute inset-0 opacity-0"
        type="range"
        min="0"
        max="5"
        step={readOnly ? 0.5 : 1}
        disabled={disabled}
        readOnly={readOnly}
        value={getNearestHalfDecimal(value ?? 0)}
        onChange={event => isInteractive && onInputChange(event)}
        onBlur={resetDataPartInputAttr}
      />
      <div
        className={cx(
          size === 'lg' ? 'gap-x-md' : 'gap-x-sm',
          'flex',
          'peer-focus-visible:u-outline peer-[[data-part=input][data-clicked]]:shadow-none'
        )}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingStar
            disabled={disabled}
            readOnly={readOnly}
            size={size}
            onClick={() => isInteractive && onStarClick(index)}
            onMouseEnter={event => isInteractive && onStarMouseEnter(event)}
            ref={handleStarRef}
            key={index}
            value={getStarValue({ index, value })}
          />
        ))}
      </div>
    </div>
  )
}
