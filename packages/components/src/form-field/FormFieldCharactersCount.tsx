import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, Ref, useEffect, useState } from 'react'

import { FormFieldMessage } from './FormFieldMessage'

export type FormFieldCharactersCountProps = ComponentPropsWithoutRef<'span'> & {
  /**
   * This description is for the screen reader, read when the input is focused.
   */
  description?: string
  /**
   * The live announcement is for the screen read after a delay once the input value changes.
   */
  liveAnnouncement?: ({ remainingChars }: { remainingChars: number }) => string
  /**
   * Current value for the input this component belongs to.
   */
  value?: string
  /**
   * Maximum numeric value to be displayed.
   */
  maxLength: number
  ref?: Ref<HTMLSpanElement>
}

export const FormFieldCharactersCount = ({
  className,
  value = '',
  maxLength,
  description,
  liveAnnouncement,
  ref,
  ...others
}: FormFieldCharactersCountProps) => {
  const [throttledValue, setThrottledValue] = useState(value)

  /**
   * The value is throttled to avoid spamming the aria-live region (and consequently the screen reader).
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setThrottledValue(value)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [value])

  return (
    <span className="ml-auto self-start">
      {description && (
        <FormFieldMessage className="default:sr-only">{description}</FormFieldMessage>
      )}
      <span
        ref={ref}
        aria-hidden
        data-spark-component="form-field-characters-count"
        className={cx(className, 'text-caption', 'text-neutral')}
        {...others}
      >
        {`${value.length}/${maxLength}`}
      </span>

      {liveAnnouncement && (
        <span className="sr-only" aria-live="polite">
          {liveAnnouncement({ remainingChars: maxLength - throttledValue.length })}
        </span>
      )}
    </span>
  )
}

FormFieldCharactersCount.displayName = 'FormField.CharactersCount'
