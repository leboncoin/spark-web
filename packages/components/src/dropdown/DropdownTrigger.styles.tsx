import { cva } from 'class-variance-authority'

export const styles = cva(
  [
    'flex w-full items-center justify-between',
    'min-h-sz-44 rounded-lg bg-surface text-on-surface px-lg',
    'text-body-1',
    // outline styles
    'ring-1 outline-hidden ring-inset focus:ring-2',
  ],
  {
    variants: {
      state: {
        undefined: 'ring-outline focus:ring-outline-high',
        error: 'ring-error',
        alert: 'ring-alert',
        success: 'ring-success',
      },
      disabled: {
        true: 'disabled:bg-on-surface/dim-5 cursor-not-allowed text-on-surface/dim-3',
      },
      readOnly: {
        true: 'disabled:bg-on-surface/dim-5 cursor-not-allowed text-on-surface/dim-3',
      },
    },
    compoundVariants: [
      {
        disabled: false,
        state: undefined,
        class: 'hover:ring-outline-high',
      },
    ],
  }
)
