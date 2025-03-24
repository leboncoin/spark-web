import { ComponentPropsWithRef, PropsWithChildren } from 'react'

import { VisuallyHidden } from '../visually-hidden'
import { spinnerStyles, SpinnerStylesProps } from './Spinner.styles'

export interface SpinnerProps extends ComponentPropsWithRef<'div'>, SpinnerStylesProps {
  /**
   * Use `label` prop for accessibility, it is important to add a fallback loading text. This text will be visible to screen readers.
   */
  label?: string
}

export const Spinner = ({
  className,
  size = 'current',
  intent = 'current',
  label,
  isBackgroundVisible,
  ref,
  ...others
}: PropsWithChildren<SpinnerProps>) => {
  return (
    <span
      role="status"
      data-spark-component="spinner"
      ref={ref}
      className={spinnerStyles({ className, size, intent, isBackgroundVisible })}
      {...others}
    >
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </span>
  )
}
