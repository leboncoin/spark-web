import { tw } from '@spark-ui/internal-utils'

export const contrastVariants = [
  {
    intent: 'main',
    design: 'contrast',
    class: tw([
      'text-main',
      'hover:bg-main-container-hovered',
      'enabled:active:bg-main-container-hovered',
      'focus-visible:bg-main-container-hovered',
    ]),
  },
  {
    intent: 'support',
    design: 'contrast',
    class: tw([
      'text-support',
      'hover:bg-support-container-hovered',
      'enabled:active:bg-support-container-hovered',
      'focus-visible:bg-support-container-hovered',
    ]),
  },
  {
    intent: 'accent',
    design: 'contrast',
    class: tw([
      'text-accent',
      'hover:bg-accent-container-hovered',
      'enabled:active:bg-accent-container-hovered',
      'focus-visible:bg-accent-container-hovered',
    ]),
  },
  {
    intent: 'basic',
    design: 'contrast',
    class: tw([
      'text-basic',
      'hover:bg-basic-container-hovered',
      'enabled:active:bg-basic-container-hovered',
      'focus-visible:bg-basic-container-hovered',
    ]),
  },
  {
    intent: 'success',
    design: 'contrast',
    class: tw([
      'text-success',
      'hover:bg-success-container-hovered',
      'enabled:active:bg-success-container-hovered',
      'focus-visible:bg-success-container-hovered',
    ]),
  },
  {
    intent: 'alert',
    design: 'contrast',
    class: tw([
      'text-alert',
      'hover:bg-alert-container-hovered',
      'enabled:active:bg-alert-container-hovered',
      'focus-visible:bg-alert-container-hovered',
    ]),
  },
  {
    intent: 'danger',
    design: 'contrast',
    class: tw([
      'text-error',
      'hover:bg-error-container-hovered',
      'enabled:active:bg-error-container-hovered',
      'focus-visible:bg-error-container-hovered',
    ]),
  },
  {
    intent: 'info',
    design: 'contrast',
    class: tw([
      'text-info',
      'hover:bg-info-container-hovered',
      'enabled:active:bg-info-container-hovered',
      'focus-visible:bg-info-container-hovered',
    ]),
  },
  {
    intent: 'neutral',
    design: 'contrast',
    class: tw([
      'text-neutral',
      'hover:bg-neutral-container-hovered',
      'enabled:active:bg-neutral-container-hovered',
      'focus-visible:bg-neutral-container-hovered',
    ]),
  },
  {
    intent: 'surface',
    design: 'contrast',
    class: tw([
      'text-on-surface',
      'hover:bg-surface-hovered',
      'enabled:active:bg-surface-hovered',
      'focus-visible:bg-surface-hovered',
    ]),
  },
] as const
