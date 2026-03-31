import { cx } from 'class-variance-authority'
import { Cell as AriaCell, type CellProps as AriaCellProps } from 'react-aria-components'

import { cellStyles } from './Table.styles'
import { isInteractiveElement } from './table-utils'

export interface CellProps extends Omit<AriaCellProps, 'className'> {
  className?: string
  /** When true, cell uses same width + padding as the TableSelectionCheckbox header column. */
  checkbox?: boolean
}

export function Cell({ className, checkbox, onClick, onPointerDown, ...props }: CellProps) {
  const stopIfInteractive = (e: React.MouseEvent | React.PointerEvent) => {
    if (isInteractiveElement(e.target)) e.stopPropagation()
  }

  return (
    <AriaCell
      data-spark-component="table-cell"
      className={cx(cellStyles({ checkbox }), className)}
      onClick={e => {
        stopIfInteractive(e)
        onClick?.(e)
      }}
      onPointerDown={e => {
        stopIfInteractive(e)
        onPointerDown?.(e)
      }}
      {...props}
    />
  )
}

Cell.displayName = 'Table.Cell'
