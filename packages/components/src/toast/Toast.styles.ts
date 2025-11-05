import { cva, VariantProps } from 'class-variance-authority'

export const toastStyles = cva(
  [
    'gap-lg p-md flex w-max !w-[min(400px,calc(100vw-2rem))] flex-col rounded-lg',
    'absolute right-0 bottom-0 left-auto mr-0',
    'bg-clip-padding shadow-md select-none',
    'focus-visible:ring-focus focus-visible:ring-2 focus-visible:outline-none',
    'z-[calc(1000-var(--toast-index))]',
    "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
    // Stack effect while not focused
    '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+calc(min(var(--toast-index),10)*-16px)))_scale(calc(max(0,1-(var(--toast-index)*0.1))))]',
    // Scale and translate
    'ease-standard [transition-property:opacity,transform]',
    'duration-400',
    // Present when the toast is animating in.
    'data-[starting-style]:[transform:translateY(150%)]',
    // Expanded: Present when the toast is expanded in the viewport.
    'data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y)))]',
    // Present when the toast is animating out.
    'data-[ending-style]:duration-250',
    'data-[ending-style]:opacity-0',
    'data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
    'data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
    'data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
    // Limited: Present when the toast was removed due to exceeding the limit.
    'data-[limited]:opacity-0',
  ],
  {
    variants: {
      design: {
        filled: '',
        tinted: '',
      },
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
        surface: '',
        surfaceInverse: '',
      },
    },
    compoundVariants: [
      // Filled variants
      {
        design: 'filled',
        intent: 'success',
        class: ['bg-success text-on-success'],
      },
      {
        design: 'filled',
        intent: 'alert',
        class: ['bg-alert text-on-alert'],
      },
      {
        design: 'filled',
        intent: 'error',
        class: ['bg-error text-on-error'],
      },
      {
        design: 'filled',
        intent: 'info',
        class: ['bg-info text-on-info'],
      },
      {
        design: 'filled',
        intent: 'neutral',
        class: ['bg-neutral text-on-neutral'],
      },
      {
        design: 'filled',
        intent: 'main',
        class: ['bg-main text-on-main'],
      },
      {
        design: 'filled',
        intent: 'basic',
        class: ['bg-basic text-on-basic'],
      },
      {
        design: 'filled',
        intent: 'support',
        class: ['bg-support text-on-support'],
      },
      {
        design: 'filled',
        intent: 'accent',
        class: ['bg-accent text-on-accent'],
      },
      {
        design: 'filled',
        intent: 'surface',
        class: ['bg-surface text-on-surface'],
      },
      {
        design: 'filled',
        intent: 'surfaceInverse',
        class: ['bg-surface-inverse text-on-surface-inverse'],
      },

      // Tinted variants
      {
        design: 'tinted',
        intent: 'success',
        class: ['bg-success-container text-on-success-container'],
      },
      {
        design: 'tinted',
        intent: 'alert',
        class: ['bg-alert-container text-on-alert-container'],
      },
      {
        design: 'tinted',
        intent: 'error',
        class: ['bg-error-container text-on-error-container'],
      },
      {
        design: 'tinted',
        intent: 'info',
        class: ['bg-info-container text-on-info-container'],
      },
      {
        design: 'tinted',
        intent: 'neutral',
        class: ['bg-neutral-container text-on-neutral-container'],
      },
      {
        design: 'tinted',
        intent: 'main',
        class: ['bg-main-container text-on-main-container'],
      },
      {
        design: 'tinted',
        intent: 'basic',
        class: ['bg-basic-container text-on-basic-container'],
      },
      {
        design: 'tinted',
        intent: 'support',
        class: ['bg-support-container text-on-support-container'],
      },
      {
        design: 'tinted',
        intent: 'accent',
        class: ['bg-accent-container text-on-accent-container'],
      },
      {
        design: 'tinted',
        intent: 'surface',
        class: ['bg-surface text-on-surface'],
      },
      {
        design: 'tinted',
        intent: 'surfaceInverse',
        class: ['bg-surface-inverse text-on-surface-inverse'],
      },
    ],
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
    'pl-md pr-lg', // applying padding on the parent prevents VoiceOver on Safari from reading snackbar content 🤷
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

export type ToastVariantProps = VariantProps<typeof toastStyles>
export type SnackbarItemVariantContentProps = VariantProps<typeof snackbarItemVariantContent>
