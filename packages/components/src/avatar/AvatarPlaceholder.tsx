import { cx } from 'class-variance-authority'

import { useAvatarContext } from './context'

export interface AvatarPlaceholderProps extends React.ImgHTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export const AvatarPlaceholder = ({ className, children, ...props }: AvatarPlaceholderProps) => {
  const { size, username } = useAvatarContext()

  const firstLetter = username?.charAt(0)

  return (
    <div
      className={cx(
        'absolute inset-0 flex size-full items-center justify-center',
        'default:bg-neutral default:text-on-neutral',
        {
          'text-display-1': size === '2xl',
          'text-display-2': ['xl', 'lg'].includes(size),
          'text-display-3': size === 'md',
          'text-headline-2': size === 'sm',
          'text-body-2 font-bold': size === 'xs',
        },
        className
      )}
      {...props}
    >
      {children || firstLetter}
    </div>
  )
}

AvatarPlaceholder.displayName = 'AvatarPlaceholder'
