import { cx } from 'class-variance-authority'
import { useState } from 'react'

import { Slot } from '../slot'
import { useAvatarContext } from './context'

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  asChild?: boolean
}

export const AvatarImage = ({ className, asChild, src, ...props }: AvatarImageProps) => {
  const { username, isOnline, onlineText } = useAvatarContext()
  const Comp = asChild ? Slot : 'img'

  const [isVisible, setIsVisible] = useState(false)

  const accessibleName = isOnline && onlineText ? `${username} (${onlineText})` : username

  return (
    <Comp
      className={cx(
        'absolute inset-0 size-full',
        'object-cover',
        { 'transition-all duration-300 group-hover:scale-120': props.onClick },
        'focus-visible:u-outline',
        isVisible ? 'block' : 'hidden',
        className
      )}
      alt={accessibleName}
      src={src}
      onLoad={() => {
        setIsVisible(true)
      }}
      {...props}
    />
  )
}

AvatarImage.displayName = 'AvatarImage'
