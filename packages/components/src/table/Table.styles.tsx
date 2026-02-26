import { cva, type VariantProps } from 'class-variance-authority'

export const columnStyles = cva(
  [
    'h-sz-64 min-w-sz-64',
    'relative group/column first:rounded-l-xl last:rounded-r-xl bg-neutral-container',
    'px-lg py-sm text-left outline-none box-border',
    'cursor-default',
    'data-focus-visible:u-outline data-focus-visible:-outline-offset-2',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
)

export const columnHeaderContentStyles = cva(
  [
    'flex flex-1 justify-between items-center gap-md',
    'font-inherit text-left text-inherit',
    'whitespace-nowrap text-ellipsis',
    'border-transparent',
    'data-focus-visible:u-outline data-focus-visible:outline-offset-2',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
)

export const tableBodyStyles = cva(
  ['empty:italic empty:text-center empty:text-body-2 empty:py-lg'],
  {
    variants: {},
    defaultVariants: {},
  }
)

export const cellStyles = cva(
  [
    'p-lg outline-none box-border default:overflow-hidden',
    'border-b-sm border-outline [tr:last-child>&]:border-b-0',
    '[-webkit-tap-highlight-color:transparent]',
    'data-focus-visible:u-outline-inset data-focus-visible:outline-dashed',
  ],
  {
    variants: {
      /** When true, matches width + padding of the TableSelectionCheckbox header column (w-sz-64, py-sm, no horizontal padding). Use cellCheckboxInnerStyles on the inner wrapper to fill height and center content. */
      checkbox: {
        true: ['w-sz-64 py-sm px-0 align-middle'],
      },
    },
    defaultVariants: {
      checkbox: false,
    },
  }
)

/** Spacer row: 16px (md) visual gap between header and first data row. Use as first child of tbody. */
export const tableBodySpacerRowStyles = cva(
  [
    'pointer-events-none',
    '[&_td]:h-sz-16 [&_td]:p-0 [&_td]:border-0 [&_td]:border-b-0 [&_td]:bg-surface [&_td]:align-middle',
  ],
  { variants: {}, defaultVariants: {} }
)

export type ColumnStylesProps = VariantProps<typeof columnStyles>
export type CellStylesProps = VariantProps<typeof cellStyles>
