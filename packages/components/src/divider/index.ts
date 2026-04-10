import { Divider as Root } from './Divider'
import { DividerContent } from './DividerContent'

export { type DividerContentProps } from './DividerContent'

/**
 * A visual separator that divides content into distinct sections or groups.
 */
export const Divider: typeof Root & {
  Content: typeof DividerContent
} = Object.assign(Root, {
  Content: DividerContent,
})

Divider.displayName = 'Divider'
Divider.Content.displayName = 'Divider.Content'
