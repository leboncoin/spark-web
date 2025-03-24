import { cx } from 'class-variance-authority'
import { createContext, ReactNode, useContext } from 'react'

import { CarouselAPI, UseCarouselProps } from './types'
import { useCarousel } from './useCarousel'

interface Props extends UseCarouselProps {
  children?: ReactNode
  className?: string
}

const CarouselContext = createContext<CarouselAPI | null>(null)

export const Carousel = ({
  className,
  snapType = 'mandatory',
  snapStop = 'always',
  scrollBehavior = 'smooth',
  slidesPerMove = 'auto',
  slidesPerPage = 1,
  loop = false,
  children,
  gap = 16,
  defaultPage,
  page,
  onPageChange,
}: Props) => {
  const carouselApi = useCarousel({
    defaultPage,
    slidesPerPage,
    slidesPerMove,
    loop,
    gap,
    scrollBehavior,
    snapStop,
    snapType,
    page,
    onPageChange,
  })

  return (
    <CarouselContext.Provider
      value={{
        ...carouselApi,
        scrollBehavior,
      }}
    >
      <div
        className={cx('gap-lg relative box-border flex flex-col', className)}
        {...carouselApi.getRootProps()}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

Carousel.displayName = 'Carousel'

export const useCarouselContext = () => {
  const context = useContext(CarouselContext)

  if (!context) {
    throw Error('useCarouselContext must be used within a Carousel provider')
  }

  return context
}
