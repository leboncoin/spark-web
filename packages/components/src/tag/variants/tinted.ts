import { tw } from './default'

export const tintedVariants = [
  {
    intent: 'main',
    design: 'tinted',
    class: tw(['bg-main-container', 'text-on-main-container']),
  },
  {
    intent: 'support',
    design: 'tinted',
    class: tw(['bg-support-container', 'text-on-support-container']),
  },
  {
    intent: 'accent',
    design: 'tinted',
    class: tw(['bg-accent-container', 'text-on-accent-container']),
  },
  {
    intent: 'basic',
    design: 'tinted',
    class: tw(['bg-basic-container', 'text-on-basic-container']),
  },
  {
    intent: 'success',
    design: 'tinted',
    class: tw(['bg-success-container', 'text-on-success-container']),
  },
  {
    intent: 'alert',
    design: 'tinted',
    class: tw(['bg-alert-container', 'text-on-alert-container']),
  },
  {
    intent: 'danger',
    design: 'tinted',
    class: tw(['bg-error-container', 'text-on-error-container']),
  },
  {
    intent: 'info',
    design: 'tinted',
    class: tw(['bg-info-container', 'text-on-info-container']),
  },
  {
    intent: 'neutral',
    design: 'tinted',
    class: tw(['bg-neutral-container', 'text-on-neutral-container']),
  },
] as const
