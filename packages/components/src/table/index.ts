import { TableGrid, TableRootWrapper } from './Table'
import { TableBody } from './TableBody'
import {
  TableBulkBar,
  TableBulkBarClearButton,
  TableBulkBarSelectAllButton,
  TableBulkBarSelectedCount,
} from './TableBulkBar'
import { Cell } from './TableCell'
import { Column } from './TableColumn'
import { TableHeader } from './TableHeader'
import { Row } from './TableRow'

/**
 * A compound component for building data tables with support for headers, rows, cells, sorting,
 * pagination, and bulk selection functionality.
 */
export const TableCompound: typeof TableRootWrapper & {
  Grid: typeof TableGrid
  Header: typeof TableHeader
  Column: typeof Column
  Body: typeof TableBody
  Row: typeof Row
  Cell: typeof Cell
  BulkBar: typeof TableBulkBar
  BulkBarSelectedCount: typeof TableBulkBarSelectedCount
  BulkBarClearButton: typeof TableBulkBarClearButton
  BulkBarSelectAllButton: typeof TableBulkBarSelectAllButton
} = Object.assign(TableRootWrapper, {
  Grid: TableGrid,
  Header: TableHeader,
  Column,
  Body: TableBody,
  Row,
  Cell,
  BulkBar: TableBulkBar,
  BulkBarSelectedCount: TableBulkBarSelectedCount,
  BulkBarClearButton: TableBulkBarClearButton,
  BulkBarSelectAllButton: TableBulkBarSelectAllButton,
})

TableCompound.displayName = 'Table'
TableHeader.displayName = 'Table.Header'
Column.displayName = 'Table.Column'
TableBody.displayName = 'Table.Body'
Row.displayName = 'Table.Row'
Cell.displayName = 'Table.Cell'

export { TableCompound as Table }

export { useTableSort } from './useTableSort'
export { useTablePagination } from './useTablePagination'
export type { SortDescriptor } from '@react-types/shared'
export type { UseTableSortOptions } from './useTableSort'
export type { UseTablePaginationOptions, UseTablePaginationResult } from './useTablePagination'
export { type TableGridProps, type TableProps, type TableRootWrapperProps } from './Table'
export { type TableHeaderProps } from './TableHeader'
export { type ColumnProps } from './TableColumn'
export { type TableBodyProps } from './TableBody'
export { type RowProps } from './TableRow'
export { type CellProps } from './TableCell'
