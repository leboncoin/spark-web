import { useMemo, useState, RefObject } from 'react'

import { useResizeObserver } from './useResizeObserver'
import { getSnapPositions } from './utils'

/**
 * Get the scroll value of each slides that serves as the start of a page
 * The array is updated when resize event are caught in the carousel.
 */
export function useSnapPoints<T extends HTMLDivElement | null>(
  initialSnapPoints: number[] = [],
  {
    carouselRef,
    slidesPerMove,
    slidesPerPage,
  }: {
    carouselRef: RefObject<T>
    slidesPerMove: 'auto' | number
    slidesPerPage: number
  }
) {
  const [pageSnapPoints, setPageSnapPoints] = useState(initialSnapPoints)

  const stableSnapPoints = useMemo(() => pageSnapPoints, [pageSnapPoints])

  /**
   * On resize, dimensions of the carousel might changes, which requires to update the snap points positions in the state.
   */
  useResizeObserver(carouselRef, () => {
    const newSnapPoints = getSnapPositions({
      slidesPerMove,
      slidesPerPage,
      container: carouselRef.current,
    })

    if (JSON.stringify(pageSnapPoints) !== JSON.stringify(newSnapPoints)) {
      setPageSnapPoints(newSnapPoints)
    }
  })

  return [stableSnapPoints, setPageSnapPoints] as const
}
