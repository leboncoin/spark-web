import { cva } from 'class-variance-authority'

export const styles = cva(
  [
    'relative flex w-full items-center justify-between',
    'min-h-sz-44 rounded-lg px-lg',
    'text-body-1',
    // outline styles
    'ring-1 outline-hidden ring-inset',
  ],
  {
    variants: {
      state: {
        undefined: 'ring-outline',
        error: 'ring-error',
        alert: 'ring-alert',
        success: 'ring-success',
      },
      disabled: {
        false: 'focus-within:ring-2',
      },
      readOnly: {
        true: '',
      },
    },
    compoundVariants: [
      {
        readOnly: false,
        disabled: false,
        class: 'bg-surface text-on-surface',
      },
      {
        readOnly: true,
        class: 'bg-on-surface/dim-5 text-on-surface cursor-default',
      },
      {
        disabled: true,
        class: ['bg-on-surface/dim-5 text-on-surface/dim-3', 'cursor-not-allowed'],
      },
      {
        disabled: false,
        state: undefined,
        class: 'hover:ring-outline-high focus-within:ring-outline-high',
      },
    ],
  }
)
