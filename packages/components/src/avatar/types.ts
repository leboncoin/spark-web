import * as React from 'react'
import { AvatarImage } from './AvatarImage'
import { AvatarAction } from './AvatarAction'

export interface AvatarContextValue {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  isOnline: boolean
  onlineText?: string
  username: string
  src?: string
  design: 'circle' | 'square'
  pixelSize: number
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  isOnline?: boolean
  onlineText?: string
  username: string
  asChild?: boolean
  design?: 'circle' | 'square'
}

export interface AvatarComponent
  extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>> {
  Image: typeof AvatarImage
  Action: typeof AvatarAction
}
