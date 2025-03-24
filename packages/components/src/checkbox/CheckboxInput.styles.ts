import { makeVariants } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const checkboxInputStyles = cva(
  [
    'size-sz-24 shrink-0 items-center justify-center rounded-sm border-md bg-transparent',
    'disabled:cursor-not-allowed disabled:opacity-dim-3 disabled:hover:ring-0',
    'focus-visible:u-outline',
    'hover:ring-4 hover:cursor-pointer',
    'u-shadow-border-transition',
  ],
  {
    variants: {
      /**
       * Color scheme of the checkbox.
       */
      intent: makeVariants<
        'intent',
        ['main', 'support', 'accent', 'basic', 'success', 'alert', 'error', 'info', 'neutral']
      >({
        main: [
          'text-on-main',
          'hover:ring-main-container',
          // data-[ok=cool]:bg-main
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-main data-[state=indeterminate]:bg-main',
          'data-[state=checked]:border-main data-[state=checked]:bg-main',
        ],
        support: [
          'text-on-support',
          'hover:ring-support-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-support data-[state=indeterminate]:bg-support',
          'data-[state=checked]:border-support data-[state=checked]:bg-support',
        ],
        accent: [
          'text-on-accent',
          'hover:ring-accent-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent',
          'data-[state=checked]:border-accent data-[state=checked]:bg-accent',
        ],
        basic: [
          'text-on-basic',
          'hover:ring-basic-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-basic data-[state=indeterminate]:bg-basic',
          'data-[state=checked]:border-basic data-[state=checked]:bg-basic',
        ],
        success: [
          'text-on-success',
          'hover:ring-success-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-success data-[state=indeterminate]:bg-success',
          'data-[state=checked]:border-success data-[state=checked]:bg-success',
        ],
        alert: [
          'text-on-alert',
          'hover:ring-alert-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-alert data-[state=indeterminate]:bg-alert',
          'data-[state=checked]:border-alert data-[state=checked]:bg-alert',
        ],
        error: [
          'text-on-error',
          'hover:ring-error-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-error data-[state=indeterminate]:bg-error',
          'data-[state=checked]:border-error data-[state=checked]:bg-error',
        ],
        info: [
          'text-on-info',
          'hover:ring-info-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-info data-[state=indeterminate]:bg-info',
          'data-[state=checked]:border-info data-[state=checked]:bg-info',
        ],
        neutral: [
          'text-on-neutral',
          'hover:ring-neutral-container',
          'data-[state=unchecked]:border-outline',
          'data-[state=indeterminate]:border-neutral data-[state=indeterminate]:bg-neutral',
          'data-[state=checked]:border-neutral data-[state=checked]:bg-neutral',
        ],
      }),
    },
    defaultVariants: {
      intent: 'basic',
    },
  }
)

export type CheckboxInputStylesProps = VariantProps<typeof checkboxInputStyles>
