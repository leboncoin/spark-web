import { cva, type VariantProps } from 'class-variance-authority'

import { filledVariants, tintedVariants } from './snackbarVariants'

export const snackbarItemVariant = cva(
  [
    'rounded-md shadow-sm',
    'max-w-[600px]',
    'cursor-default pointer-events-auto touch-none select-none',
    'absolute',
    /**
     * Focus
     */
    'group-focus-visible:outline-hidden group-focus-visible:u-outline group-not-focus-visible:ring-inset',
    /**
     * Positionning
     */
    'group-data-[position=bottom]:bottom-0 group-data-[position=bottom-left]:bottom-0 group-data-[position=bottom-right]:bottom-0',
    'group-data-[position=top]:top-0 group-data-[position=top-left]:top-0 group-data-[position=top-right]:top-0',
    /**
     * Animation and opacity
     */
    '[animation-fill-mode: forwards]!',
    'data-[animation=queued]:animate-fade-in',
    'data-[animation=entering]:easing-decelerate-back',
    'data-[animation=exiting]:easing-standard',
    // Parent position bottom|bottom-left|bottom-right
    'data-[animation=entering]:group-data-[position=bottom]:[&:not([data-swipe])]:animate-slide-in-bottom',
    'data-[animation=exiting]:opacity-0 data-[animation=exiting]:transition-opacity',
    'data-[animation=exiting]:group-data-[position=bottom]:[&:not([data-swipe])]:animate-slide-out-bottom',
    'data-[animation=entering]:group-data-[position=bottom-left]:[&:not([data-swipe])]:animate-slide-in-bottom',
    'data-[animation=exiting]:group-data-[position=bottom-left]:[&:not([data-swipe])]:animate-slide-out-bottom',
    'data-[animation=entering]:group-data-[position=bottom-right]:[&:not([data-swipe])]:animate-slide-in-bottom',
    'data-[animation=exiting]:group-data-[position=bottom-right]:[&:not([data-swipe])]:animate-slide-out-bottom',
    // Parent position top|top-left|top-right
    'data-[animation=entering]:group-data-[position=top]:[&:not([data-swipe])]:animate-slide-in-top',
    'data-[animation=exiting]:group-data-[position=top]:[&:not([data-swipe])]:animate-slide-out-top',
    'data-[animation=entering]:group-data-[position=top-left]:[&:not([data-swipe])]:animate-slide-in-top',
    'data-[animation=exiting]:group-data-[position=top-left]:[&:not([data-swipe])]:animate-slide-out-top',
    'data-[animation=entering]:group-data-[position=top-right]:[&:not([data-swipe])]:animate-slide-in-top',
    'data-[animation=exiting]:group-data-[position=top-right]:[&:not([data-swipe])]:animate-slide-out-top',
    /**
     * Swipe
     */
    'data-[swipe=move]:data-[swipe-direction=right]:translate-x-(--swipe-position-x)',
    'data-[swipe=move]:data-[swipe-direction=left]:translate-x-(--swipe-position-x)',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:data-[swipe-direction=right]:animate-standalone-swipe-out-right',
    'data-[swipe=end]:data-[swipe-direction=left]:animate-standalone-swipe-out-left',
  ],
  {
    variants: {
      /**
       * Set different look and feel
       * @default 'filled'
       */
      design: {
        filled: '',
        tinted: '',
      },
      /**
       * Set color intent
       * @default 'neutral'
       */
      intent: {
        success: '',
        alert: '',
        error: '',
        info: '',
        neutral: '',
        main: '',
        basic: '',
        support: '',
        accent: '',
        inverse: '',
      },
    },
    compoundVariants: [...filledVariants, ...tintedVariants],
    defaultVariants: {
      design: 'filled',
      intent: 'neutral',
    },
  }
)

export const snackbarItemVariantContent = cva(
  [
    'inline-grid items-center',
    'col-start-1 row-start-1',
    'px-md', // applying padding on the parent prevents VoiceOver on Safari from reading snackbar content 🤷
  ],
  {
    variants: {
      /**
       * Force action button displaying on a new line
       * @default false
       */
      actionOnNewline: {
        true: [
          'grid-rows-[52px_1fr_52px]',
          'grid-cols-[min-content_1fr_min-content]',
          "[grid-template-areas:'icon_message_close'_'._message_.'_'action_action_action']",
        ],
        false: [
          'grid-cols-[min-content_1fr_min-content_min-content]',
          "[grid-template-areas:'icon_message_action_close']",
        ],
      },
    },
    defaultVariants: {
      actionOnNewline: false,
    },
  }
)

export type SnackbarItemVariantProps = VariantProps<typeof snackbarItemVariant>
export type SnackbarItemVariantContentProps = VariantProps<typeof snackbarItemVariantContent>
