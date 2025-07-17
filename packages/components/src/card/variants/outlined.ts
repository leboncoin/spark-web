import { tw } from '@spark-ui/internal-utils'

export const outlinedVariants = [
  {
    intent: 'main',
    design: 'outlined',
    class: tw(['text-main border-current']),
  },
  {
    intent: 'support',
    design: 'outlined',
    class: tw(['text-support border-current']),
  },
  {
    intent: 'accent',
    design: 'outlined',
    class: tw(['text-accent border-current']),
  },
  {
    intent: 'basic',
    design: 'outlined',
    class: tw(['text-basic border-current']),
  },
  {
    intent: 'success',
    design: 'outlined',
    class: tw(['text-success border-current']),
  },
  {
    intent: 'alert',
    design: 'outlined',
    class: tw(['text-alert border-current']),
  },
  {
    intent: 'danger',
    design: 'outlined',
    class: tw(['text-error border-current']),
  },
  {
    intent: 'info',
    design: 'outlined',
    class: tw(['text-info border-current']),
  },
  {
    intent: 'neutral',
    design: 'outlined',
    class: tw(['text-neutral border-current']),
  },
  {
    intent: 'surface',
    design: 'outlined',
    class: tw(['text-surface border-outline']),
  },
] as const
