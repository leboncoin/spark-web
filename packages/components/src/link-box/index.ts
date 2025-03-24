import { LinkBox as Root } from './LinkBox'
import { LinkBoxLink } from './LinkBoxLink'
import { LinkBoxRaised } from './LinkBoxRaised'

export const LinkBox: typeof Root & {
  Link: typeof LinkBoxLink
  Raised: typeof LinkBoxRaised
} = Object.assign(Root, { Link: LinkBoxLink, Raised: LinkBoxRaised })

LinkBox.displayName = 'LinkBox'
LinkBox.Link.displayName = 'LinkBox.Link'
LinkBox.Raised.displayName = 'LinkBox.Raised'

export { type LinkBoxProps } from './LinkBox'
export { type LinkBoxLinkProps } from './LinkBoxLink'
