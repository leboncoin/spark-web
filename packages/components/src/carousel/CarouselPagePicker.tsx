import { cx } from 'class-variance-authority'
import { ReactNode } from 'react'

import { useCarouselContext } from './Carousel'
import { CarouselAPI } from './types'

interface RenderProps extends CarouselAPI {
  pages: number[]
}

interface Props {
  children: (renderProps: RenderProps) => ReactNode
  className?: string
}

export const CarouselPagePicker = ({ children, className }: Props) => {
  const ctx = useCarouselContext()

  return (
    <>
      <div
        {...ctx.getIndicatorGroupProps()}
        className={cx(
          'default:min-h-sz-16 flex w-full flex-wrap items-center justify-center',
          className
        )}
      >
        {ctx.pageSnapPoints.length <= 1
          ? null
          : children({
              ...ctx,
              pages: Array.from({ length: ctx.pageSnapPoints.length }, (_, i) => i),
            })}
      </div>
    </>
  )
}

CarouselPagePicker.displayName = 'Carousel.PagePicker'
