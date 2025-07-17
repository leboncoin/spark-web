import { tw } from '@spark-ui/internal-utils'

export const filledVariants = [
  // Main
  {
    intent: 'main',
    design: 'filled',
    class: tw(['bg-main text-on-main']),
  },
  // Support
  {
    intent: 'support',
    design: 'filled',
    class: tw(['bg-support text-on-support']),
  },
  // Accent
  {
    intent: 'accent',
    design: 'filled',
    class: tw(['bg-accent text-on-accent']),
  },
  // Basic
  {
    intent: 'basic',
    design: 'filled',
    class: tw(['bg-basic text-on-basic']),
  },
  // Success
  {
    intent: 'success',
    design: 'filled',
    class: tw(['bg-success text-on-success']),
  },
  // Alert
  {
    intent: 'alert',
    design: 'filled',
    class: tw(['bg-alert text-on-alert']),
  },
  // Danger
  {
    intent: 'danger',
    design: 'filled',
    class: tw(['text-on-error bg-error']),
  },
  // Info
  {
    intent: 'info',
    design: 'filled',
    class: tw(['text-on-error bg-info']),
  },
  // Neutral
  {
    intent: 'neutral',
    design: 'filled',
    class: tw(['bg-neutral text-on-neutral']),
  },
  // Surface
  {
    intent: 'surface',
    design: 'filled',
    class: tw(['bg-surface text-on-surface']),
  },
] as const
