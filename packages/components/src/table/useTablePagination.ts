import { useEffect, useMemo, useState } from 'react'
import type { Key, Selection } from 'react-aria-components'

export interface UseTablePaginationOptions<T> {
  /** Number of items per page. */
  pageSize: number
  /** Initial page index (1-based). Defaults to 1. */
  initialPage?: number
  /**
   * Function to extract a stable key from each item.
   * Defaults to `item.id` if present.
   */
  getId?: (item: T) => Key
}

export interface UseTablePaginationResult<T> {
  /** Current page (1-based). */
  page: number
  /** Update the current page manually. */
  setPage: (page: number) => void
  /** Items sliced to the current page. */
  pageItems: T[]
  /** Total number of items. */
  totalItems: number
  /** Total number of pages (at least 1). */
  totalPages: number
  /** All item keys across all pages. */
  allKeys: Set<Key>
  /**
   * Selection state across all pages.
   * Pass to Table (root) as `selectedKeys`.
   */
  selectedKeys: Set<Key>
  /**
   * Selection change handler that keeps selection across pages.
   * Pass to Table (root) as `onSelectionChange`.
   */
  onSelectionChange: (keys: Selection) => void
  /**
   * Convenience handler matching Pagination's `onPageChange` signature:
   * `onPageChange={({ page }) => ...}`.
   */
  onPageChange: (details: { page: number }) => void
  /** Clear selection across all pages. */
  clearSelection: () => void
}

/**
 * Hook to manage simple client-side pagination and multi-page selection for Table.
 * It slices the full item list to the current page, tracks page state, and merges
 * selection across pages so that rows selected on previous pages remain selected.
 *
 * @example
 * const { page, pageItems, totalItems, allKeys, selectedKeys, onSelectionChange, onPageChange } =
 *   useTablePagination(allItems, { pageSize: 10 })
 *
 * return (
 *   <Table
 *     selectionMode="multiple"
 *     selectedKeys={selectedKeys}
 *     onSelectionChange={onSelectionChange}
 *     totalCount={totalItems}
 *     hasMultiplePages={totalItems > 10}
 *     onSelectAll={() => onSelectionChange(allKeys)}
 *   >
 *     <Table.BulkBar>...</Table.BulkBar>
 *     <Table.Grid aria-label="Items">
 *       <Table.Body>
 *         {pageItems.map(item => (
 *           <Table.Row key={item.id} id={item.id}>...</Table.Row>
 *         ))}
 *       </Table.Body>
 *     </Table.Grid>
 *     <Pagination page={page} pageSize={10} count={totalItems} onPageChange={onPageChange} />
 *   </Table>
 * )
 */
export function useTablePagination<T>(
  items: T[],
  options: UseTablePaginationOptions<T>
): UseTablePaginationResult<T> {
  const { pageSize, initialPage = 1, getId } = options

  const [page, setPage] = useState(initialPage)
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(() => new Set())

  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // Clamp current page when the total page count changes (e.g. items length shrinks).
  useEffect(() => {
    setPage(current => {
      if (current < 1) return 1
      if (current > totalPages) return totalPages

      return current
    })
  }, [totalPages])

  let effectivePage = page
  if (effectivePage < 1) {
    effectivePage = 1
  } else if (effectivePage > totalPages) {
    effectivePage = totalPages
  }

  const pageItems = useMemo(() => {
    const start = (effectivePage - 1) * pageSize
    const end = start + pageSize

    return items.slice(start, end)
  }, [items, effectivePage, pageSize])

  const allKeys = useMemo(() => {
    const resolveId =
      getId ??
      ((item: T) => {
        const candidate = (item as unknown as { id?: Key }).id

        if (candidate == null) {
          throw new Error(
            'useTablePagination: item.id is undefined. Provide a `getId` option to extract a stable key.'
          )
        }

        return candidate
      })

    return new Set<Key>(items.map(item => resolveId(item)))
  }, [getId, items])

  const pageIds = useMemo(() => {
    const resolveId =
      getId ??
      ((item: T) => {
        const candidate = (item as unknown as { id?: Key }).id

        if (candidate == null) {
          throw new Error(
            'useTablePagination: item.id is undefined. Provide a `getId` option to extract a stable key.'
          )
        }

        return candidate
      })

    return new Set<Key>(pageItems.map(item => resolveId(item)))
  }, [getId, pageItems])

  const handleSelectionChange = (keys: Selection) => {
    // React Aria uses "all" to represent "select all" in the current context.
    // For the table header checkbox, interpret "all" as "all items on the current page".
    const newPageSelection = keys === 'all' ? new Set<Key>(pageIds) : new Set(keys as Set<Key>)

    setSelectedKeys(prev => {
      const next = new Set<Key>(newPageSelection)

      // Keep selections from other pages.
      for (const key of prev) {
        if (!pageIds.has(key)) {
          next.add(key)
        }
      }

      return next
    })
  }

  const handlePageChange = (details: { page: number }) => {
    setPage(details.page)
  }

  const clearSelection = () => {
    setSelectedKeys(() => new Set())
  }

  return {
    page: effectivePage,
    setPage,
    pageItems,
    totalItems,
    totalPages,
    allKeys,
    selectedKeys,
    onSelectionChange: handleSelectionChange,
    onPageChange: handlePageChange,
    clearSelection,
  }
}
