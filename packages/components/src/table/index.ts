import { Table } from './Table'
import { TableBody } from './TableBody'
import { Cell } from './TableCell'
import { Column } from './TableColumn'
import { TableHeader } from './TableHeader'
import { Row } from './TableRow'

export const TableWithSubcomponents: typeof Table & {
  Header: typeof TableHeader
  Column: typeof Column
  Body: typeof TableBody
  Row: typeof Row
  Cell: typeof Cell
} = Object.assign(Table, {
  Header: TableHeader,
  Column,
  Body: TableBody,
  Row,
  Cell,
})

TableWithSubcomponents.displayName = 'Table'
TableHeader.displayName = 'Table.Header'
Column.displayName = 'Table.Column'
TableBody.displayName = 'Table.Body'
Row.displayName = 'Table.Row'
Cell.displayName = 'Table.Cell'

export { TableWithSubcomponents as Table }

export { useTableSort } from './useTableSort'
export type { SortDescriptor } from 'react-aria-components'
export type { UseTableSortOptions } from './useTableSort'
export { type TableProps } from './Table'
export { type TableHeaderProps } from './TableHeader'
export { type ColumnProps } from './TableColumn'
export { type TableBodyProps } from './TableBody'
export { type RowProps } from './TableRow'
export { type CellProps } from './TableCell'
