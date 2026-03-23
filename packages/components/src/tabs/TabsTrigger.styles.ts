import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const triggerVariants = cva(
  [
    'px-md',
    'relative flex flex-none items-center',
    'border-outline',
    'hover:not-disabled:bg-surface-hovered',
    'after:absolute',
    'data-[active]:font-bold',
    'not-data-[active]:not-disabled:cursor-pointer',
    'data-[orientation=horizontal]:border-b-sm data-[orientation=horizontal]:after:inset-x-0 data-[orientation=horizontal]:after:bottom-[-1px] data-[orientation=horizontal]:after:h-sz-2',
    'data-[orientation=vertical]:border-r-sm data-[orientation=vertical]:after:inset-y-0 data-[orientation=vertical]:after:right-[-1px] data-[orientation=vertical]:after:w-sz-2',
    'focus-visible:border-none focus-visible:bg-surface-hovered focus-visible:u-outline-inset',
    'disabled:cursor-not-allowed disabled:opacity-dim-3',
    'gap-md [&>*:first-child]:ml-md [&>*:last-child]:mr-md',
    '[&>svg:last-child:first-child]:mx-auto',
  ],
  {
    variants: {
      /**
       * Change the color scheme of the tabs
       * @default support
       */
      intent: makeVariants<'intent', ['main', 'support']>({
        main: ['data-[active]:text-main data-[active]:after:bg-main'],
        support: ['data-[active]:text-support data-[active]:after:bg-support'],
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
      hasMenu: {
        true: 'pr-3xl',
      },
      orientation: {
        horizontal: '',
        vertical: '',
      },
    },
    compoundVariants: [
      {
        hasMenu: true,
        orientation: 'vertical',
        class: 'w-full',
      },
    ],
    defaultVariants: {
      intent: 'support',
      size: 'md',
      hasMenu: false,
      orientation: 'horizontal',
    },
  }
)

export type TabsTriggerVariantsProps = VariantProps<typeof triggerVariants>
