import type { SortDescriptor } from '@react-types/shared'
import { useMemo, useState } from 'react'

export interface UseTableSortOptions<T extends object> {
  /** Initial sort column and direction. */
  initialSort?: {
    column: keyof T
    direction: 'ascending' | 'descending'
  }
  /**
   * Custom compare function. If not provided, a default comparator is used:
   * - numbers: numeric comparison
   * - other: localeCompare on string representation
   */
  compare?: (a: T, b: T, column: keyof T, direction: 'ascending' | 'descending') => number
}

function defaultCompare<T extends object>(
  a: T,
  b: T,
  column: keyof T,
  direction: 'ascending' | 'descending'
): number {
  const aVal = a[column]
  const bVal = b[column]

  if (aVal === bVal) return 0

  let comparisonResult: number
  if (typeof aVal === 'number' && typeof bVal === 'number') {
    comparisonResult = aVal < bVal ? -1 : 1
  } else {
    comparisonResult = String(aVal).localeCompare(String(bVal))
  }

  return direction === 'descending' ? -comparisonResult : comparisonResult
}

/**
 * Hook to manage table sort state and derive sorted items from a list.
 * Use with Table's sortDescriptor and onSortChange props.
 *
 * @example
 * const { sortDescriptor, onSortChange, setSortDescriptor, sortedItems } = useTableSort(rows, {
 *   initialSort: { column: 'name', direction: 'ascending' },
 * })
 * return (
 *   <>
 *     <Button onClick={() => setSortDescriptor({ column: 'name', direction: 'ascending' })}>Reset sort</Button>
 *     <Table sortDescriptor={sortDescriptor} onSortChange={onSortChange}>
 *       ...
 *     </Table>
 *   </>
 * )
 */
export function useTableSort<T extends object>(
  items: T[],
  options: UseTableSortOptions<T> = {}
): {
  sortDescriptor: SortDescriptor
  onSortChange: (descriptor: SortDescriptor) => void
  /** Set sort from outside the table (e.g. a "Reset sort" button). */
  setSortDescriptor: (descriptor: SortDescriptor) => void
  sortedItems: T[]
} {
  const { initialSort, compare } = options

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(() =>
    initialSort
      ? { column: initialSort.column as string, direction: initialSort.direction }
      : { column: 'id', direction: 'ascending' }
  )

  const sortedItems = useMemo(() => {
    const column = sortDescriptor.column as keyof T
    if (!column) return [...items]

    const compareFn = compare ?? defaultCompare
    const direction = sortDescriptor.direction ?? 'ascending'

    return [...items].sort((a, b) => compareFn(a, b, column, direction))
  }, [items, sortDescriptor.column, sortDescriptor.direction, compare])

  return {
    sortDescriptor,
    onSortChange: setSortDescriptor,
    setSortDescriptor,
    sortedItems,
  }
}
