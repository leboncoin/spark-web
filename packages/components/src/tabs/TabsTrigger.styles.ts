import { makeVariants } from '@spark-ui/internal-utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const triggerVariants = cva(
  [
    'px-md',
    'relative flex flex-none items-center',
    'border-outline',
    'outline-hidden',
    'hover:bg-surface-hovered',
    'after:absolute',
    'data-[orientation=horizontal]:border-b-sm data-[orientation=horizontal]:after:inset-x-0 data-[orientation=horizontal]:after:bottom-[-1px] data-[orientation=horizontal]:after:h-sz-2',
    'data-[orientation=vertical]:border-r-sm data-[orientation=vertical]:after:inset-y-0 data-[orientation=vertical]:after:right-[-1px] data-[orientation=vertical]:after:w-sz-2',
    'focus-visible:border-none focus-visible:bg-surface-hovered focus-visible:u-outline-inset',
    'disabled:cursor-not-allowed disabled:opacity-dim-3',
    'duration-300 ease-linear',
    'gap-md [&>*:first-child]:ml-md [&>*:last-child]:mr-md',
    '[&>svg:last-child:first-child]:mx-auto',
  ],
  {
    variants: {
      /**
       * Change the color scheme of the tabs
       * @default basic
       */
      intent: makeVariants<'intent', ['main', 'support', 'basic']>({
        main: ['data-[state=active]:text-main data-[state=active]:after:bg-main'],
        support: ['data-[state=active]:text-support data-[state=active]:after:bg-support'],
        basic: ['data-[state=active]:text-basic data-[state=active]:after:bg-basic'],
      }),
      /**
       * Change the size of the tabs
       * @default md
       */
      size: {
        xs: ['h-sz-32 min-w-sz-32 text-caption'],
        sm: ['h-sz-36 min-w-sz-36 text-body-2'],
        md: ['h-sz-40 min-w-sz-40 text-body-1'],
      },
    },
    defaultVariants: {
      intent: 'basic',
      size: 'md',
    },
  }
)

export type TabsTriggerVariantsProps = VariantProps<typeof triggerVariants>
