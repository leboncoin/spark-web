import { Avatar } from './Avatar'
import { AvatarImage } from './AvatarImage'
import { AvatarAction } from './AvatarAction'
import { AvatarOnlineBadge } from './AvatarOnlineBadge'
import { AvatarUser } from './AvatarUser'
import { AvatarPlaceholder } from './AvatarPlaceholder'
import type { AvatarProps } from './types'

export interface AvatarComponent
  extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>> {
  Image: typeof AvatarImage
  Action: typeof AvatarAction
  OnlineBadge: typeof AvatarOnlineBadge
  User: typeof AvatarUser
  Placeholder: typeof AvatarPlaceholder
}

const AvatarComponent = Avatar as AvatarComponent

AvatarComponent.Image = AvatarImage
AvatarComponent.Action = AvatarAction
AvatarComponent.OnlineBadge = AvatarOnlineBadge
AvatarComponent.User = AvatarUser
AvatarComponent.Placeholder = AvatarPlaceholder
export { AvatarComponent as Avatar }
