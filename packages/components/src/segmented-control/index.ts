import { SegmentedControl as Root } from './SegmentedControl'
import { SegmentedControlIndicator as Indicator } from './SegmentedControlIndicator'
import { SegmentedControlItem as Item } from './SegmentedControlItem'

/**
 * A set of toggle buttons that allows users to select a single option from a group of related choices.
 */
export const SegmentedControl: typeof Root & {
  Item: typeof Item
  Indicator: typeof Indicator
} = Object.assign(Root, {
  Item,
  Indicator,
})

SegmentedControl.displayName = 'SegmentedControl'
Item.displayName = 'SegmentedControl.Item'
Indicator.displayName = 'SegmentedControl.Indicator'

export type { SegmentedControlProps } from './SegmentedControl'
export type { SegmentedControlItemProps } from './SegmentedControlItem'
export type { SegmentedControlIndicatorProps } from './SegmentedControlIndicator'
