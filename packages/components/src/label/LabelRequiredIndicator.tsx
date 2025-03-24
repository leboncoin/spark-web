import { cx } from 'class-variance-authority'
import { ComponentPropsWithRef } from 'react'

export type LabelRequiredIndicatorProps = ComponentPropsWithRef<'span'>

export const LabelRequiredIndicator = ({
  className,
  children = '*',
  ref,
  ...others
}: LabelRequiredIndicatorProps) => {
  return (
    <span
      ref={ref}
      data-spark-component="label-required-indicator"
      role="presentation"
      aria-hidden="true"
      className={cx(className, 'text-caption text-on-surface/dim-1')}
      {...others}
    >
      {children}
    </span>
  )
}

LabelRequiredIndicator.displayName = 'Label.RequiredIndicator'
