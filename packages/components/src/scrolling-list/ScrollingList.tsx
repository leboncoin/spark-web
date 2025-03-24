import { createContext, ReactNode, RefObject, useRef } from 'react'
import { SnapCarouselResult, useSnapCarousel } from 'react-snap-carousel'

import { ScrollOverflow, useScrollOverflow } from './useScrollOverflow'

type SnapType = 'mandatory' | 'proximity' | 'none'
type ScrollBehavior = 'smooth' | 'instant'
type SnapStop = 'normal' | 'always'

interface Props {
  /**
   * CSS scroll snap behavior.
   * - `mandatory` to force snapping on each "page".
   * - `proximity` to force snapping only when scroll position is near the edge of a "page". Behavior can change depending on each browser.
   * - `none` to disabled scroll snapping.
   */
  snapType?: SnapType
  /**
   * Defines whether or not the scroll container is allowed to "pass over" possible snap positions.
   */
  snapStop?: SnapStop
  scrollBehavior?: ScrollBehavior
  /**
   * Add a fade effect to indicate content overflow.
   */
  widthFade?: boolean
  children?: ReactNode
  /**
   * When `true`, allow previous and next buttons to be used when reaching the edges of the list.
   */
  loop?: boolean
  /**
   * Space (in pixels) between items.
   */
  gap?: number
  /**
   * Offset (in pixels) of the left of the optimal viewing region of the list.
   */
  scrollPadding?: number
}

interface ScrollingListContextState extends SnapCarouselResult {
  snapType: SnapType
  snapStop: SnapStop
  scrollBehavior: ScrollBehavior
  visibleItemsRange: readonly [number, number]
  loop: boolean
  gap: number
  widthFade: boolean
  scrollPadding: number
  scrollAreaRef: RefObject<HTMLDivElement | null>
  overflow: ScrollOverflow
  skipKeyboardNavigation: () => void
}

export const ScrollingListContext = createContext<ScrollingListContextState>(
  null as unknown as ScrollingListContextState
)

export const ScrollingList = ({
  snapType = 'none',
  snapStop = 'normal',
  scrollBehavior = 'smooth',
  loop = false,
  gap = 16,
  widthFade = false, // TODO: ask for default value + why it has been removed from specs
  scrollPadding = 0,
  children,
}: Props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const skipAnchorRef = useRef<HTMLButtonElement>(null)

  const snapCarouselAPI = useSnapCarousel()

  const overflow = useScrollOverflow(scrollAreaRef)

  const { activePageIndex, pages } = snapCarouselAPI

  const visibleItems = pages[activePageIndex] as number[]

  const visibleItemsRange = visibleItems
    ? ([visibleItems[0]! + 1, visibleItems[visibleItems.length - 1]! + 1] as const)
    : ([0, 0] as const)

  const skipKeyboardNavigation = () => {
    skipAnchorRef.current?.focus()
  }

  const ctxValue: ScrollingListContextState = {
    ...snapCarouselAPI,
    snapType,
    snapStop,
    skipKeyboardNavigation,
    scrollBehavior,
    visibleItemsRange,
    loop,
    gap,
    widthFade,
    scrollPadding,
    scrollAreaRef,
    overflow,
  }

  return (
    <ScrollingListContext.Provider value={ctxValue}>
      <div className="gap-lg group/scrolling-list relative flex w-full flex-col">{children}</div>
      <span ref={skipAnchorRef} className="size-0 overflow-hidden" tabIndex={-1} />
    </ScrollingListContext.Provider>
  )
}

ScrollingList.displayName = 'ScrollingList'
