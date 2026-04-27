import type { TableHeaderProps as StatelyTableHeaderProps } from '@react-stately/table'
import { TableHeader as StatelyTableHeader } from '@react-stately/table'

export interface TableHeaderProps<T extends object = object> extends StatelyTableHeaderProps<T> {
  /**
   * Spark-only props. They are stored on the collection node and used by the renderer.
   * (No DOM is rendered by `@react-stately/table` collection components.)
   */
  className?: string
}

/** The header section of the table. Renders a <thead> element. */
export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <StatelyTableHeader {...(props as unknown as StatelyTableHeaderProps<T>)} />
}

TableHeader.displayName = 'Table.Header'

// Forward React Stately collection static for useTableState.
;(TableHeader as any).getCollectionNode = (StatelyTableHeader as any).getCollectionNode
