import { RatingDisplay as Root } from './RatingDisplay'
import { RatingDisplayCount as Count } from './RatingDisplayCount'
import { RatingDisplayStars as Stars } from './RatingDisplayStars'
import { RatingDisplayValue as Value } from './RatingDisplayValue'

export const RatingDisplay: typeof Root & {
  Stars: typeof Stars
  Value: typeof Value
  Count: typeof Count
} = Object.assign(Root, {
  Stars,
  Value,
  Count,
})

RatingDisplay.displayName = 'RatingDisplay'
Stars.displayName = 'RatingDisplay.Stars'
Value.displayName = 'RatingDisplay.Value'
Count.displayName = 'RatingDisplay.Count'

export { type RatingDisplayProps, type RatingDisplayRootProps } from './RatingDisplay'
export { type RatingDisplayStarsProps } from './RatingDisplayStars'
export { type RatingDisplayValueProps } from './RatingDisplayValue'
export { type RatingDisplayCountProps } from './RatingDisplayCount'
export type { StarValue } from './types'
