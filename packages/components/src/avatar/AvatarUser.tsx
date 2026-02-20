import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'

import { useAvatarContext } from './context'

export interface AvatarImageProps extends useRender.ComponentProps<'div'> {
  children?: React.ReactNode
}

export const AvatarUser = ({ render, children, className, ...props }: AvatarImageProps) => {
  const { shape, isOnline, onlineText, username } = useAvatarContext()

  const accessibleName = isOnline && onlineText ? `${username} (${onlineText})` : username
  const hasCustomRender = !!render

  const defaultProps: Record<string, unknown> = {
    ...(!hasCustomRender && { role: 'img' }),
    'aria-label': accessibleName,
    title: accessibleName,
    className: cx(
      'group default:border-outline relative size-full overflow-hidden',
      'focus-visible:u-outline',
      {
        'default:rounded-full': shape === 'circle',
        'default:rounded-md': shape === 'square',
        'hover:opacity-dim-1 cursor-pointer': hasCustomRender || !!props.onClick,
      },
      className
    ),
    children,
  }

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(defaultProps, props),
  })
}

AvatarUser.displayName = 'AvatarUser'
