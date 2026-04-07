import { filterDOMProps } from '@react-aria/utils'
import { useTableColumnResizeState } from '@react-stately/table'
import { useTableState } from '@react-stately/table'
import type { TableState } from '@react-stately/table'
import type { TableProps as AriaTableProps } from '@react-types/table'
import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { mergeProps, useTable, useTableRowGroup } from 'react-aria'

import { useTableKeyboardModes } from './table-keyboard'
import { tableBodySpacerRowStyles } from './Table.styles'
import { TableBodyRowRenderer } from './TableBodyRowRenderer'
import { useTableResizableContext } from './TableContext'
import { TableHeaderRowRenderer } from './TableHeaderRowRenderer'
import { TableKeyboardModeContext } from './TableKeyboardModeContext'

export function TableRoot({
  className,
  children,
  stickyHeader: stickyHeaderProp,
  ...props
}: AriaTableProps<object> & {
  className?: string
  stickyHeader?: boolean
  children?: AriaTableProps<object>['children']
}) {
  const stickyHeader = Boolean(stickyHeaderProp)
  const tableRef = useRef<HTMLTableElement>(null)
  const resizable = useTableResizableContext()
  const shouldUseFixedLayout = (props as any).selectionMode === 'multiple'

  const state = useTableState({
    ...(props as AriaTableProps<object>),
    showSelectionCheckboxes: (props as AriaTableProps<object>).selectionMode === 'multiple',
    children,
  })

  const columnResizeState = useTableColumnResizeState(
    { tableWidth: resizable.tableWidth },
    state as unknown as TableState<unknown>
  )
  const resizeState =
    resizable.isResizable && (props as any).allowsResizing !== false ? columnResizeState : null

  const { gridProps } = useTable({ ...(props as AriaTableProps<unknown>) }, state, tableRef)

  const headerRows = state.collection.headerRows
  const bodyRows = [...state.collection.body.childNodes]
  const emptyStateRenderer = (state.collection.body.props as any)?.renderEmptyState as
    | ((props: { isEmpty: boolean; isDropTarget?: boolean }) => ReactNode)
    | undefined

  const columnCount = state.collection.columns.length || 1
  const showBodySpacer = bodyRows.length > 0 || Boolean(emptyStateRenderer)

  const { rowGroupProps: theadProps } = useTableRowGroup()
  const { rowGroupProps: tbodyProps } = useTableRowGroup()

  const { gridProps: keyboardGridProps, keyboardMode } = useTableKeyboardModes({
    ref: tableRef,
    gridProps,
    onKeyDownCapture: (props as any).onKeyDownCapture,
    onFocusCapture: (props as any).onFocusCapture,
  })

  return (
    <TableKeyboardModeContext.Provider value={keyboardMode}>
      <table
        {...mergeProps(keyboardGridProps, filterDOMProps(props as any, { global: true }))}
        ref={tableRef}
        data-spark-component="table"
        className={cx(
          'default:w-full',
          shouldUseFixedLayout ? 'table-fixed' : undefined,
          'border-separate border-spacing-y-0',
          'bg-surface',
          'outline-none',
          'text-body-1',
          'forced-color-adjust-none',
          'data-focus-visible:u-outline-inset',
          'has-[>[data-empty]]:h-full',
          className
        )}
      >
        <thead {...theadProps} data-spark-component="table-header">
          {headerRows.map(headerRow => (
            <TableHeaderRowRenderer
              key={headerRow.key}
              item={headerRow}
              state={state as TableState<unknown>}
              resizeState={resizeState as any}
              stickyHeader={stickyHeader}
              resizeCallbacks={{
                onResizeStart: (props as any).onResizeStart,
                onResize: (props as any).onResize,
                onResizeEnd: (props as any).onResizeEnd,
              }}
            />
          ))}
        </thead>
        <tbody {...tbodyProps} data-spark-component="table-body">
          {showBodySpacer ? (
            <tr
              aria-hidden="true"
              className={tableBodySpacerRowStyles()}
              role="presentation"
              data-spark-component="table-body-spacer"
            >
              <td colSpan={columnCount} role="presentation" />
            </tr>
          ) : null}
          {bodyRows.length === 0 && emptyStateRenderer ? (
            <tr data-empty>
              <td colSpan={columnCount}>{emptyStateRenderer({ isEmpty: true })}</td>
            </tr>
          ) : null}
          {bodyRows.map(row => (
            <TableBodyRowRenderer
              key={row.key}
              item={row}
              state={state as TableState<unknown>}
              resizeState={resizeState as any}
            />
          ))}
        </tbody>
      </table>
    </TableKeyboardModeContext.Provider>
  )
}

TableRoot.displayName = 'Table.Grid.Inner'
