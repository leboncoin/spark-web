import type { TableBodyProps as StatelyTableBodyProps } from '@react-stately/table'
import { TableBody as StatelyTableBody } from '@react-stately/table'
import type { ReactNode } from 'react'

export interface TableBodyProps<T extends object = object> extends StatelyTableBodyProps<T> {
  className?: string
  /** Spark-only: used to re-render body when external deps change (Storybook/demo convenience). */
  dependencies?: unknown[]
  /** Spark-only: empty state renderer (handled by Spark Table renderer). */
  renderEmptyState?: () => ReactNode
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return <StatelyTableBody {...(props as unknown as StatelyTableBodyProps<T>)} />
}

TableBody.displayName = 'Table.Body'

// Forward React Stately collection static for useTableState.
;(TableBody as any).getCollectionNode = (StatelyTableBody as any).getCollectionNode
