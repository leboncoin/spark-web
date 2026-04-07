import type { CellProps as StatelyCellProps } from '@react-stately/table'
import { Cell as StatelyCell } from '@react-stately/table'

export interface CellProps extends StatelyCellProps {
  className?: string
  checkbox?: boolean
}

export function Cell(props: CellProps) {
  return <StatelyCell {...(props as unknown as StatelyCellProps)} />
}

Cell.displayName = 'Table.Cell'

// Forward React Stately collection static for useTableState.
;(Cell as any).getCollectionNode = (StatelyCell as any).getCollectionNode
