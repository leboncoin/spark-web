import { cx } from 'class-variance-authority'
import { useEffect, useState } from 'react'

import { Slot } from '../slot'
import { useAvatarContext } from './context'

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  asChild?: boolean
}

export const AvatarImage = ({
  className,
  asChild,
  src,
  onLoad,
  onError,
  ...props
}: AvatarImageProps) => {
  const { username, isOnline, onlineText } = useAvatarContext()
  const Comp = asChild ? Slot : 'img'

  const [isVisible, setIsVisible] = useState(false)

  const accessibleName = isOnline && onlineText ? `${username} (${onlineText})` : username

  // Reset visibility when src changes
  useEffect(() => {
    setIsVisible(false)
  }, [src])

  // Don't render the image if src is undefined or null
  if (!src) {
    return null
  }

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsVisible(true)
    onLoad?.(event)
  }

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsVisible(false)
    onError?.(event)
  }

  return (
    <Comp
      aria-hidden
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
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  )
}

AvatarImage.displayName = 'AvatarImage'
