import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import * as React from 'react'

import { AvatarContext } from './context'
import type { AvatarProps } from './types'

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 64, // default
  '2xl': 96,
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = 'xl',
      isOnline = false,
      onlineText,
      username,
      render,
      children,
      shape = 'circle',
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({
        size,
        isOnline,
        onlineText,
        username,
        shape,
        pixelSize: sizeMap[size],
      }),
      [size, isOnline, username, shape, onlineText]
    )

    const defaultProps: Record<string, unknown> = {
      'data-spark-component': 'avatar',
      style: {
        width: sizeMap[size],
        height: sizeMap[size],
      },
      className: cx('relative inline-flex items-center justify-center', className),
      children,
    }

    const element = useRender({
      defaultTagName: 'div',
      render,
      ref,
      props: mergeProps<'div'>(defaultProps, props),
    })

    return <AvatarContext.Provider value={contextValue}>{element}</AvatarContext.Provider>
  }
)

Avatar.displayName = 'Avatar'
