import { Card as Root } from './Card'
import { Content } from './Content'
import { Type } from './Type'

/**
 * A container component that groups related content and actions in a single, styled surface.
 */
export const Card: typeof Root & {
  Content: typeof Content
  Type: typeof Type
} = Object.assign(Root, {
  Content,
  Type,
})

Card.displayName = 'Card'
Content.displayName = 'Card.Content'
Type.displayName = 'Card.Type'

export { type CardProps } from './Card'
export { type TypeProps } from './Type'
