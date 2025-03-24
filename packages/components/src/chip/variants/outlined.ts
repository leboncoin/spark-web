import { tw } from '@spark-ui/internal-utils'

export const outlinedVariants = [
  /** Intents **/
  {
    design: 'outlined',
    intent: 'main',
    class: tw([
      'enabled:hover:bg-main/dim-5',
      'enabled:active:bg-main/dim-5',
      'focus-visible:bg-main/dim-5',
      'aria-pressed:bg-main-container aria-pressed:text-on-main-container aria-pressed:enabled:hover:bg-main-container/dim-1',
      'text-main',
    ]),
  },
  {
    design: 'outlined',
    intent: 'support',
    class: tw([
      'enabled:hover:bg-support/dim-5',
      'enabled:active:bg-support/dim-5',
      'focus-visible:bg-support/dim-5',
      'aria-pressed:bg-support-container aria-pressed:text-on-support-container aria-pressed:enabled:hover:bg-support-container/dim-1',
      'text-support',
    ]),
  },
  {
    design: 'outlined',
    intent: 'basic',
    class: tw([
      'enabled:hover:bg-basic/dim-5',
      'enabled:active:bg-basic/dim-5',
      'focus-visible:bg-basic/dim-5',
      'aria-pressed:bg-basic-container aria-pressed:text-on-basic-container aria-pressed:enabled:hover:bg-basic-container/dim-1',
      'text-basic',
    ]),
  },
  {
    intent: 'accent',
    design: 'outlined',
    class: tw([
      'enabled:hover:bg-accent/dim-5',
      'enabled:active:bg-accent/dim-5',
      'focus-visible:bg-accent/dim-5',
      'aria-pressed:bg-accent-container',
      'aria-pressed:bg-accent-container aria-pressed:text-on-accent-container aria-pressed:enabled:hover:bg-accent-container/dim-1',
      'text-accent',
    ]),
  },
  {
    design: 'outlined',
    intent: 'success',
    class: tw([
      'enabled:hover:bg-success/dim-5',
      'enabled:active:bg-success/dim-5',
      'focus-visible:bg-success/dim-5',
      'aria-pressed:bg-success-container aria-pressed:text-on-success-container aria-pressed:enabled:hover:bg-success-container/dim-1',
      'text-success',
    ]),
  },
  {
    intent: 'alert',
    design: 'outlined',
    class: tw([
      'enabled:hover:bg-alert/dim-5',
      'enabled:active:bg-alert/dim-5',
      'focus-visible:bg-alert/dim-5',
      'aria-pressed:bg-alert-container aria-pressed:text-on-alert-container aria-pressed:enabled:hover:bg-alert-container/dim-1',
      'text-alert',
    ]),
  },
  {
    design: 'outlined',
    intent: 'danger',
    class: tw([
      'enabled:hover:bg-error/dim-5',
      'enabled:active:bg-error/dim-5',
      'focus-visible:bg-error/dim-5',
      'aria-pressed:bg-error-container aria-pressed:text-on-error-container aria-pressed:enabled:hover:bg-error-container/dim-1',
      'text-error',
    ]),
  },
  {
    design: 'outlined',
    intent: 'info',
    class: tw([
      'enabled:hover:bg-info/dim-5',
      'enabled:active:bg-info/dim-5',
      'focus-visible:bg-info/dim-5',
      'aria-pressed:bg-info-container aria-pressed:text-on-info-container aria-pressed:enabled:hover:bg-info-container/dim-1',
      'text-info',
    ]),
  },
  {
    design: 'outlined',
    intent: 'neutral',
    class: tw([
      'enabled:hover:bg-neutral/dim-5',
      'enabled:active:bg-neutral/dim-5',
      'focus-visible:bg-neutral/dim-5',
      'aria-pressed:bg-neutral-container aria-pressed:text-on-neutral-container aria-pressed:enabled:hover:bg-neutral-container/dim-1',
      'text-neutral',
    ]),
  },
  {
    design: 'outlined',
    intent: 'surface',
    class: tw([
      'enabled:hover:bg-surface/dim-5',
      'enabled:active:bg-surface/dim-5',
      'focus-visible:bg-surface/dim-5',
      'aria-pressed:bg-surface aria-pressed:text-on-surface aria-pressed:enabled:hover:bg-surface-hovered',
      'text-surface',
    ]),
  },
  /** Spacings **/
  {
    design: 'outlined',
    hasClearButton: false,
    class: tw(['px-[calc(var(--spacing-md)-var(--border-width-sm))]']),
  },
  {
    design: 'outlined',
    hasClearButton: true,
    class: tw(['pl-[calc(var(--spacing-md)-var(--border-width-sm))]']),
  },
] as const
