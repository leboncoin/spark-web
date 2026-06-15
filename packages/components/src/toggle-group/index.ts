import { ToggleGroup as Root } from './ToggleGroup'
import { ToggleGroupToggle as Toggle } from './ToggleGroupToggle'

/**
 * A set of two-state buttons that can be toggled on or off within a group context.
 */
export const ToggleGroup: typeof Root & {
  Toggle: typeof Toggle
} = Object.assign(Root, {
  Toggle,
})

ToggleGroup.displayName = 'ToggleGroup'
Toggle.displayName = 'ToggleGroup.Toggle'

export { type ToggleGroupProps } from './ToggleGroup'
export { type ToggleGroupToggleProps } from './ToggleGroupToggle'
