import { CSSProperties, Ref, RefObject, KeyboardEvent } from 'react'

export const DATA_SCOPE = 'carousel' as const
export const DIRECTION = 'ltr' as const

export interface UseCarouselProps {
  /**
   * Opens the carousel on a predefined page index.
   */
  defaultPage?: number
  /**
   * Active page of the carousel.
   * Use it to control the carousel with your own state.
   */
  page?: number
  /**
   * Space (in pixels) between slides.
   */
  gap?: number
  /**
   * CSS scroll snap behavior.
   * - `mandatory` to force snapping on each "page".
   * - `proximity` to force snapping only when scroll position is near the edge of a "page". Behavior can change depending on each browser.
   */
  snapType?: 'proximity' | 'mandatory'
  /**
   * Defines whether or not the scroll container is allowed to "pass over" possible snap positions.
   */
  snapStop?: 'always' | 'normal'
  /**
   * Offset (in pixels) of the left of the optimal viewing region of the list.
   */
  scrollPadding?: number
  /**
   * Number of slides to display in the carousel viewport.
   */
  slidesPerPage?: number
  /**
   * By default, the carousel scroll N slides per move, N being the number of slides in the carousel viewport.
   * Use this prop if you prefer to scroll by a smaller amount of slides each time.
   */
  slidesPerMove?: number | 'auto'
  /**
   * When `true`, allow previous and next buttons to be used when reaching the edges of the carousel.
   */
  loop?: boolean
  scrollBehavior?: 'instant' | 'smooth'
  onPageChange?: (pageIndex: number) => void
}

export interface ComputedRootProps {
  id: string
  role: 'region'
  'aria-roledescription': 'carousel'
  'data-scope': typeof DATA_SCOPE
  'data-part': 'root'
  'data-orientation': 'horizontal'
  dir: typeof DIRECTION
  style: CSSProperties & {
    '--slides-per-page': number
    '--slide-spacing': string
    '--slide-item-size': string
  }
}

export interface ComputedControlProps {
  'data-scope': typeof DATA_SCOPE
  'data-part': 'control'
  'data-orientation': 'horizontal'
}

export interface ComputedTriggerProps<T extends 'prev-trigger' | 'next-trigger'> {
  id: string
  'aria-controls': string
  'data-scope': typeof DATA_SCOPE
  'data-part': T
  'data-orientation': 'horizontal'
  type: 'button'
  dir: typeof DIRECTION
  disabled: boolean
  onClick: () => void
}

export interface ComputedSlideGroupProps {
  id: string
  'aria-live': 'polite' | 'off'
  'data-scope': typeof DATA_SCOPE
  'data-part': 'item-group'
  'data-orientation': 'horizontal'
  dir: typeof DIRECTION
  tabIndex: 0
  style: CSSProperties
  ref: Ref<HTMLDivElement | null>
}

export interface ComputedSlideProps {
  id: string
  role: 'group'
  'aria-roledescription': 'slide'
  'data-scope': typeof DATA_SCOPE
  'data-part': 'item'
  'data-index': number
  'data-orientation': 'horizontal'
  dir: typeof DIRECTION
  style: CSSProperties
}

export interface ComputedIndicatorGroupProps {
  role: 'radiogroup'
  id: string
  'data-scope': typeof DATA_SCOPE
  'data-part': 'indicator-group'
  'data-orientation': 'horizontal'
  dir: typeof DIRECTION
}

export interface ComputedIndicatorProps {
  role: 'radio'
  id: string
  'aria-checked': boolean
  'data-scope': typeof DATA_SCOPE
  'data-part': 'indicator'
  'data-orientation': 'horizontal'
  'data-index': number
  'data-state': 'active' | 'inactive'
  tabIndex: 0 | -1
  onClick: () => void
  onKeyDown: (event: KeyboardEvent) => void
}

interface AnatomyPropsSetters {
  getRootProps: () => ComputedRootProps
  getControlProps: () => ComputedControlProps
  getPrevTriggerProps: () => ComputedTriggerProps<'prev-trigger'>
  getNextTriggerProps: () => ComputedTriggerProps<'next-trigger'>
  getSlidesContainerProps: () => ComputedSlideGroupProps
  getSlideProps: (props: { index: number; totalSlides: number }) => ComputedSlideProps
  getIndicatorGroupProps: () => ComputedIndicatorGroupProps
  getIndicatorProps: (props: { index: number }) => ComputedIndicatorProps
}

export interface CarouselAPI extends AnatomyPropsSetters {
  ref: RefObject<HTMLElement | null>
  pageIndicatorsRefs: RefObject<(HTMLElement | null)[] | null>
  gap: number
  page: number
  pageSnapPoints: number[]
  canScrollNext: boolean
  canScrollPrev: boolean
  scrollTo: (pageIndex: number, behavior: 'instant' | 'smooth') => void
  scrollPrev: () => void
  scrollNext: () => void
  loop: boolean
  scrollPadding: number
  slidesPerPage: number
  slidesPerMove: number | 'auto'
  snapType: UseCarouselProps['snapType']
  snapStop: UseCarouselProps['snapStop']
  scrollBehavior: UseCarouselProps['scrollBehavior']
}
