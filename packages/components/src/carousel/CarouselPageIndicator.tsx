import { cx } from 'class-variance-authority'
import { ReactNode, useEffect, useRef } from 'react'

import { useCarouselContext } from './Carousel'

interface Props {
  children?: ReactNode
  'aria-label': string
  index: number
  className?: string
  unstyled?: boolean
}

export const CarouselPageIndicator = ({
  children,
  unstyled = false,
  index,
  'aria-label': ariaLabel,
  className,
}: Props) => {
  const ctx = useCarouselContext()

  const ref = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (ctx.pageIndicatorsRefs.current) {
      ctx.pageIndicatorsRefs.current[index] = ref.current
    }
  })

  const styles = cx(
    'group h-sz-16 relative flex',
    'hover:cursor-pointer',
    'w-sz-16 data-[state=active]:w-sz-44'
  )

  const dotsStyles = cx(
    'before:rounded-sm before:block before:size-md',
    'before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
    'data-[state=active]:before:w-sz-32 data-[state=active]:before:bg-basic',
    'data-[state=inactive]:before:bg-on-surface/dim-3'
  )

  return (
    <button
      ref={ref}
      key={index}
      {...ctx.getIndicatorProps({ index })}
      aria-label={ariaLabel}
      className={cx(
        {
          [styles]: !unstyled,
          [dotsStyles]: !unstyled,
        },
        className
      )}
    >
      {children}
    </button>
  )
}

CarouselPageIndicator.displayName = 'Carousel.PageIndicator'
