import { Backdrop } from './Backdrop'
import { Card as Root } from './Card'
import { Content } from './Content'

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
