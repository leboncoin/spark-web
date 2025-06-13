import { cx } from 'class-variance-authority'
import { HTMLAttributes, ReactNode } from 'react'

import { useCarouselContext } from './Carousel'

interface ControlsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CarouselControls = ({ children, className, ...props }: ControlsProps) => {
  const ctx = useCarouselContext()

  return (
    <div
      data-spark-component="carousel-controls"
      className={cx(
        'default:px-lg pointer-events-none absolute inset-0 flex flex-row items-center justify-between',
        className
      )}
      {...ctx.getControlProps()}
      {...props}
    >
      {children}
    </div>
  )
}

CarouselControls.displayName = 'Carousel.Controls'
