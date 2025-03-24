import { tw } from './default'

export const outlinedVariants = [
  {
    intent: 'main',
    design: 'outlined',
    class: tw(['text-main']),
  },
  {
    intent: 'support',
    design: 'outlined',
    class: tw(['text-support']),
  },
  {
    intent: 'accent',
    design: 'outlined',
    class: tw(['text-accent']),
  },
  {
    intent: 'basic',
    design: 'outlined',
    class: tw(['text-basic']),
  },
  {
    intent: 'success',
    design: 'outlined',
    class: tw(['text-success']),
  },
  {
    intent: 'alert',
    design: 'outlined',
    class: tw(['text-alert']),
  },
  {
    intent: 'danger',
    design: 'outlined',
    class: tw(['text-error']),
  },
  {
    intent: 'info',
    design: 'outlined',
    class: tw(['text-info']),
  },
  {
    intent: 'neutral',
    design: 'outlined',
    class: tw(['text-neutral']),
  },
] as const
