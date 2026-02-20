import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { type DOMAttributes, Ref, useMemo } from 'react'

import { Spinner, type SpinnerProps } from '../spinner'
import { buttonStyles, type ButtonStylesProps } from './Button.styles'

export interface ButtonProps
  extends useRender.ComponentProps<'button'>,
    Omit<ButtonStylesProps, 'disabled'> {
  /**
   * Display a spinner to indicate to the user that the button is loading something after they interacted with it.
   */
  isLoading?: boolean
  /**
   * If your loading state should only display a spinner, it is better to specify a label for it (a11y).
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
  render,
  className,
  underline = false,
  ref,
  ...others
}: ButtonProps) => {
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

  const resolvedChildren = isLoading ? (
    <>
      <Spinner {...spinnerProps} />
      {loadingText && loadingText}

      <div aria-hidden className={cx('gap-md', loadingText ? 'hidden' : 'inline-flex opacity-0')}>
        {children}
      </div>
    </>
  ) : (
    children
  )

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'button',
    type: 'button',
    children: resolvedChildren,
    className: buttonStyles({
      className,
      design,
      disabled: shouldNotInteract,
      intent,
      shape,
      size,
      underline,
    }),
    disabled: !!disabled,
    'aria-busy': isLoading,
    'aria-live': isLoading ? 'assertive' : 'off',
    ...disabledEventHandlers,
  }

  const propsToMerge = shouldNotInteract
    ? (() => {
        const {
          onClick: _onClick,
          onKeyDown: _onKeyDown,
          onKeyPress: _onKeyPress,
          onKeyUp: _onKeyUp,
          onMouseDown: _onMouseDown,
          onMouseEnter: _onMouseEnter,
          onMouseLeave: _onMouseLeave,
          onMouseOut: _onMouseOut,
          onMouseOver: _onMouseOver,
          onMouseUp: _onMouseUp,
          onSubmit: _onSubmit,
          ...rest
        } = others

        return rest
      })()
    : others

  return useRender({
    defaultTagName: 'button',
    render,
    ref,
    props: mergeProps<'button'>(defaultProps, propsToMerge),
  })
}

Button.displayName = 'Button'
