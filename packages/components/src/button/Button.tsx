import { cx } from 'class-variance-authority'
import { ComponentPropsWithoutRef, type DOMAttributes, Ref, useMemo } from 'react'

import { Slot, wrapPolymorphicSlot } from '../slot'
import { Spinner, type SpinnerProps } from '../spinner'
import { buttonStyles, type ButtonStylesProps } from './Button.styles'

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'disabled'>,
    ButtonStylesProps {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   */
  asChild?: boolean
  /**
   * Display a spinner to indicate to the user that the button is loading something after they interacted with it.
   */
  isLoading?: boolean
  /**
   * If your loading state should only display a spinner, it's better to specify a label for it (a11y).
   */
  loadingLabel?: string
  /**
   * If your loading state should also display a label, you can use this prop instead of `loadingLabel`.
   * **Please note that using this can result in layout shifting when the Button goes from loading state to normal state.**
   */
  loadingText?: string
  ref?: Ref<HTMLButtonElement>
}

type DOMAttributesEventHandler = keyof Omit<
  DOMAttributes<HTMLButtonElement>,
  'children' | 'dangerouslySetInnerHTML'
>

const blockedEventHandlers: DOMAttributesEventHandler[] = [
  'onClick',
  'onMouseDown',
  'onMouseUp',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseOver',
  'onMouseOut',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onSubmit',
]

export const Button = ({
  children,
  design = 'filled',
  disabled = false,
  intent = 'main',
  isLoading = false,
  loadingLabel,
  loadingText,
  shape = 'rounded',
  size = 'md',
  asChild,
  className,
  ref,
  ...others
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button'

  const shouldNotInteract = !!disabled || isLoading

  const disabledEventHandlers = useMemo(() => {
    const result: Partial<Record<DOMAttributesEventHandler, () => void>> = {}

    if (shouldNotInteract) {
      blockedEventHandlers.forEach(eventHandler => (result[eventHandler] = undefined))
    }

    return result
  }, [shouldNotInteract])

  const spinnerProps = {
    size: 'current' as SpinnerProps['size'],
    className: loadingText ? 'inline-block' : 'absolute',
    ...(loadingLabel && { 'aria-label': loadingLabel }),
  }

  return (
    <Component
      data-spark-component="button"
      {...(Component === 'button' && { type: 'button' })}
      ref={ref}
      className={buttonStyles({
        className,
        design,
        disabled: shouldNotInteract,
        intent,
        shape,
        size,
      })}
      disabled={!!disabled}
      aria-busy={isLoading}
      aria-live={isLoading ? 'assertive' : 'off'}
      {...others}
      {...disabledEventHandlers}
    >
      {wrapPolymorphicSlot(asChild, children, slotted =>
        isLoading ? (
          <>
            <Spinner {...spinnerProps} />
            {loadingText && loadingText}

            <div
              aria-hidden
              className={cx('gap-md', loadingText ? 'hidden' : 'inline-flex opacity-0')}
            >
              {slotted}
            </div>
          </>
        ) : (
          slotted
        )
      )}
    </Component>
  )
}

Button.displayName = 'Button'
