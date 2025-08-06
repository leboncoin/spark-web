import { tw } from '@spark-ui/internal-utils'

export const contrastVariants = [
  {
    intent: 'main',
    design: 'contrast',
    class: tw([
      'text-on-main-contaier bg-surface',
      'hover:bg-main-container-hovered',
      'enabled:active:bg-main-container-hovered',
      'focus-visible:bg-main-container-hovered',
    ]),
  },
  {
    intent: 'support',
    design: 'contrast',
    class: tw([
      'text-on-support-container bg-surface',
      'hover:bg-support-container-hovered',
      'enabled:active:bg-support-container-hovered',
      'focus-visible:bg-support-container-hovered',
    ]),
  },
  {
    intent: 'accent',
    design: 'contrast',
    class: tw([
      'text-on-accent-container bg-surface',
      'hover:bg-accent-container-hovered',
      'enabled:active:bg-accent-container-hovered',
      'focus-visible:bg-accent-container-hovered',
    ]),
  },
  {
    intent: 'basic',
    design: 'contrast',
    class: tw([
      'text-on-basic-container bg-surface',
      'hover:bg-basic-container-hovered',
      'enabled:active:bg-basic-container-hovered',
      'focus-visible:bg-basic-container-hovered',
    ]),
  },
  {
    intent: 'success',
    design: 'contrast',
    class: tw([
      'text-on-success-container bg-surface',
      'hover:bg-success-container-hovered',
      'enabled:active:bg-success-container-hovered',
      'focus-visible:bg-success-container-hovered',
    ]),
  },
  {
    intent: 'alert',
    design: 'contrast',
    class: tw([
      'text-on-alert-container bg-surface',
      'hover:bg-alert-container-hovered',
      'enabled:active:bg-alert-container-hovered',
      'focus-visible:bg-alert-container-hovered',
    ]),
  },
  {
    intent: 'danger',
    design: 'contrast',
    class: tw([
      'text-on-error-container bg-surface',
      'hover:bg-error-container-hovered',
      'enabled:active:bg-error-container-hovered',
      'focus-visible:bg-error-container-hovered',
    ]),
  },
  {
    intent: 'info',
    design: 'contrast',
    class: tw([
      'text-on-info-container bg-surface',
      'hover:bg-info-container-hovered',
      'enabled:active:bg-info-container-hovered',
      'focus-visible:bg-info-container-hovered',
    ]),
  },
  {
    intent: 'neutral',
    design: 'contrast',
    class: tw([
      'text-on-neutral-container bg-surface',
      'hover:bg-neutral-container-hovered',
      'enabled:active:bg-neutral-container-hovered',
      'focus-visible:bg-neutral-container-hovered',
    ]),
  },
  {
    intent: 'surface',
    design: 'contrast',
    class: tw([
      'text-on-surface bg-surface',
      'hover:bg-surface-hovered',
      'enabled:active:bg-surface-hovered',
      'focus-visible:bg-surface-hovered',
    ]),
  },
  {
    intent: 'surfaceInverse',
    design: 'contrast',
    class: tw([
      'text-on-surface-inverse bg-surface-inverse',
      'hover:bg-surface-inverse-hovered',
      'enabled:active:bg-surface-inverse-hovered',
      'focus-visible:bg-surface-inverse-hovered',
    ]),
  },
] as const
