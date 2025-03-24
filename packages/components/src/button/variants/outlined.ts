import { tw } from '@spark-ui/internal-utils'

export const outlinedVariants = [
  {
    intent: 'main',
    design: 'outlined',
    class: tw([
      'hover:bg-main/dim-5',
      'enabled:active:bg-main/dim-5',
      'focus-visible:bg-main/dim-5',
      'text-main',
    ]),
  },
  {
    intent: 'support',
    design: 'outlined',
    class: tw([
      'hover:bg-support/dim-5',
      'enabled:active:bg-support/dim-5',
      'focus-visible:bg-support/dim-5',
      'text-support',
    ]),
  },
  {
    intent: 'accent',
    design: 'outlined',
    class: tw([
      'hover:bg-accent/dim-5',
      'enabled:active:bg-accent/dim-5',
      'focus-visible:bg-accent/dim-5',
      'text-accent',
    ]),
  },
  {
    intent: 'basic',
    design: 'outlined',
    class: tw([
      'hover:bg-basic/dim-5',
      'enabled:active:bg-basic/dim-5',
      'focus-visible:bg-basic/dim-5',
      'text-basic',
    ]),
  },
  {
    intent: 'success',
    design: 'outlined',
    class: tw([
      'hover:bg-success/dim-5',
      'enabled:active:bg-success/dim-5',
      'focus-visible:bg-success/dim-5',
      'text-success',
    ]),
  },
  {
    intent: 'alert',
    design: 'outlined',
    class: tw([
      'hover:bg-alert/dim-5',
      'enabled:active:bg-alert/dim-5',
      'focus-visible:bg-alert/dim-5',
      'text-alert',
    ]),
  },
  {
    intent: 'danger',
    design: 'outlined',
    class: tw([
      'hover:bg-error/dim-5',
      'enabled:active:bg-error/dim-5',
      'focus-visible:bg-error/dim-5',
      'text-error',
    ]),
  },
  {
    intent: 'info',
    design: 'outlined',
    class: tw([
      'hover:bg-info/dim-5',
      'enabled:active:bg-info/dim-5',
      'focus-visible:bg-info/dim-5',
      'text-info',
    ]),
  },
  {
    intent: 'neutral',
    design: 'outlined',
    class: tw([
      'hover:bg-neutral/dim-5',
      'enabled:active:bg-neutral/dim-5',
      'focus-visible:bg-neutral/dim-5',
      'text-neutral',
    ]),
  },
  {
    intent: 'surface',
    design: 'outlined',
    class: tw([
      'hover:bg-surface/dim-5',
      'enabled:active:bg-surface/dim-5',
      'focus-visible:bg-surface/dim-5',
      'text-surface',
    ]),
  },
] as const
