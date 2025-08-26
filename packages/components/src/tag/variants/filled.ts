import { tw } from '@spark-ui/internal-utils'

export const filledVariants = [
  {
    intent: 'main',
    design: 'filled',
    class: tw(['data-[with-gradient=true]:u-filled-gradient-main', 'bg-main', 'text-on-main']),
  },
  {
    intent: 'support',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-support',
      'bg-support',
      'text-on-support',
    ]),
  },
  {
    intent: 'accent',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-accent',
      'bg-accent',
      'text-on-accent',
    ]),
  },
  {
    intent: 'basic',
    design: 'filled',
    class: tw(['data-[with-gradient=true]:u-filled-gradient-basic', 'bg-basic', 'text-on-basic']),
  },
  {
    intent: 'success',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-success',
      'bg-success',
      'text-on-success',
    ]),
  },
  {
    intent: 'alert',
    design: 'filled',
    class: tw(['data-[with-gradient=true]:u-filled-gradient-alert', 'bg-alert', 'text-on-alert']),
  },
  {
    intent: 'danger',
    design: 'filled',
    class: tw(['data-[with-gradient=true]:u-filled-gradient-error', 'bg-error', 'text-on-error']),
  },
  {
    intent: 'info',
    design: 'filled',
    class: tw(['data-[with-gradient=true]:u-filled-gradient-info', 'bg-info', 'text-on-info']),
  },
  {
    intent: 'neutral',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-neutral',
      'bg-neutral',
      'text-on-neutral',
    ]),
  },
  {
    intent: 'surface',
    design: 'filled',
    class: tw([
      'data-[with-gradient=true]:u-filled-gradient-surface',
      'bg-surface',
      'text-on-surface',
    ]),
  },
] as const
