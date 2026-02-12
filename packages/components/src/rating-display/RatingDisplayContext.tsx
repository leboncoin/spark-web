import { createContext, type PropsWithChildren, useContext } from 'react'

import type { RatingDisplayStarProps } from './RatingDisplayStar'

interface RatingDisplayContextValue {
  value: number
  size: RatingDisplayStarProps['size']
  count?: number
}

const RatingDisplayContext = createContext<RatingDisplayContextValue | null>(null)

interface RatingDisplayProviderProps extends PropsWithChildren<RatingDisplayContextValue> {}

export const RatingDisplayProvider = ({
  value,
  size,
  count,
  children,
}: RatingDisplayProviderProps) => {
  return (
    <RatingDisplayContext.Provider value={{ value, size, count }}>
      {children}
    </RatingDisplayContext.Provider>
  )
}

export const useRatingDisplay = () => {
  const context = useContext(RatingDisplayContext)
  if (!context) {
    throw new Error('RatingDisplay compound components must be used within RatingDisplay.')
  }

  return context
}
