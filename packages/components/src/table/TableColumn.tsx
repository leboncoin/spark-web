import type { PartialNode } from '@react-stately/collections'
import type { Key } from '@react-types/shared'
import type { ColumnProps as ReactTypesColumnProps } from '@react-types/table'
import React, { type ReactElement, type ReactNode } from 'react'

export interface ColumnProps<T extends object = object> extends Omit<
  ReactTypesColumnProps<T>,
  'title' | 'children'
> {
  /** Spark-only props. Stored on the column node and used by the renderer. */
  className?: string
  /** Stable key for the column (Spark API). */
  id?: Key
  /** Header label (Spark API). */
  label: string
  /** Optional header content (Spark API). */
  children?: ReactNode
  allowsResizing?: boolean
}

/** A column definition for the table. This is a collection component that does not render DOM. */
export function Column<T extends object>({
  label,
  allowsResizing = true,
  ...props
}: ColumnProps<T>) {
  // Collection component: does not render DOM.
  void label
  void allowsResizing
  void props
  return null
}

Column.displayName = 'Table.Column'

// React Stately collection static for useTableState, but with Spark's `id` support:
// React Stately's CollectionBuilder derives keys from React element keys, not `props.id`,
// so we explicitly set `key` from the `id` prop to preserve Spark's API and tests.
;(Column as any).getCollectionNode = function* getCollectionNode<T>(
  columnProps: ReactTypesColumnProps<T> & { label?: string; allowsResizing?: boolean },
  context: any
): Generator<PartialNode<T>, void, any> {
  const rendered =
    (columnProps as any).title ?? (columnProps as any).label ?? columnProps.children ?? null
  const textValue =
    (columnProps as any).textValue ||
    (typeof rendered === 'string' ? rendered : '') ||
    (columnProps as any)['aria-label']

  const idKey = (columnProps as any).id

  const fullNodes = (yield {
    type: 'column',
    key: idKey ?? null,
    hasChildNodes:
      !!(columnProps as any).childColumns ||
      (!!(columnProps as any).title && React.Children.count(columnProps.children) > 0),
    rendered,
    textValue,
    props: {
      ...(columnProps as any),
      title: (columnProps as any).title ?? (columnProps as any).label,
      allowsResizing: (columnProps as any).allowsResizing,
    },
    *childNodes() {
      if ((columnProps as any).childColumns) {
        for (const child of (columnProps as any).childColumns) {
          yield { type: 'column', value: child }
        }
      } else if ((columnProps as any).title) {
        const childColumns: PartialNode<T>[] = []
        React.Children.forEach(columnProps.children, child => {
          childColumns.push({
            type: 'column',
            element: child as ReactElement<ReactTypesColumnProps<T>>,
          })
        })
        yield* childColumns
      }
    },
    shouldInvalidate(newContext: any) {
      updateContext(newContext)
      return false
    },
  } as PartialNode<T>) as any

  const updateContext = (ctx: any) => {
    for (const node of fullNodes) {
      if (!node.hasChildNodes) {
        ctx.columns.push(node)
      }
    }
  }

  updateContext(context)
}
