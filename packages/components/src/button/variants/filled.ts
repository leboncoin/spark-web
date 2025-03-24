import { tw } from '@spark-ui/internal-utils'

export const filledVariants = [
  // Main
  {
    intent: 'main',
    design: 'filled',
    class: tw([
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
      'bg-surface',
      'text-on-surface',
      'hover:bg-surface-hovered',
      'enabled:active:bg-surface-hovered',
      'focus-visible:bg-surface-hovered',
    ]),
  },
] as const
