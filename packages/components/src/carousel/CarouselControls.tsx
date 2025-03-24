import { ReactNode } from 'react'

import { useCarouselContext } from './Carousel'

interface ControlsProps {
  children: ReactNode
}

export const CarouselControls = ({ children }: ControlsProps) => {
  const ctx = useCarouselContext()

  return (
    <div
      className="default:px-lg pointer-events-none absolute inset-0 flex flex-row items-center justify-between"
      {...ctx.getControlProps()}
    >
      {children}
    </div>
  )
}

CarouselControls.displayName = 'Carousel.Controls'
