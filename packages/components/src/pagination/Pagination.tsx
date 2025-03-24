import { ReactNode } from 'react'

import {
  PaginationProvider,
  type PaginationProviderProps,
  usePagination,
} from './PaginationContext'

export type PaginationProps = PaginationProviderProps & { className?: string }

export const Pagination = ({
  children,
  visiblePageItems = 5,
  type = 'link',
  noEllipsis = false,
  className,
  ...rest
}: PaginationProps) => {
  return (
    <PaginationProvider
      visiblePageItems={visiblePageItems}
      noEllipsis={noEllipsis}
      type={type}
      {...rest}
    >
      <PaginationWrapper className={className}>{children}</PaginationWrapper>
    </PaginationProvider>
  )
}

const PaginationWrapper = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const { pagination } = usePagination()

  const props = pagination.getRootProps()

  return (
    <nav data-spark-component="pagination" {...props} className={className}>
      <ul className="gap-md flex flex-wrap">{children}</ul>
    </nav>
  )
}

Pagination.displayName = 'Pagination'
