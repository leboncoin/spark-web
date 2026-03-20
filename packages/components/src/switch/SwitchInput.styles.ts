import { makeVariants, tw } from '@spark-ui/internal-utils'
import { cva, VariantProps } from 'class-variance-authority'

export const styles = cva(
  tw([
    'relative shrink-0 self-baseline',
    'cursor-pointer',
    'rounded-full border-transparent',
    'hover:ring-4',
    'transition-colors duration-200 ease-in-out',
    'disabled:hover:ring-transparent disabled:cursor-not-allowed disabled:opacity-dim-3',
    'focus-visible:u-outline',
    'data-unchecked:bg-on-surface/dim-3',
    'u-shadow-border-transition',
    'overflow-x-hidden',
  ]),
  {
    variants: {
      /**
       * Size of the switch input.
       */
      size: makeVariants<'size', ['sm', 'md']>({
        sm: tw(['h-sz-24', 'w-sz-40', 'border-md']),
        md: tw(['h-sz-32', 'w-sz-56', 'border-[4px]']),
      }),
      /**
       * Color scheme of the switch input.
       */
      intent: makeVariants<
        'intent',
        ['main', 'support', 'accent', 'success', 'alert', 'error', 'info', 'neutral']
      >({
        main: ['[&[data-checked]]:bg-main', 'hover:ring-main-container', 'text-main'],
        support: ['[&[data-checked]]:bg-support', 'hover:ring-support-container', 'text-support'],
        accent: ['[&[data-checked]]:bg-accent', 'hover:ring-accent-container', 'text-accent'],
        success: ['[&[data-checked]]:bg-success', 'hover:ring-success-container', 'text-success'],
        alert: ['[&[data-checked]]:bg-alert', 'hover:ring-alert-container', 'text-alert'],
        error: ['[&[data-checked]]:bg-error', 'hover:ring-error-container', 'text-error'],
        info: ['[&[data-checked]]:bg-info', 'hover:ring-info-container', 'text-info'],
        neutral: ['[&[data-checked]]:bg-neutral', 'hover:ring-neutral-container', 'text-neutral'],
      }),
    },
    defaultVariants: {
      intent: 'support',
      size: 'sm',
    },
  }
)

export type StylesProps = VariantProps<typeof styles>

export const thumbWrapperStyles = cva(
  [
    'pointer-events-none absolute inset-0 flex items-center',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      checked: {
        true: 'translate-x-full',
        false: 'translate-x-0',
      },
    },
  }
)

export const thumbStyles = cva(
  [
    'absolute left-0 top-0 flex items-center justify-center',
    'bg-surface',
    'rounded-full',
    'ring-0',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      size: makeVariants<'size', ['sm', 'md']>({
        sm: ['h-sz-20', 'w-sz-20'],
        md: ['h-sz-24', 'w-sz-24'],
      }),
      checked: {
        true: '-translate-x-full',
        false: 'translate-x-0 text-on-surface/dim-2',
      },
    },
    defaultVariants: {
      size: 'sm',
      checked: false,
    },
  }
)

export const thumbCheckSVGStyles = cva(['transition-opacity duration-200'], {
  variants: {
    size: makeVariants<'size', ['sm', 'md']>({
      sm: ['h-sz-10 w-sz-10'],
      md: ['h-sz-12 w-sz-12'],
    }),
  },
  defaultVariants: {
    size: 'sm',
  },
})
