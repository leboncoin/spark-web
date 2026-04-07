import { useTableSelectionCheckbox } from '@react-aria/table'
import type { TableState } from '@react-stately/table'
import type { GridNode } from '@react-types/grid'
import type { Key } from '@react-types/shared'
import { useCallback, useContext, useRef, type KeyboardEvent } from 'react'
import { mergeProps, useFocusRing, useTableCell } from 'react-aria'

import { cellStyles } from './Table.styles'
import { TableKeyboardModeContext } from './TableKeyboardModeContext'
import { TableSelectionCheckbox } from './TableSelectionCheckbox'

export function TableBodyCellRenderer({
  cell,
  state,
  resizeState,
}: {
  cell: GridNode<unknown>
  state: TableState<unknown>
  resizeState: any
}) {
  const ref = useRef<HTMLTableCellElement>(null)
  const { gridCellProps } = useTableCell({ node: cell }, state, ref)
  const { isFocusVisible, focusProps } = useFocusRing()
  const keyboardMode = useContext(TableKeyboardModeContext)

  const stopRowKeyboardSelectionInInteractionMode = useCallback(
    (e: KeyboardEvent<HTMLTableCellElement>) => {
      if (keyboardMode !== 'interaction') return
      if (e.key !== ' ' && e.key !== 'Enter') return
      e.stopPropagation()
    },
    [keyboardMode]
  )

  const { onKeyDownCapture: gridCellKeyDownCapture, ...gridCellPropsRest } = gridCellProps
  const gridCellCaptureWithListboxPassthrough = useCallback(
    (e: KeyboardEvent<HTMLTableCellElement>) => {
      // Arrow keys should not be handled by the cell-level capture handler:
      // - in grid mode, the table/grid roving focus handles navigation
      // - in interaction mode, the focused control should handle arrows (or ignore them)
      const overridenKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

      if (overridenKeys.includes(e.key)) {
        return
      } else {
        gridCellKeyDownCapture?.(e)
      }
    },
    [gridCellKeyDownCapture]
  )

  const rowKey = (cell.parentKey ?? (cell as any).key) as Key
  const selectionCheckbox = useTableSelectionCheckbox({ key: rowKey }, state)
  const columnKey = (state.collection.columns[cell.index ?? 0]?.key ?? null) as Key | null
  const columnWidth = columnKey ? resizeState?.columnWidths?.get?.(columnKey) : undefined

  if ((cell.props as any)?.isSelectionCell) {
    return (
      <td
        {...mergeProps(
          gridCellPropsRest,
          { onKeyDownCapture: gridCellCaptureWithListboxPassthrough },
          focusProps,
          { onKeyDown: stopRowKeyboardSelectionInInteractionMode }
        )}
        ref={ref}
        data-spark-component="table-cell"
        data-table-cell-kind="selection"
        className={cellStyles({ checkbox: true })}
        data-focus-visible={isFocusVisible || undefined}
      >
        <TableSelectionCheckbox
          suppressFocusWalker={keyboardMode === 'grid'}
          checkboxProps={selectionCheckbox.checkboxProps}
        />
      </td>
    )
  }

  return (
    <td
      {...mergeProps(
        gridCellPropsRest,
        { onKeyDownCapture: gridCellCaptureWithListboxPassthrough },
        focusProps,
        { onKeyDown: stopRowKeyboardSelectionInInteractionMode }
      )}
      ref={ref}
      data-spark-component="table-cell"
      className={cellStyles()}
      data-focus-visible={isFocusVisible || undefined}
      style={columnWidth ? { width: columnWidth } : undefined}
    >
      {cell.rendered}
    </td>
  )
}

TableBodyCellRenderer.displayName = 'Table.BodyCellRenderer'
