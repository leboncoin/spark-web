import type { TableState } from '@react-stately/table'
import type { GridNode } from '@react-types/grid'
import { useRef } from 'react'
import { useTableHeaderRow } from 'react-aria'

import { TableColumnHeader } from './TableColumnHeader'

export function TableHeaderRowRenderer({
  item,
  state,
  resizeState,
  stickyHeader,
  resizeCallbacks,
}: {
  item: GridNode<unknown>
  state: TableState<unknown>
  resizeState: any
  stickyHeader?: boolean
  resizeCallbacks: {
    onResizeStart?: (widths: any) => void
    onResize?: (widths: any) => void
    onResizeEnd?: (widths: any) => void
  }
}) {
  const ref = useRef<HTMLTableRowElement>(null)
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref)
  const columns = [...item.childNodes]
  return (
    <tr {...rowProps} ref={ref}>
      {columns.map((column, index) => (
        <TableColumnHeader
          key={column.key}
          column={column}
          state={state}
          resizeState={resizeState}
          stickyHeader={stickyHeader}
          resizeCallbacks={resizeCallbacks}
          isLastColumnInRow={index === columns.length - 1}
        />
      ))}
    </tr>
  )
}

TableHeaderRowRenderer.displayName = 'Table.HeaderRowRenderer'
