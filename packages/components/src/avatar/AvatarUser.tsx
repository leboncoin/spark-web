import { cx } from 'class-variance-authority'

import { Slot } from '../slot'
import { useAvatarContext } from './context'

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export const AvatarUser = ({ asChild, children, className, ...props }: AvatarImageProps) => {
  const { design, isOnline, onlineText, username } = useAvatarContext()
  const Comp = asChild ? Slot : 'div'

  const accessibleName = isOnline && onlineText ? `${username} (${onlineText})` : username

  return (
    <Comp
      aria-label={accessibleName}
      title={accessibleName}
      className={cx(
        'group default:border-outline relative size-full overflow-hidden',
        'focus-visible:u-outline',
        {
          'default:rounded-full': design === 'circle',
          'default:rounded-md': design === 'square',
          'hover:opacity-dim-1 cursor-pointer': asChild || props.onClick,
        },
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

AvatarUser.displayName = 'AvatarUser'
