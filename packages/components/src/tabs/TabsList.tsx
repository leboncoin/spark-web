/* eslint-disable max-lines-per-function */
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ArrowVerticalLeft } from '@spark-ui/icons/ArrowVerticalLeft'
import { ArrowVerticalRight } from '@spark-ui/icons/ArrowVerticalRight'
import { Tabs as RadixTabs } from 'radix-ui'
import { type ReactElement, Ref, useEffect, useRef, useState } from 'react'

import { Button } from '../button'
import { Icon } from '../icon'
import { useTabsContext } from './TabsContext'
import { listStyles, navigationArrowStyles, wrapperStyles } from './TabsList.styles'
import { useResizeObserver } from './useResizeObserver'

export interface TabsListProps
  extends Omit<RadixTabs.TabsListProps, 'children' | 'asChild'>,
    useRender.ComponentProps<'div'> {
  /**
   * When true, keyboard navigation will loop from last tab to first, and vice versa.
   * @default false
   */
  loop?: boolean
  children: ReactElement[] | ReactElement
  ref?: Ref<HTMLDivElement>
}

type ArrowState = 'visible' | 'hidden' | 'disabled'

export const TabsList = ({
  loop = false,
  children,
  render,
  className,
  ref,
  ...rest
}: TabsListProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef(null)
  const listRef = ref || innerRef
  const { orientation } = useTabsContext()

  const { width } = useResizeObserver(wrapperRef)

  const [arrows, setArrows] = useState<Record<'prev' | 'next', ArrowState>>({
    prev: 'hidden',
    next: 'hidden',
  })

  useEffect(() => {
    /**
     * Show/hide arrows
     */
    if (typeof listRef === 'function' || !listRef.current) {
      return
    }

    if (orientation !== 'horizontal') {
      setArrows({ prev: 'hidden', next: 'hidden' })
    } else {
      setArrows({
        prev: listRef.current.scrollWidth > listRef.current.clientWidth ? 'visible' : 'hidden',
        next: listRef.current.scrollWidth > listRef.current.clientWidth ? 'visible' : 'hidden',
      })
    }
  }, [orientation, listRef, width])

  useEffect(() => {
    /**
     * Enable/disable arrows
     */
    if (typeof listRef === 'function' || !listRef.current || arrows.prev === 'hidden' || loop) {
      return
    }

    const toggleArrowsVisibility = (target: HTMLDivElement) => {
      setArrows({
        prev: target.scrollLeft > 0 ? 'visible' : 'disabled',
        next: target.scrollLeft + target.clientWidth < target.scrollWidth ? 'visible' : 'disabled',
      })
    }

    const currentList = listRef.current

    toggleArrowsVisibility(currentList)

    currentList.addEventListener('scroll', ({ target }) =>
      toggleArrowsVisibility(target as HTMLDivElement)
    )

    return () =>
      currentList.removeEventListener('scroll', ({ target }) =>
        toggleArrowsVisibility(target as HTMLDivElement)
      )
  }, [listRef, arrows.prev, loop])

  const handlePrevClick = () => {
    if (typeof listRef === 'function' || !listRef.current) {
      return
    }

    const shouldLoopForward = loop && listRef.current.scrollLeft <= 0

    listRef.current.scrollTo({
      left: shouldLoopForward
        ? listRef.current.scrollLeft + listRef.current.scrollWidth - listRef.current.clientWidth
        : listRef.current.scrollLeft - listRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  const handleNextClick = () => {
    if (typeof listRef === 'function' || !listRef.current) {
      return
    }

    const shouldLoopBackward =
      loop &&
      listRef.current.scrollLeft + listRef.current.clientWidth >= listRef.current.scrollWidth

    listRef.current.scrollTo({
      left: shouldLoopBackward ? 0 : listRef.current.scrollLeft + listRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  const defaultListProps = {
    'data-spark-component': 'tabs-list',
    className: listStyles(),
    loop,
    ...rest,
    children,
  }
  const listElement = useRender({
    defaultTagName: 'div',
    render: render ?? undefined,
    ref: listRef,
    props: mergeProps<'div'>(defaultListProps, {}),
  })
  const listContent = (
    <RadixTabs.List asChild loop={loop}>
      {listElement}
    </RadixTabs.List>
  )

  return (
    <div className={wrapperStyles({ className })} ref={wrapperRef}>
      {arrows.prev !== 'hidden' && (
        <Button
          shape="square"
          intent="surface"
          size="sm"
          className={navigationArrowStyles()}
          onClick={handlePrevClick}
          disabled={arrows.prev === 'disabled'}
          aria-label="Scroll left"
        >
          <Icon>
            <ArrowVerticalLeft />
          </Icon>
        </Button>
      )}

      {listContent}

      {arrows.next !== 'hidden' && (
        <Button
          shape="square"
          intent="surface"
          size="sm"
          className={navigationArrowStyles()}
          onClick={handleNextClick}
          disabled={arrows.next === 'disabled'}
          aria-label="Scroll right"
        >
          <Icon>
            <ArrowVerticalRight />
          </Icon>
        </Button>
      )}
    </div>
  )
}

TabsList.displayName = 'Tabs.List'
