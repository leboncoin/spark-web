import { Cell } from './TableCell'
import { Column } from './TableColumn'
import { Row } from './TableRow'
import { Table } from './Table'
import { TableBody } from './TableBody'
import { TableEmpty } from './TableEmpty'
import { TableHeader } from './TableHeader'

export const TableWithSubcomponents: typeof Table & {
  Header: typeof TableHeader
  Column: typeof Column
  Body: typeof TableBody
  Row: typeof Row
  Cell: typeof Cell
  Empty: typeof TableEmpty
} = Object.assign(Table, {
  Header: TableHeader,
  Column,
  Body: TableBody,
  Row,
  Cell,
  Empty: TableEmpty,
})

TableWithSubcomponents.displayName = 'Table'
TableHeader.displayName = 'Table.Header'
Column.displayName = 'Table.Column'
TableBody.displayName = 'Table.Body'
Row.displayName = 'Table.Row'
Cell.displayName = 'Table.Cell'

export { TableWithSubcomponents as Table }

export { type TableProps } from './Table'
export { type TableHeaderProps } from './TableHeader'
export { type ColumnProps } from './TableColumn'
export { type TableBodyProps } from './TableBody'
export { type RowProps } from './TableRow'
export { type CellProps } from './TableCell'
export { type TableEmptyProps } from './TableEmpty'
