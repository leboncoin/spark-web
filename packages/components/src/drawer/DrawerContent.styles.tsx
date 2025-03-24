import { cva, VariantProps } from 'class-variance-authority'

export const drawerContentStyles = cva(
  [
    ['fixed', 'z-modal', 'flex', 'flex-col'],
    ['bg-surface', 'shadow-md'],
  ],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
        fluid: '',
        fullscreen: 'h-screen w-screen',
      },
      side: {
        right: [
          'inset-y-0 right-0',
          'data-[state=open]:animate-slide-in-right',
          'data-[state=closed]:animate-slide-out-right',
        ],
        left: [
          'inset-y-0 left-0',
          'data-[state=open]:animate-slide-in-left',
          'data-[state=closed]:animate-slide-out-left',
        ],
        top: [
          'top-0 left-0',
          'w-screen',
          'data-[state=open]:animate-slide-in-top',
          'data-[state=closed]:animate-slide-out-top',
        ],
        bottom: [
          'bottom-0 left-0',
          'w-screen',
          'data-[state=open]:animate-slide-in-bottom',
          'data-[state=closed]:animate-slide-out-bottom',
        ],
      },
    },
    compoundVariants: [
      {
        side: ['right', 'left'],
        size: 'sm',
        class: ['w-sz-480', 'max-w-full'],
      },
      {
        side: ['right', 'left'],
        size: 'md',
        class: ['w-sz-672', 'max-w-full'],
      },
      {
        side: ['right', 'left'],
        size: 'lg',
        class: ['w-sz-864', 'max-w-full'],
      },
      {
        side: ['left', 'right'],
        size: 'fluid',
        class: ['w-auto', 'max-w-full'],
      },
      {
        side: ['top', 'bottom'],
        size: 'sm',
        class: ['h-sz-480', 'max-h-full'],
      },
      {
        side: ['top', 'bottom'],
        size: 'md',
        class: ['h-sz-672', 'max-h-full'],
      },
      {
        side: ['top', 'bottom'],
        size: 'lg',
        class: ['h-sz-864', 'max-h-full'],
      },
      {
        side: ['top', 'bottom'],
        size: 'fluid',
        class: ['h-auto', 'max-h-full'],
      },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
)

export type DrawerContentStylesProps = VariantProps<typeof drawerContentStyles>
