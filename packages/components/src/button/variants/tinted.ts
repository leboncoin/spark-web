import { tw } from '@spark-ui/internal-utils'

export const tintedVariants = [
  {
    intent: 'main',
    design: 'tinted',
    class: tw([
      'bg-main-container',
      'text-on-main-container',
      'hover:bg-main-container-hovered',
      'enabled:active:bg-main-container-hovered',
      'focus-visible:bg-main-container-hovered',
    ]),
  },
  {
    intent: 'support',
    design: 'tinted',
    class: tw([
      'bg-support-container',
      'text-on-support-container',
      'hover:bg-support-container-hovered',
      'enabled:active:bg-support-container-hovered',
      'focus-visible:bg-support-container-hovered',
    ]),
  },
  {
    intent: 'accent',
    design: 'tinted',
    class: tw([
      'bg-accent-container',
      'text-on-accent-container',
      'hover:bg-accent-container-hovered',
      'enabled:active:bg-accent-container-hovered',
      'focus-visible:bg-accent-container-hovered',
    ]),
  },
  {
    intent: 'basic',
    design: 'tinted',
    class: tw([
      'bg-basic-container',
      'text-on-basic-container',
      'hover:bg-basic-container-hovered',
      'enabled:active:bg-basic-container-hovered',
      'focus-visible:bg-basic-container-hovered',
    ]),
  },
  {
    intent: 'success',
    design: 'tinted',
    class: tw([
      'bg-success-container',
      'text-on-success-container',
      'hover:bg-success-container-hovered',
      'enabled:active:bg-success-container-hovered',
      'focus-visible:bg-success-container-hovered',
    ]),
  },
  {
    intent: 'alert',
    design: 'tinted',
    class: tw([
      'bg-alert-container',
      'text-on-alert-container',
      'hover:bg-alert-container-hovered',
      'enabled:active:bg-alert-container-hovered',
      'focus-visible:bg-alert-container-hovered',
    ]),
  },
  {
    intent: 'danger',
    design: 'tinted',
    class: tw([
      'bg-error-container',
      'text-on-error-container',
      'hover:bg-error-container-hovered',
      'enabled:active:bg-error-container-hovered',
      'focus-visible:bg-error-container-hovered',
    ]),
  },
  {
    intent: 'info',
    design: 'tinted',
    class: tw([
      'bg-info-container',
      'text-on-info-container',
      'hover:bg-info-container-hovered',
      'enabled:active:bg-info-container-hovered',
      'focus-visible:bg-info-container-hovered',
    ]),
  },
  {
    intent: 'neutral',
    design: 'tinted',
    class: tw([
      'bg-neutral-container',
      'text-on-neutral-container',
      'hover:bg-neutral-container-hovered',
      'enabled:active:bg-neutral-container-hovered',
      'focus-visible:bg-neutral-container-hovered',
    ]),
  },
  {
    intent: 'surface',
    design: 'tinted',
    class: tw([
      'bg-surface',
      'text-on-surface',
      'hover:bg-surface-hovered',
      'enabled:active:bg-surface-hovered',
      'focus-visible:bg-surface-hovered',
    ]),
  },
] as const
