import * as React from 'react'

import type { AvatarContextValue } from './types'

const AvatarContext = React.createContext<AvatarContextValue | undefined>(undefined)

export const useAvatarContext = () => {
  const context = React.useContext(AvatarContext)
  if (!context) {
    throw new Error('useAvatarContext must be used within an Avatar component')
  }

  return context
}

export { AvatarContext }
