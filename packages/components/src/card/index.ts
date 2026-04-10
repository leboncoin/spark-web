import { Backdrop } from './Backdrop'
import { Card as Root } from './Card'
import { Content } from './Content'

/**
 * A container component that groups related content and actions in a single, styled surface.
 */
export const Card: typeof Root & {
  Content: typeof Content
  Backdrop: typeof Backdrop
} = Object.assign(Root, {
  Content,
  Backdrop,
})

Card.displayName = 'Card'
Content.displayName = 'Card.Content'
Backdrop.displayName = 'Card.Backdrop'

export { type CardProps } from './Card'
