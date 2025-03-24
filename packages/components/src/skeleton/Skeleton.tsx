import { ComponentPropsWithRef, PropsWithChildren } from 'react'

import { VisuallyHidden } from '../visually-hidden'
import { type SkeletonStyleProps, skeletonStyles } from './Skeleton.styles'

export interface SkeletonProps extends ComponentPropsWithRef<'div'>, SkeletonStyleProps {
  /**
   * Displays an animated light effect.
   * @default true
   */
  isAnimated?: boolean
  /**
   * Adds an accessible fallback label.
   */
  label?: string
}

export const Skeleton = ({
  isAnimated = true,
  label,
  className,
  children,
  ref: forwardedRef,
  ...rest
}: PropsWithChildren<SkeletonProps>) => (
  <div
    ref={forwardedRef}
    data-spark-component="skeleton"
    role="presentation"
    className={skeletonStyles({ isAnimated, className })}
    {...rest}
  >
    {children}

    {label && <VisuallyHidden>{label}</VisuallyHidden>}
  </div>
)

Skeleton.displayName = 'Skeleton'
