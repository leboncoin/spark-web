import { Avatar as Root } from './Avatar'
import { AvatarAction } from './AvatarAction'
import { AvatarImage } from './AvatarImage'
import { AvatarOnlineBadge } from './AvatarOnlineBadge'
import { AvatarPlaceholder } from './AvatarPlaceholder'
import { AvatarUser } from './AvatarUser'

/**
 * A graphical representation of a user, typically displaying an image, initials, or icon.
 */
export const Avatar: typeof Root & {
  Image: typeof AvatarImage
  Action: typeof AvatarAction
  OnlineBadge: typeof AvatarOnlineBadge
  User: typeof AvatarUser
  Placeholder: typeof AvatarPlaceholder
} = Object.assign(Root, {
  Image: AvatarImage,
  Action: AvatarAction,
  OnlineBadge: AvatarOnlineBadge,
  User: AvatarUser,
  Placeholder: AvatarPlaceholder,
})

Avatar.displayName = 'Avatar'
AvatarImage.displayName = 'Avatar.Image'
AvatarAction.displayName = 'Avatar.Action'
AvatarOnlineBadge.displayName = 'Avatar.OnlineBadge'
AvatarUser.displayName = 'Avatar.User'
AvatarPlaceholder.displayName = 'Avatar.Placeholder'

export type { AvatarProps } from './types'
