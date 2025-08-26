import { tw } from '@spark-ui/internal-utils'

export const filledVariants = [
  // Main
  {
    intent: 'main',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-main',
      'bg-main',
      'text-on-main',
      'hover:bg-main-hovered',
      'enabled:active:bg-main-hovered',
      'focus-visible:bg-main-hovered',
    ]),
  },
  // Support
  {
    intent: 'support',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-support',
      'bg-support',
      'text-on-support',
      'hover:bg-support-hovered',
      'enabled:active:bg-support-hovered',
      'focus-visible:bg-support-hovered',
    ]),
  },
  // Accent
  {
    intent: 'accent',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-accent',
      'bg-accent',
      'text-on-accent',
      'hover:bg-accent-hovered',
      'enabled:active:bg-accent-hovered',
      'focus-visible:bg-accent-hovered',
    ]),
  },
  // Basic
  {
    intent: 'basic',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-basic',
      'bg-basic',
      'text-on-basic',
      'hover:bg-basic-hovered',
      'enabled:active:bg-basic-hovered',
      'focus-visible:bg-basic-hovered',
    ]),
  },
  // Success
  {
    intent: 'success',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-success',
      'bg-success',
      'text-on-success',
      'hover:bg-success-hovered',
      'enabled:active:bg-success-hovered',
      'focus-visible:bg-success-hovered',
    ]),
  },
  // Alert
  {
    intent: 'alert',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-alert',
      'bg-alert',
      'text-on-alert',
      'hover:bg-alert-hovered',
      'enabled:active:bg-alert-hovered',
      'focus-visible:bg-alert-hovered',
    ]),
  },
  // Danger
  {
    intent: 'danger',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-error',
      'text-on-error bg-error',
      'hover:bg-error-hovered enabled:active:bg-error-hovered',
      'focus-visible:bg-error-hovered',
    ]),
  },
  // Info
  {
    intent: 'info',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-info',
      'text-on-error bg-info',
      'hover:bg-info-hovered enabled:active:bg-info-hovered',
      'focus-visible:bg-info-hovered',
    ]),
  },
  // Neutral
  {
    intent: 'neutral',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-neutral',
      'bg-neutral',
      'text-on-neutral',
      'hover:bg-neutral-hovered',
      'enabled:active:bg-neutral-hovered',
      'focus-visible:bg-neutral-hovered',
    ]),
  },
  // Surface
  {
    intent: 'surface',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-surface',
      'bg-surface',
      'text-on-surface',
      'hover:bg-surface-hovered',
      'enabled:active:bg-surface-hovered',
      'focus-visible:bg-surface-hovered',
    ]),
  },
  {
    intent: 'surfaceInverse',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-surface-inverse',
      'bg-surface-inverse',
      'text-on-surface-inverse',
      'hover:bg-surface-inverse-hovered',
      'enabled:active:bg-surface-inverse-hovered',
      'focus-visible:bg-surface-inverse-hovered',
    ]),
  },
] as const
