import { useRender } from '@base-ui/react/use-render'
import * as React from 'react'

import { AvatarAction } from './AvatarAction'
import { AvatarImage } from './AvatarImage'

export interface AvatarContextValue {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  isOnline: boolean
  onlineText?: string
  username: string
  src?: string
  shape: 'circle' | 'square'
  pixelSize: number
}

export interface AvatarProps extends useRender.ComponentProps<'div'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  isOnline?: boolean
  onlineText?: string
  username: string
  shape?: 'circle' | 'square'
}

export interface AvatarComponent
  extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>> {
  Image: typeof AvatarImage
  Action: typeof AvatarAction
}
