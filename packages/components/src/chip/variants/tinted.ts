import { tw } from '@spark-ui/internal-utils'

export const tintedVariants = [
  /** Intents **/
  {
    intent: 'main',
    design: 'tinted',
    class: tw([
      'bg-main-container',
      'enabled:hover:bg-main-container-hovered',
      'enabled:active:bg-main-container-hovered',
      'focus-visible:bg-main-container-hovered',
      'aria-pressed:bg-main aria-pressed:text-on-main aria-pressed:enabled:hover:bg-main/dim-1',
      'text-on-main-container',
    ]),
  },
  {
    intent: 'support',
    design: 'tinted',
    class: tw([
      'bg-support-container',
      'enabled:hover:bg-support-container-hovered',
      'enabled:active:bg-support-container-hovered',
      'focus-visible:bg-support-container-hovered',
      'aria-pressed:bg-support aria-pressed:text-on-support aria-pressed:enabled:hover:bg-support/dim-1',
      'text-on-support-container',
    ]),
  },
  {
    intent: 'basic',
    design: 'tinted',
    class: tw([
      'bg-basic-container',
      'enabled:hover:bg-basic-container-hovered',
      'enabled:active:bg-basic-container-hovered',
      'focus-visible:bg-basic-container-hovered',
      'aria-pressed:bg-basic aria-pressed:text-on-basic aria-pressed:enabled:hover:bg-basic/dim-1',
      'text-on-basic-container',
    ]),
  },
  {
    intent: 'accent',
    design: 'tinted',
    class: tw([
      'bg-accent-container',
      'enabled:hover:bg-accent-container-hovered',
      'enabled:active:bg-accent-container-hovered',
      'focus-visible:bg-accent-container-hovered',
      'aria-pressed:bg-accent aria-pressed:text-on-accent aria-pressed:enabled:hover:bg-accent/dim-1',
      'text-on-accent-container',
    ]),
  },
  {
    intent: 'success',
    design: 'tinted',
    class: tw([
      'bg-success-container',
      'enabled:hover:bg-success-container-hovered',
      'enabled:active:bg-success-container-hovered',
      'focus-visible:bg-success-container-hovered',
      'aria-pressed:bg-success aria-pressed:text-on-success aria-pressed:enabled:hover:bg-success/dim-1',
      'text-on-success-container',
    ]),
  },
  {
    intent: 'alert',
    design: 'tinted',
    class: tw([
      'bg-alert-container',
      'enabled:hover:bg-alert-container-hovered',
      'enabled:active:bg-alert-container-hovered',
      'focus-visible:bg-alert-container-hovered',
      'aria-pressed:bg-alert aria-pressed:text-on-alert aria-pressed:enabled:hover:bg-alert/dim-1',
      'text-on-alert-container',
    ]),
  },
  {
    intent: 'danger',
    design: 'tinted',
    class: tw([
      'bg-error-container',
      'enabled:hover:bg-error-container-hovered',
      'enabled:active:bg-error-container-hovered',
      'focus-visible:bg-error-container-hovered',
      'aria-pressed:bg-error aria-pressed:text-on-error aria-pressed:enabled:hover:bg-error/dim-1',
      'text-on-error-container',
    ]),
  },
  {
    intent: 'info',
    design: 'tinted',
    class: tw([
      'bg-info-container',
      'enabled:hover:bg-info-container-hovered',
      'enabled:active:bg-info-container-hovered',
      'focus-visible:bg-info-container-hovered',
      'aria-pressed:bg-info aria-pressed:text-on-info aria-pressed:enabled:hover:bg-info/dim-1',
      'text-on-info-container',
    ]),
  },
  {
    intent: 'neutral',
    design: 'tinted',
    class: tw([
      'bg-neutral-container',
      'enabled:hover:bg-neutral-container-hovered',
      'enabled:active:bg-neutral-container-hovered',
      'focus-visible:bg-neutral-container-hovered',
      'aria-pressed:bg-neutral aria-pressed:text-on-neutral aria-pressed:enabled:hover:bg-neutral/dim-1',
      'text-on-neutral-container',
    ]),
  },
  {
    intent: 'surface',
    design: 'tinted',
    class: tw([
      'bg-surface/dim-1',
      'enabled:hover:bg-surface-hovered/dim-1',
      'enabled:active:bg-surface-hovered/dim-1',
      'focus-visible:bg-surface-hovered/dim-1',
      'aria-pressed:bg-surface aria-pressed:text-on-surface aria-pressed:enabled:hover:bg-surface-hovered',
      'text-on-surface/dim-1',
    ]),
  },
  /** Spacings **/
  {
    design: 'tinted',
    hasClearButton: false,
    class: tw(['px-md']),
  },
  {
    design: 'tinted',
    hasClearButton: true,
    class: tw(['pl-md']),
  },
] as const
