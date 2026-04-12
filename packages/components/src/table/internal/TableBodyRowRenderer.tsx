import { getEventTarget } from '@react-aria/utils'
import type { TableState } from '@react-stately/table'
import type { GridNode } from '@react-types/grid'
import { cx } from 'class-variance-authority'
import { useRef, type SyntheticEvent } from 'react'
import { mergeProps, useFocusRing, useTableRow } from 'react-aria'

import { shouldSuppressRowSelectionFromPointerTarget } from './table-utils'
import { TableBodyCellRenderer } from './TableBodyCellRenderer'

function chainUnlessInteractivePointer<E extends SyntheticEvent<unknown>>(
  handler: ((e: E) => void) | undefined
): ((e: E) => void) | undefined {
  if (!handler) return undefined
  return (e: E) => {
    // `react-aria` types sometimes differ between `Event`/`MouseEvent` generics and DOM `Event`.
    // We only need a DOM `Event` to extract `target`.
    const eventTarget = getEventTarget(e.nativeEvent as any) as EventTarget | null
    if (shouldSuppressRowSelectionFromPointerTarget(eventTarget)) {
      return
    }
    handler(e)
  }
}

export function TableBodyRowRenderer({
  item,
  state,
  resizeState,
}: {
  item: GridNode<unknown>
  state: TableState<unknown>
  resizeState: any
}) {
  const ref = useRef<HTMLTableRowElement>(null)
  const { rowProps, isSelected } = useTableRow({ node: item }, state, ref)
  const { isFocusVisible, focusProps } = useFocusRing()

  const { onClick, onPointerDown, onMouseDown, onPointerUp, onPointerCancel, ...restRowProps } =
    rowProps
  const rowClassName = cx(
    'outline-none box-border data-focus-visible:u-outline-inset data-focus-visible:outline-dashed',
    (restRowProps as any).className,
    isSelected && 'bg-support-container text-on-support-container'
  )

  return (
    <tr
      {...mergeProps(restRowProps, focusProps)}
      onPointerDown={chainUnlessInteractivePointer(onPointerDown)}
      onMouseDown={chainUnlessInteractivePointer(onMouseDown)}
      onPointerUp={chainUnlessInteractivePointer(onPointerUp)}
      onPointerCancel={chainUnlessInteractivePointer(onPointerCancel)}
      onClick={chainUnlessInteractivePointer(onClick)}
      ref={ref}
      data-spark-component="table-row"
      data-selected={isSelected || undefined}
      data-focus-visible={isFocusVisible || undefined}
      className={rowClassName}
      tabIndex={-1}
    >
      {[...item.childNodes].map(cell => (
        <TableBodyCellRenderer key={cell.key} cell={cell} state={state} resizeState={resizeState} />
      ))}
    </tr>
  )
}

TableBodyRowRenderer.displayName = 'Table.BodyRowRenderer'
