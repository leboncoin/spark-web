import { cva, VariantProps } from 'class-variance-authority'

export const drawerBodyStyles = cva(
  ['grow', 'overflow-y-auto', 'outline-hidden', 'focus-visible:u-outline'],
  {
    variants: {
      inset: {
        true: '',
        false: 'px-xl py-lg',
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
)

export type DrawerBodyStylesProps = VariantProps<typeof drawerBodyStyles>
