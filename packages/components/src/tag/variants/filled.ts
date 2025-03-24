import { tw } from './default'

export const filledVariants = [
  {
    intent: 'main',
    design: 'filled',
    class: tw(['bg-main', 'text-on-main']),
  },
  {
    intent: 'support',
    design: 'filled',
    class: tw(['bg-support', 'text-on-support']),
  },
  {
    intent: 'accent',
    design: 'filled',
    class: tw(['bg-accent', 'text-on-accent']),
  },
  {
    intent: 'basic',
    design: 'filled',
    class: tw(['bg-basic', 'text-on-basic']),
  },
  {
    intent: 'success',
    design: 'filled',
    class: tw(['bg-success', 'text-on-success']),
  },
  {
    intent: 'alert',
    design: 'filled',
    class: tw(['bg-alert', 'text-on-alert']),
  },
  {
    intent: 'danger',
    design: 'filled',
    class: tw(['bg-error', 'text-on-error']),
  },
  {
    intent: 'info',
    design: 'filled',
    class: tw(['bg-info', 'text-on-info']),
  },
  {
    intent: 'neutral',
    design: 'filled',
    class: tw(['bg-neutral', 'text-on-neutral']),
  },
  {
    intent: 'surface',
    design: 'filled',
    class: tw(['bg-surface', 'text-on-surface']),
  },
] as const
