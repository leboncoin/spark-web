import { ComponentPropsWithRef, CSSProperties } from 'react'

import {
  type SkeletonItemStyleProps,
  skeletonItemStyles,
  skeletonLineStyles,
} from './SkeletonItem.styles'

interface SkeletonItemProps extends ComponentPropsWithRef<'div'>, SkeletonItemStyleProps {}

export type SkeletonRectangleProps = Omit<SkeletonItemProps, 'shape'> & {
  width?: string | number
  height?: string | number
}
export type SkeletonCircleProps = Omit<SkeletonItemProps, 'shape'> & { size: string | number }
export type SkeletonLineProps = Omit<SkeletonItemProps, 'shape'> & {
  lines?: number
  /**
   * Sets the gaps between group items.
   */
  gap?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const getSizeValue = (size?: number | string): string | undefined => {
  if (typeof size === 'number') return `${size}px`

  return size
}

const SkeletonItem = ({ shape, className, ref: forwardedRef, ...rest }: SkeletonItemProps) => {
  return (
    <div
      ref={forwardedRef}
      aria-hidden="true"
      className={skeletonItemStyles({ shape, className })}
      {...rest}
    />
  )
}

export const SkeletonRectangle = ({ width = '100%', height, ...rest }: SkeletonRectangleProps) => {
  return (
    <SkeletonItem
      style={
        {
          '--skeleton-rect-width': getSizeValue(width),
          '--skeleton-rect-height': getSizeValue(height),
        } as CSSProperties
      }
      className="h-(--skeleton-rect-height) w-(--skeleton-rect-width)"
      {...rest}
      shape="rectangle"
      data-shape="rectangle"
    />
  )
}

export const SkeletonCircle = ({ size, ...rest }: SkeletonCircleProps) => (
  <SkeletonItem
    style={{ '--skeleton-circle-size': getSizeValue(size) } as CSSProperties}
    className="size-(--skeleton-circle-size)"
    {...rest}
    shape="circle"
    data-shape="circle"
  />
)

export const SkeletonLine = ({
  lines = 1,
  gap: gapProp,
  className,
  ...rest
}: SkeletonLineProps) => {
  const gap = gapProp || 'md'

  return (
    <div className={skeletonLineStyles({ gap, className })} aria-hidden="true">
      {[...new Array(lines)].map((_, index) => (
        <SkeletonItem key={`line_${index}`} {...rest} shape="line" data-shape="line" />
      ))}
    </div>
  )
}

SkeletonRectangle.displayName = 'Skeleton.Rectangle'
SkeletonCircle.displayName = 'Skeleton.Circle'
SkeletonLine.displayName = 'Skeleton.Line'
