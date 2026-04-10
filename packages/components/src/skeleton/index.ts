import { Skeleton as Root } from './Skeleton'
import {
  SkeletonCircle as Circle,
  SkeletonLine as Line,
  SkeletonRectangle as Rectangle,
} from './SkeletonItem'

/**
 * A placeholder component that displays a loading state with animated shimmer effect.
 */
export const Skeleton: typeof Root & {
  Circle: typeof Circle
  Line: typeof Line
  Rectangle: typeof Rectangle
} = Object.assign(Root, {
  Circle,
  Line,
  Rectangle,
})

Skeleton.displayName = 'Skeleton'
Line.displayName = 'Skeleton.Line'
Circle.displayName = 'Skeleton.Circle'
Rectangle.displayName = 'Skeleton.Rectangle'

export type { SkeletonProps } from './Skeleton'
