/* eslint-disable max-lines-per-function */
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  KeyboardEvent,
} from 'react'

import {
  CarouselAPI,
  ComputedControlProps,
  ComputedIndicatorGroupProps,
  ComputedIndicatorProps,
  ComputedRootProps,
  ComputedSlideGroupProps,
  ComputedSlideProps,
  ComputedTriggerProps,
  UseCarouselProps,
} from './types'
import { useEvent } from './useEvent'
import { useIsMounted } from './useIsMounted'
import { useScrollEnd } from './useScrollEnd'
import { useSnapPoints } from './useSnapPoints'
import { getSnapPositions, isSnapPoint } from './utils'

const DATA_SCOPE = 'carousel' as const
const DIRECTION = 'ltr' as const

export const useCarousel = ({
  defaultPage,
  gap = 16,
  snapType = 'mandatory',
  snapStop = 'always',
  scrollPadding = 0,
  slidesPerPage = 1,
  slidesPerMove = 'auto',
  scrollBehavior = 'smooth',
  loop = false,
  // state control
  page: controlledPage,
  onPageChange: onPageChangeProp,
}: UseCarouselProps): CarouselAPI => {
  const carouselId = useId()
  const [pageState, setPageState] = useState(defaultPage || controlledPage || 0)

  const carouselRef = useRef<HTMLDivElement>(null)
  const pageIndicatorsRefs = useRef<(HTMLElement | null)[]>([])
  const isMountedRef = useIsMounted()
  const isMounted = isMountedRef.current
  const onPageChange = useEvent(onPageChangeProp)

  const [pageSnapPoints] = useSnapPoints([], {
    carouselRef,
    slidesPerMove,
    slidesPerPage,
  })

  const canScrollPrev = useRef(loop || pageState > 0)
  const canScrollNext = useRef(loop || pageState < pageSnapPoints.length - 1)
  canScrollPrev.current = loop || pageState > 0
  canScrollNext.current = loop || pageState < pageSnapPoints.length - 1

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== pageState) {
        setPageState(page)
        onPageChange?.(page)
      }
    },
    [onPageChange, pageState]
  )

  const scrollTo = useCallback(
    (page: number, behavior: 'instant' | 'smooth') => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: pageSnapPoints[page],
          behavior: behavior === 'instant' ? 'auto' : 'smooth',
        })
        handlePageChange(page)
      }
    },
    [handlePageChange, pageSnapPoints]
  )

  const scrollPrev = useCallback(
    (cb?: (pageIndex: number) => void) => {
      if (canScrollPrev) {
        const targetPage =
          loop && pageState === 0 ? pageSnapPoints.length - 1 : Math.max(pageState - 1, 0)

        scrollTo(targetPage, scrollBehavior)
        cb?.(targetPage)
      }
    },
    [loop, pageSnapPoints, pageState, scrollBehavior, scrollTo]
  )

  const scrollNext = useCallback(
    (cb?: (pageIndex: number) => void) => {
      if (canScrollNext) {
        const targetPage =
          loop && pageState === pageSnapPoints.length - 1
            ? 0
            : Math.min(pageState + 1, pageSnapPoints.length - 1)

        scrollTo(targetPage, scrollBehavior)
        cb?.(targetPage)
      }
    },
    [loop, pageSnapPoints, pageState, scrollBehavior, scrollTo]
  )

  useEffect(() => {
    if (controlledPage != null) {
      scrollTo(controlledPage, scrollBehavior)
    }
  }, [controlledPage, scrollBehavior, scrollTo])

  /**
   * Set the default scroll position of the carousel based on `defaultPage`.
   * As this operation is done before the snap points are set in the state, we have to get them from the ref directly.
   */
  useLayoutEffect(() => {
    if (defaultPage != null && !isMounted && carouselRef.current) {
      const snapPositions = getSnapPositions({
        container: carouselRef.current,
        slidesPerMove,
        slidesPerPage,
      })

      carouselRef.current.scrollTo({
        left: snapPositions[defaultPage],
        behavior: 'instant',
      })
    }
  }, [defaultPage, isMounted, slidesPerMove, slidesPerPage])

  /**
   * Monitoring scrollend events inside the scrollable area to sync the carousel active page with current scroll position.
   * Scrollend has been chosen over "scroll" for performance reason.
   */
  const syncPageStateWithScrollPosition = useCallback(() => {
    if (!carouselRef.current || pageSnapPoints.length === 0) return

    const { scrollLeft } = carouselRef.current

    const distances = pageSnapPoints.map(pagePosition => Math.abs(scrollLeft - pagePosition))
    const pageInViewport = distances.indexOf(Math.min(...distances))

    if (pageInViewport !== -1) {
      handlePageChange(pageInViewport)
    }
  }, [pageSnapPoints, handlePageChange])

  useScrollEnd(carouselRef, syncPageStateWithScrollPosition)

  const contextValue: CarouselAPI = {
    ref: carouselRef,
    pageIndicatorsRefs,
    // props
    gap,
    snapType,
    snapStop,
    scrollPadding,
    slidesPerPage,
    slidesPerMove,
    scrollBehavior,
    loop,
    // computed state
    page: pageState,
    pageSnapPoints,
    canScrollNext: canScrollNext.current,
    canScrollPrev: canScrollPrev.current,
    scrollTo,
    scrollPrev,
    scrollNext,
    // anatomy
    getRootProps: (): ComputedRootProps => ({
      id: `carousel::${carouselId}:`,
      role: 'region',
      'aria-roledescription': 'carousel',
      'data-scope': DATA_SCOPE,
      'data-part': 'root',
      'data-orientation': 'horizontal',
      dir: DIRECTION,
      style: {
        '--slides-per-page': slidesPerPage,
        '--slide-spacing': `${gap}px`,
        '--slide-item-size':
          'calc(100% / var(--slides-per-page) - var(--slide-spacing) * (var(--slides-per-page) - 1) / var(--slides-per-page))',
      },
    }),

    getControlProps: (): ComputedControlProps => ({
      'data-scope': DATA_SCOPE,
      'data-part': 'control',
      'data-orientation': 'horizontal',
    }),

    getPrevTriggerProps: (): ComputedTriggerProps<'prev-trigger'> => ({
      id: `carousel::${carouselId}::prev-trigger`,
      'aria-controls': `carousel::${carouselId}::item-group`,
      'data-scope': DATA_SCOPE,
      'data-part': 'prev-trigger',
      'data-orientation': 'horizontal',
      type: 'button',
      dir: DIRECTION,
      disabled: !canScrollPrev.current,
      onClick: () => scrollPrev(),
    }),

    getNextTriggerProps: (): ComputedTriggerProps<'next-trigger'> => ({
      id: `carousel::${carouselId}::next-trigger`,
      'aria-controls': `carousel::${carouselId}::item-group`,
      'data-scope': DATA_SCOPE,
      'data-part': 'next-trigger',
      'data-orientation': 'horizontal',
      type: 'button',
      dir: DIRECTION,
      disabled: !canScrollNext.current,
      onClick: () => scrollNext(),
    }),

    getSlidesContainerProps: (): ComputedSlideGroupProps => ({
      id: `carousel::${carouselId}::item-group`,
      'aria-live': slidesPerPage > 1 ? 'off' : 'polite',
      'data-scope': DATA_SCOPE,
      'data-part': 'item-group',
      'data-orientation': 'horizontal',
      dir: DIRECTION,
      tabIndex: 0,
      style: {
        display: 'grid',
        gap: 'var(--slide-spacing)',
        scrollSnapType: `x ${snapType}`,
        gridAutoFlow: 'column',
        scrollbarWidth: 'none',
        overscrollBehavior: 'contain',
        gridAutoColumns: 'var(--slide-item-size)',
        overflowX: 'auto',
      },
      ref: carouselRef,
    }),

    getSlideProps: ({ index }): ComputedSlideProps => {
      const isStopPoint = isSnapPoint(index, {
        container: carouselRef.current,
        slidesPerMove,
        slidesPerPage,
      })

      return {
        id: `carousel::${carouselId}::item:${index}`,
        role: 'group',
        'aria-roledescription': 'slide',
        'data-scope': DATA_SCOPE,
        'data-part': 'item',
        'data-index': index,
        'data-orientation': 'horizontal',
        dir: DIRECTION,
        style: {
          ...(isStopPoint && {
            scrollSnapAlign: 'start',
            scrollSnapStop: snapStop,
          }),
        },
      }
    },

    getIndicatorGroupProps: (): ComputedIndicatorGroupProps => ({
      role: 'radiogroup',
      id: `carousel::${carouselId}::indicator-group`,
      'data-scope': DATA_SCOPE,
      'data-part': 'indicator-group',
      'data-orientation': 'horizontal',
      dir: DIRECTION,
    }),

    getIndicatorProps: ({ index }): ComputedIndicatorProps => {
      const isActivePage = index === pageState

      return {
        role: 'radio',
        id: `carousel::${carouselId}::indicator:${index}`,
        'aria-checked': isActivePage,
        'data-scope': DATA_SCOPE,
        'data-part': 'indicator',
        'data-orientation': 'horizontal',
        'data-index': index,
        'data-state': isActivePage ? 'active' : 'inactive',
        tabIndex: isActivePage ? 0 : -1,
        onClick: () => {
          scrollTo(index, scrollBehavior)
        },
        onKeyDown: (event: KeyboardEvent) => {
          const focusActiveIndicator = (page: number) => {
            pageIndicatorsRefs.current[page]?.focus()
          }

          if (event.key === 'ArrowRight' && canScrollNext) {
            scrollNext(focusActiveIndicator)
          } else if (event.key === 'ArrowLeft' && canScrollPrev) {
            scrollPrev(focusActiveIndicator)
          }
        },
      }
    },
  }

  return contextValue
}
