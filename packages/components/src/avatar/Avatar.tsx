import { cx } from 'class-variance-authority'
import * as React from 'react'

import { Slot } from '../slot'
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
      asChild,
      children,
      shape = 'circle',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div'
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

    return (
      <AvatarContext.Provider value={contextValue}>
        <Comp
          ref={ref}
          style={{
            width: sizeMap[size],
            height: sizeMap[size],
          }}
          data-spark-component="avatar"
          className={cx('relative inline-flex items-center justify-center', className)}
          {...props}
        >
          {children}
        </Comp>
      </AvatarContext.Provider>
    )
  }
)

Avatar.displayName = 'Avatar'
