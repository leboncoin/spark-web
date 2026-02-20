import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { useEffect, useState } from 'react'

import { useAvatarContext } from './context'

export interface AvatarImageProps
  extends useRender.ComponentProps<'img'>,
    Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onLoad' | 'onError'> {}

export const AvatarImage = ({
  className,
  render,
  src,
  onLoad,
  onError,
  ...props
}: AvatarImageProps) => {
  const { username, isOnline, onlineText } = useAvatarContext()

  const [isVisible, setIsVisible] = useState(false)

  const accessibleName = isOnline && onlineText ? `${username} (${onlineText})` : username

  // Reset visibility when src changes
  useEffect(() => {
    setIsVisible(false)
  }, [src])

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsVisible(true)
    onLoad?.(event)
  }

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsVisible(false)
    onError?.(event)
  }

  const defaultProps: Record<string, unknown> = {
    'aria-hidden': true,
    className: cx(
      'absolute inset-0 size-full',
      'object-cover',
      { 'transition-all duration-300 group-hover:scale-120': props.onClick },
      'focus-visible:u-outline',
      isVisible ? 'block' : 'hidden',
      className
    ),
    alt: accessibleName,
    src,
    onLoad: handleLoad,
    onError: handleError,
  }

  const element = useRender({
    defaultTagName: 'img',
    render,
    props: mergeProps<'img'>(defaultProps, props),
  })

  // Don't render the image if src is undefined or null
  if (!src) {
    return null
  }

  return element
}

AvatarImage.displayName = 'AvatarImage'
