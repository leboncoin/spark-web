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

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  isOnline?: boolean
  onlineText?: string
  username: string
  asChild?: boolean
  shape?: 'circle' | 'square'
}

export interface AvatarComponent
  extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>> {
  Image: typeof AvatarImage
  Action: typeof AvatarAction
}
