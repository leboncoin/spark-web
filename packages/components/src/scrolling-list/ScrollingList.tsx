import { ScrollOverflow, useScrollOverflow } from '@spark-ui/hooks/use-scroll-overflow'
import { cx } from 'class-variance-authority'
import {
  ComponentPropsWithRef,
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import { SnapCarouselResult, useSnapCarousel } from 'react-snap-carousel'

type SnapType = 'mandatory' | 'proximity' | 'none'
type ScrollBehavior = 'smooth' | 'instant'
type SnapStop = 'normal' | 'always'

interface Props extends ComponentPropsWithRef<'div'> {
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
  withFade?: boolean
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
  className?: string
}

interface ScrollingListContextState extends SnapCarouselResult {
  snapType: SnapType
  snapStop: SnapStop
  scrollBehavior: ScrollBehavior
  visibleItemsRange: readonly [number, number]
  loop: boolean
  gap: number
  withFade: boolean
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
  withFade = false,
  scrollPadding = 0,
  children,
  className,
  ...rest
}: Props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const skipAnchorRef = useRef<HTMLButtonElement>(null)

  const snapCarouselAPI = useSnapCarousel()

  const overflow = useScrollOverflow(scrollAreaRef, { precisionTreshold: 1 })

  const { activePageIndex, pages, refresh } = snapCarouselAPI

  const visibleItems = pages[activePageIndex] as number[]

  const visibleItemsRange = visibleItems
    ? ([visibleItems[0]! + 1, visibleItems[visibleItems.length - 1]! + 1] as const)
    : ([0, 0] as const)

  // Force refresh of the carousel API when children change
  const forceRefresh = useCallback(() => {
    if (refresh && scrollAreaRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        refresh()
      }, 0)
    }
  }, [refresh])

  useEffect(() => {
    forceRefresh()
  }, [children, forceRefresh])

  useLayoutEffect(() => {
    if (scrollAreaRef.current) {
      // Use requestAnimationFrame to ensure proper timing with the render cycle
      // This prevents race conditions that occur when the console is closed
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }
  }, [children])

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
    withFade,
    scrollPadding,
    scrollAreaRef,
    overflow,
  }

  return (
    <ScrollingListContext.Provider value={ctxValue}>
      <div
        data-spark-component="scrolling-list"
        className={cx(
          'gap-lg group/scrolling-list relative flex flex-col default:w-full',
          className
        )}
        {...rest}
      >
        {children}
      </div>
      <span ref={skipAnchorRef} className="size-0 overflow-hidden" tabIndex={-1} />
    </ScrollingListContext.Provider>
  )
}

ScrollingList.displayName = 'ScrollingList'
