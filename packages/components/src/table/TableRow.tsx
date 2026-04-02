import type { PartialNode } from '@react-stately/collections'
import type { Key } from '@react-types/shared'
import type { RowProps as ReactTypesRowProps } from '@react-types/table'
import React, { type ReactElement } from 'react'

export interface RowProps<T extends object = object> extends ReactTypesRowProps<T> {
  className?: string
  /** Stable key for the row (Spark API). */
  id?: Key
  /** Called when the row is activated (e.g. Enter on a link row). */
  onAction?: () => void
}

export function Row<T extends object>(props: RowProps<T>) {
  // Collection component: does not render DOM.
  void props
  return null
}

Row.displayName = 'Table.Row'

// React Stately collection static for useTableState, but with Spark's `id` support:
// CollectionBuilder derives keys from React element keys, not `props.id`, so we explicitly set `key`.
;(Row as any).getCollectionNode = function* getCollectionNode<T extends object>(
  props: ReactTypesRowProps<T> & { UNSTABLE_childItems?: any[] },
  context: any
): Generator<PartialNode<T>, void, any> {
  const { children, textValue, UNSTABLE_childItems } = props as any
  const idKey = (props as any).id

  yield {
    type: 'item',
    key: idKey ?? null,
    props,
    textValue,
    'aria-label': (props as any)['aria-label'],
    hasChildNodes: true,
    *childNodes() {
      if (context.showDragButtons) {
        yield {
          type: 'cell',
          key: 'header-drag',
          props: { isDragButtonCell: true },
        }
      }

      if (context.showSelectionCheckboxes && context.selectionMode !== 'none') {
        yield {
          type: 'cell',
          key: 'header',
          props: { isSelectionCell: true },
        }
      }

      if (typeof children === 'function') {
        for (const column of context.columns) {
          yield {
            type: 'cell',
            element: children(column.key),
            key: column.key,
          }
        }

        if (UNSTABLE_childItems) {
          for (const child of UNSTABLE_childItems) {
            yield { type: 'item', value: child }
          }
        }
      } else {
        const cells: PartialNode<T>[] = []
        const childRows: PartialNode<T>[] = []
        let columnCount = 0

        React.Children.forEach(children, node => {
          if (!node) return
          if ((node as any).type === Row) {
            if (cells.length < context.columns.length) {
              throw new Error(
                "All of a Row's child Cells must be positioned before any child Rows."
              )
            }

            childRows.push({ type: 'item', element: node as ReactElement<ReactTypesRowProps<T>> })
          } else {
            cells.push({ type: 'cell', element: node as any })
            columnCount += (node as any).props?.colSpan ?? 1
          }
        })

        if (columnCount !== context.columns.length) {
          throw new Error(
            `Cell count must match column count. Found ${columnCount} cells and ${context.columns.length} columns.`
          )
        }

        yield* cells
        yield* childRows
      }
    },
    shouldInvalidate(newContext: any) {
      return (
        newContext.columns.length !== context.columns.length ||
        newContext.columns.some((c: any, i: number) => c.key !== context.columns[i].key) ||
        newContext.showSelectionCheckboxes !== context.showSelectionCheckboxes ||
        newContext.showDragButtons !== context.showDragButtons ||
        newContext.selectionMode !== context.selectionMode
      )
    },
  } satisfies PartialNode<T>
}
