import * as pagination from '@zag-js/pagination'
import { ReactNode } from 'react'

import { usePagination } from './PaginationContext'

// Extract the 'page' type element from the pagination API's 'pages' array.
type PageItem = Extract<pagination.Api['pages'][number], { type: 'page' }>

// Define a type that conditionally tweaks the pagination API
// based on the generic T parameter.
type TweakedPaginationApi<T extends 'noEllipsis' | ''> = Omit<pagination.Api, 'pages'> & {
  pages: T extends 'noEllipsis' ? PageItem[] : pagination.Api['pages']
}

interface PagesProps<T extends 'noEllipsis' | ''> {
  children: (pagination: TweakedPaginationApi<T>) => ReactNode
}

export const Pages = <T extends 'noEllipsis' | '' = ''>({ children }: PagesProps<T>) => {
  const { pagination } = usePagination()

  return children(pagination as TweakedPaginationApi<T>)
}

Pages.displayName = 'Pagination.Pages'
