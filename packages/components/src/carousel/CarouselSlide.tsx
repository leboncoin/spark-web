import { cx } from 'class-variance-authority'
import { ComponentProps, ReactNode, useRef } from 'react'

import { useCarouselContext } from './Carousel'
import { useIsVisible } from './useIsVisible'

export interface CarouselSlideProps extends ComponentProps<'div'> {
  isSnapPoint?: boolean
  children?: ReactNode
  index?: number
  totalSlides?: number
  className?: string
}

export const CarouselSlide = ({
  children,
  index = 0,
  totalSlides,
  className = '',
  ...props
}: CarouselSlideProps) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const ctx = useCarouselContext()

  const isVisible = useIsVisible(itemRef, ctx.ref)

  return (
    <div
      ref={itemRef}
      {...ctx.getSlideProps({ index, totalSlides: totalSlides as number })}
      className={cx('default:bg-surface relative overflow-hidden', className)}
      aria-hidden={!isVisible}
      inert={!isVisible}
      {...props}
    >
      {children}
    </div>
  )
}

CarouselSlide.displayName = 'Carousel.Slide'
