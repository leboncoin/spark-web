import * as pagination from '@zag-js/pagination'
import { normalizeProps, type PropTypes, useMachine } from '@zag-js/react'
import { createContext, type ReactNode, useContext, useId } from 'react'

import { sliceArrayWithIndex } from './utils'

export interface PaginationContextState<T extends PropTypes = PropTypes> {
  type: pagination.Props['type']
  pagination: pagination.Api<T> & {
    getFirstPageTriggerProps: () => ReturnType<pagination.Api<T>['getPrevTriggerProps']> & {
      'data-part': string
      onClick: () => void
    }
    getLastPageTriggerProps: () => ReturnType<pagination.Api<T>['getNextTriggerProps']> & {
      'data-part': string
      onClick: () => void
    }
  }
}

const PaginationContext = createContext<PaginationContextState | null>(null)

export interface PaginationProviderProps {
  children: ReactNode
  /**
   * Total number of data items available across all pages.
   */
  count: number
  /**
   * Maximum amount of items displayed on a single page.
   */
  pageSize: number
  /**
   * Number of visible pages (or ellipsis) between previous and next page triggers.
   */
  visiblePageItems?: number
  /**
   * The current page (active page)
   */
  page?: pagination.Props['page']
  /**
   * If your pagination contains buttons instead of links, set `type` to `button`, extra attributes will be applied on page items for a11y.
   */
  type?: pagination.Props['type']
  onPageChange?: pagination.Props['onPageChange']
  noEllipsis?: boolean
}

export const PaginationProvider = ({
  children,
  count,
  visiblePageItems = 7,
  pageSize,
  page,
  onPageChange,
  noEllipsis,
  type = 'link',
}: PaginationProviderProps) => {
  /**
   * Here `Infinity` is used because we apply a custom slice ourselves to manage the "no ellipsis" version.
   * It means Zag won't filter out any page item, allowing us to apply our own slicing logic.
   */
  const siblingCount = noEllipsis ? Infinity : Math.max(0, Math.floor((visiblePageItems - 5) / 2))

  const id = useId()

  const service = useMachine(pagination.machine, {
    id,
    count,
    siblingCount,
    pageSize,
    page,
    onPageChange,
    type,
  })

  const api = pagination.connect(service, normalizeProps)
  const pages = noEllipsis
    ? sliceArrayWithIndex(api.pages, api.page - 1, visiblePageItems)
    : api.pages

  return (
    <PaginationContext.Provider
      value={{
        type,
        pagination: {
          ...api,
          pages,
          // Extending ZagJS anatomy
          getFirstPageTriggerProps: () => {
            return {
              ...api.getPrevTriggerProps(),
              id: `${api.getRootProps().id}:first`,
              'data-part': 'first-page-trigger',
              onClick: api.goToFirstPage,
            }
          },
          getLastPageTriggerProps: () => {
            return {
              ...api.getNextTriggerProps(),
              id: `${api.getRootProps().id}:last`,
              'data-part': 'last-page-trigger',
              onClick: api.goToLastPage,
            }
          },
        },
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePagination = () => {
  const context = useContext(PaginationContext)

  if (!context) {
    throw Error('usePagination must be used within a Pagination provider')
  }

  return context
}
