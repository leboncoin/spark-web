import { cx } from 'class-variance-authority'
import { ReactNode, useEffect, useRef } from 'react'

import { useCarouselContext } from './Carousel'

interface Props {
  children?: ReactNode
  'aria-label': string
  index: number
  className?: string
  unstyled?: boolean
  intent?: 'basic' | 'surface'
}

export const CarouselPageIndicator = ({
  children,
  unstyled = false,
  index,
  'aria-label': ariaLabel,
  className,
  intent = 'basic',
}: Props) => {
  const ctx = useCarouselContext()

  const ref = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (ctx.pageIndicatorsRefs.current) {
      ctx.pageIndicatorsRefs.current[index] = ref.current
    }
  })

  const indicatorProps = ctx.getIndicatorProps({ index })

  return (
    <button
      data-spark-component="carousel-page-indicator"
      ref={ref}
      key={index}
      {...indicatorProps}
      aria-label={ariaLabel}
      className={cx(
        {
          [cx(
            'border-outline group relative flex justify-center border-0 hover:cursor-pointer',
            'm-sm rounded-sm transition-all duration-[200ms] ease-linear',
            'w-sz-8 h-sz-8',
            'data-[state=active]:w-sz-32 data-[state=active]:h-sz-8',
            'data-[state=edge]:w-sz-4 data-[state=edge]:h-sz-4',
            'data-[state=hidden]:m-0 data-[state=hidden]:size-0',
            intent === 'surface'
              ? 'data-[state=active]:bg-surface bg-surface/dim-2'
              : 'data-[state=active]:bg-basic bg-on-surface/dim-2'
          )]: !unstyled,
          // [dotsStyles]: !unstyled,
        },
        className
      )}
    >
      {children}
    </button>
  )
}

CarouselPageIndicator.displayName = 'Carousel.PageIndicator'
