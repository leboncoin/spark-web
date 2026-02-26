import { Icon } from '@spark-ui/components/icon'
import { ArrowUp } from '@spark-ui/icons/ArrowUp'
import { Sort } from '@spark-ui/icons/Sort'
import { cx } from 'class-variance-authority'
import type { ReactNode } from 'react'
import {
  Column as AriaColumn,
  type ColumnProps as AriaColumnProps,
  type ColumnRenderProps,
  ColumnResizer,
  composeRenderProps,
  Group,
} from 'react-aria-components'

import { columnStyles } from './Table.styles'
import { isInteractiveElement } from './table-utils'
import { useTableResizableContext } from './TableContext'

export interface ColumnProps extends Omit<AriaColumnProps, 'className'> {
  className?: string
  children?: AriaColumnProps['children']
  label: string
  /** When false, the column cannot be resized. When true or omitted, the column can be resized when the Table has allowsResizing. */
  allowsResizing?: boolean
}

export function Column({
  className,
  label,
  children,
  allowsResizing = true,
  minWidth = 180,
  ...props
}: ColumnProps) {
  const { isResizable } = useTableResizableContext()

  const childrenOrRenderFn = children as
    | ReactNode
    | ((renderProps: ColumnRenderProps & { defaultChildren?: ReactNode }) => ReactNode)

  return (
    <AriaColumn
      data-spark-component="table-column"
      className={cx(columnStyles(), className)}
      minWidth={minWidth} // necessary to avoid resizing overlapping visual elements
      {...props}
    >
      {composeRenderProps(childrenOrRenderFn, (content, renderProps) => {
        const { allowsSorting, sortDirection } = renderProps

        const stopIfInteractive = (e: React.MouseEvent | React.PointerEvent) => {
          if (isInteractiveElement(e.target)) e.stopPropagation()
        }

        return (
          <>
            <Group
              role="presentation"
              tabIndex={-1}
              className={cx(
                'border-transparent',
                'focus-visible:u-outline focus-visible:outline-offset-2',
                'gap-sm box-border flex flex-1 items-center'
              )}
              onClick={stopIfInteractive}
              onPointerDown={stopIfInteractive}
            >
              <div className="gap-md flex min-w-0 shrink items-center">
                <p className="truncate">{label}</p>

                {children && (
                  <div className="inline-flex shrink-0 items-center">
                    {typeof content === 'function'
                      ? (
                          content as (
                            props: ColumnRenderProps & { defaultChildren?: ReactNode }
                          ) => ReactNode
                        )({ ...renderProps, defaultChildren: undefined })
                      : content}
                  </div>
                )}
              </div>

              {allowsSorting && (
                <span className="size-sz-32 ml-auto inline-flex shrink-0 items-center justify-center rounded-full">
                  <Icon size="sm" className={cx(sortDirection === 'descending' && 'rotate-180')}>
                    {sortDirection ? <ArrowUp /> : <Sort />}
                  </Icon>
                </span>
              )}
            </Group>

            {isResizable && allowsResizing && !props.width && (
              <ColumnResizer
                className={cx(
                  'z-raised absolute top-0 right-[-8px]',
                  'group-last/column:hidden',
                  'h-full w-[16px] touch-none',
                  'mx-0 cursor-col-resize',
                  'data-focus-visible:after:u-outline',
                  'data-resizing:after:bg-outline-high after:transition-transform after:duration-200 data-resizing:after:scale-125',
                  'after:h-sz-32 after:bg-outline after:absolute after:top-1/2 after:left-1/2 after:w-[2px] after:-translate-y-1/2'
                )}
              />
            )}
          </>
        )
      })}
    </AriaColumn>
  )
}

Column.displayName = 'Table.Column'
