import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'
import {
  Button,
  Collection,
  Row as AriaRow,
  type RowProps as AriaRowProps,
  useTableOptions,
} from 'react-aria-components'

import { Cell } from './TableCell'
import { TableSelectionCheckbox } from './TableSelectionCheckbox'

export interface RowProps<T extends object = object> extends Omit<AriaRowProps<T>, 'className'> {
  className?: string
}

export function Row<T extends object>({ id, columns, children, className, ...props }: RowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions()

  return (
    <AriaRow
      id={id}
      data-spark-component="table-row"
      className={cx(
        'group/row',
        'h-sz-80', // first row: 96px so 16px gap (border-t) + 80px content
        'group/row text-on-surface relative cursor-default select-none',
        '[-webkit-tap-highlight-color:transparent]',
        'data-focus-visible:u-outline-inset outline-none data-focus-visible:outline-dashed',
        'data-react-aria-pressable:hover:bg-surface-hovered data-react-aria-pressable:pressed:bg-surface-hovered',
        // Selected row styles
        'data-selected:bg-support-container data-selected:text-on-support-container',
        'data-selected:hover:bg-support-container-hovered data-selected:data-pressed:bg-support-container-hovered',
        // Disabled row styles
        'data-disabled:text-on-surface/dim-3',
        // Href row styles
        'data-href:cursor-pointer',
        className
      )}
      columns={columns}
      {...props}
    >
      {allowsDragging && (
        <Cell>
          <Button
            slot="drag"
            className="w-sz-15 data-focus-visible:u-outline flex items-center justify-center text-center outline-none data-[focus-visible]:rounded-md"
          >
            ≡
          </Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell checkbox>
          <TableSelectionCheckbox />
        </Cell>
      )}
      {columns != null ? (
        <Collection items={columns}>{children}</Collection>
      ) : (
        (children as ReactNode)
      )}
    </AriaRow>
  )
}

Row.displayName = 'Table.Row'
