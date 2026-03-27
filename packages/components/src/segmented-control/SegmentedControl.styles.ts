import { cva, VariantProps } from 'class-variance-authority'

export const rootStyles = cva([
  'default:self-start',
  'group inline-grid grid-flow-col auto-cols-fr',
  'relative items-stretch min-w-max',
  'rounded-xl p-sm',
  'bg-surface border-sm border-outline',
])

export const itemStyles = cva([
  'relative z-raised min-h-sz-44 focus-visible:outline-none',
  'flex flex-none items-center justify-center gap-md',
  'default:px-lg default:py-md',
  'rounded-[20px]',
  'cursor-pointer select-none',
  'font-medium',
  'transition-colors duration-150',
  'outline-none',
  'focus-visible:u-outline',
  'data-disabled:cursor-not-allowed data-disabled:opacity-dim-3',
  'data-checked:text-on-support-container',
  // Avoid layout shift: simulate "bold" without changing font metrics.
  // Apply only to wrapped text nodes (not arbitrary nested JSX like Tag).
  'data-checked:[&>[data-spark-segmented-control-text]]:[text-shadow:0.35px_0_currentColor,-0.35px_0_currentColor]',
])

export const indicatorStyles = cva([
  'absolute z-base',
  'rounded-[20px]',
  'bg-support-container border-md border-support',
  'group-has-focus-visible:border-focus',
  'transition-[left,top,width,height] duration-200 ease-in-out',
  'pointer-events-none',
])

export type SegmentedControlStylesProps = VariantProps<typeof itemStyles>
