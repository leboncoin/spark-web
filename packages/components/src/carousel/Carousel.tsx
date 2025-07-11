import { cx } from 'class-variance-authority'
import { ComponentProps, createContext, ReactNode, useContext } from 'react'

import { CarouselAPI, UseCarouselProps } from './types'
import { useCarousel } from './useCarousel'

interface Props extends UseCarouselProps, ComponentProps<'div'> {
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
  pagePickerInset = false,
  slidesPerPage = 1,
  loop = false,
  children,
  gap = 16,
  defaultPage,
  page,
  onPageChange,
  ...props
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
    pagePickerInset,
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
        data-spark-component="carousel"
        className={cx('gap-lg relative box-border flex flex-col', className)}
        {...carouselApi.getRootProps()}
        {...props}
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
