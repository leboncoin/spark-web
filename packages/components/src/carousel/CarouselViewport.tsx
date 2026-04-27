import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * The viewport container that displays the carousel. Renders a <div> element.
 */
export const CarouselViewport = ({ children }: Props) => {
  return <div className="relative flex items-center justify-around p-0">{children}</div>
}

CarouselViewport.displayName = 'Carousel.Viewport'
