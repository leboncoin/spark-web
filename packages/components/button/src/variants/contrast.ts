import { tw } from '@spark-ui/internal-utils'

export const contrastVariants = [
  {
    intent: 'primary',
    design: 'contrast',
    class: tw([
      'text-primary',
      'enabled:hover:bg-primary-container-hovered',
      'enabled:active:bg-primary-container-pressed',
      'focus-visible:bg-primary-container-focused',
    ]),
  },
  {
    intent: 'secondary',
    design: 'contrast',
    class: tw([
      'text-secondary',
      'enabled:hover:bg-secondary-container-hovered',
      'enabled:active:bg-secondary-container-pressed',
      'focus-visible:bg-secondary-container-focused',
    ]),
  },
  {
    intent: 'success',
    design: 'contrast',
    class: tw([
      'text-success',
      'enabled:hover:bg-success-container-hovered',
      'enabled:active:bg-success-container-pressed',
      'focus-visible:bg-success-container-focused',
    ]),
  },
  {
    intent: 'alert',
    design: 'contrast',
    class: tw([
      'text-alert',
      'enabled:hover:bg-alert-container-hovered',
      'enabled:active:bg-alert-container-pressed',
      'focus-visible:bg-alert-container-focused',
    ]),
  },
  {
    intent: 'danger',
    design: 'contrast',
    class: tw([
      'text-error',
      'enabled:hover:bg-error-container-hovered',
      'enabled:active:bg-error-container-pressed',
      'focus-visible:bg-error-container-focused',
    ]),
  },
  {
    intent: 'info',
    design: 'contrast',
    class: tw([
      'text-info',
      'enabled:hover:bg-info-container-hovered',
      'enabled:active:bg-info-container-pressed',
      'focus-visible:bg-info-container-focused',
    ]),
  },
  {
    intent: 'neutral',
    design: 'contrast',
    class: tw([
      'text-neutral',
      'enabled:hover:bg-neutral-container-hovered',
      'enabled:active:bg-neutral-container-pressed',
      'focus-visible:bg-neutral-container-focused',
    ]),
  },
  {
    intent: 'surface',
    design: 'contrast',
    class: tw([
      'text-on-surface',
      'enabled:hover:bg-surface-hovered',
      'enabled:active:bg-surface-pressed',
      'focus-visible:bg-surface-focused',
    ]),
  },
] as const
