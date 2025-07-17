import { tw } from '@spark-ui/internal-utils'

export const highlightedVariants = [
  // Main
  {
    intent: 'main',
    design: 'highlighted',
    class: tw(['  before:from-main/dim-4 before:to-main/dim-2']),
  },
  // Support
  {
    intent: 'support',
    design: 'highlighted',
    class: tw(['before:from-support/dim-4 before:to-support/dim-2']),
  },
  // Accent
  {
    intent: 'accent',
    design: 'highlighted',
    class: tw(['before:from-accent/dim-4 before:to-accent/dim-2']),
  },
  // Basic
  {
    intent: 'basic',
    design: 'highlighted',
    class: tw(['before:from-basic/dim-4 before:to-basic/dim-2']),
  },
  // Success
  {
    intent: 'success',
    design: 'highlighted',
    class: tw(['before:from-success/dim-4 before:to-success/dim-2']),
  },
  // Alert
  {
    intent: 'alert',
    design: 'highlighted',
    class: tw(['before:from-alert/dim-4 before:to-alert/dim-2']),
  },
  // Danger
  {
    intent: 'danger',
    design: 'highlighted',
    class: tw(['before:from-error/dim-4 before:to-error/dim-2']),
  },
  // Info
  {
    intent: 'info',
    design: 'highlighted',
    class: tw(['before:from-info/dim-4 before:to-info/dim-2']),
  },
  // Neutral
  {
    intent: 'neutral',
    design: 'highlighted',
    class: tw(['before:from-neutral/dim-4 before:to-neutral/dim-2']),
  },
  // Surface
  {
    intent: 'surface',
    design: 'highlighted',
    class: tw(['before:from-surface/dim-4 before:to-surface/dim-2']),
  },
] as const
