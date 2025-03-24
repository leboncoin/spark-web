import { cva, type VariantProps } from 'class-variance-authority'

export const styles = cva(
  [
    'rounded-md',
    'shadow-sm',
    'focus-visible:outline-hidden focus-visible:u-outline',
    'max-h-(--radix-popper-available-height) overflow-y-auto',
  ],
  {
    variants: {
      intent: {
        surface: 'bg-surface text-on-surface',
        main: 'bg-main-container text-on-main-container',
        support: 'bg-support-container text-on-support-container',
        accent: 'bg-accent-container text-on-accent-container',
        basic: 'bg-basic-container text-on-basic-container',
        success: 'bg-success-container text-on-success-container',
        alert: 'bg-alert-container text-on-alert-container',
        danger: 'bg-error-container text-on-error-container',
        info: 'bg-info-container text-on-info-container',
        neutral: 'bg-neutral-container text-on-neutral-container',
      },
      matchTriggerWidth: {
        true: 'w-(--radix-popper-anchor-width)',
      },
      enforceBoundaries: {
        true: ['max-w-(--radix-popper-available-width)'],
      },

      inset: {
        true: 'overflow-hidden',
        false: 'p-lg',
      },
      elevation: {
        dropdown: 'z-dropdown',
        popover: 'z-popover',
      },
    },
    compoundVariants: [
      {
        inset: false,
        /**
         * When there is a close button, padding to the right side must be adjusted to avoid content overlapping with it.
         */
        class: 'has-data-[spark-component=popover-close-button]:pr-3xl',
      },
      {
        enforceBoundaries: false,
        matchTriggerWidth: false,
        class: 'max-w-[min(var(--spacing-sz-384),100vw)]',
      },
    ],
    defaultVariants: {
      matchTriggerWidth: false,
      enforceBoundaries: false,
      inset: false,
      intent: 'surface',
      elevation: 'popover',
    },
  }
)

export type StylesProps = VariantProps<typeof styles>
