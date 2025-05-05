import { tw } from '@spark-ui/internal-utils'

export const ghostVariants = [
  {
    intent: 'main',
    design: 'ghost',
    class: tw([
      'text-main',
      'hover:bg-main/dim-5',
      'enabled:active:bg-main/dim-5',
      'focus-visible:bg-main/dim-5',
    ]),
  },
  {
    intent: 'support',
    design: 'ghost',
    class: tw([
      'text-support',
      'hover:bg-support/dim-5',
      'enabled:active:bg-support/dim-5',
      'focus-visible:bg-support/dim-5',
    ]),
  },
  {
    intent: 'accent',
    design: 'ghost',
    class: tw([
      'text-accent',
      'hover:bg-accent/dim-5',
      'enabled:active:bg-accent/dim-5',
      'focus-visible:bg-accent/dim-5',
    ]),
  },
  {
    intent: 'basic',
    design: 'ghost',
    class: tw([
      'text-basic',
      'hover:bg-basic/dim-5',
      'enabled:active:bg-basic/dim-5',
      'focus-visible:bg-basic/dim-5',
    ]),
  },
  {
    intent: 'success',
    design: 'ghost',
    class: tw([
      'text-success',
      'hover:bg-success/dim-5',
      'enabled:active:bg-success/dim-5',
      'focus-visible:bg-success/dim-5',
    ]),
  },
  {
    intent: 'alert',
    design: 'ghost',
    class: tw([
      'text-alert',
      'hover:bg-alert/dim-5',
      'enabled:active:bg-alert/dim-5',
      'focus-visible:bg-alert/dim-5',
    ]),
  },
  {
    intent: 'danger',
    design: 'ghost',
    class: tw([
      'text-error',
      'hover:bg-error/dim-5',
      'enabled:active:bg-error/dim-5',
      'focus-visible:bg-error/dim-5',
    ]),
  },
  {
    intent: 'info',
    design: 'ghost',
    class: tw([
      'text-info',
      'hover:bg-info/dim-5',
      'enabled:active:bg-info/dim-5',
      'focus-visible:bg-info/dim-5',
    ]),
  },
  {
    intent: 'neutral',
    design: 'ghost',
    class: tw([
      'text-neutral',
      'hover:bg-neutral/dim-5',
      'enabled:active:bg-neutral/dim-5',
      'focus-visible:bg-neutral/dim-5',
    ]),
  },
  {
    intent: 'surface',
    design: 'ghost',
    class: tw([
      'text-surface',
      'hover:bg-surface/dim-5',
      'enabled:active:bg-surface/dim-5',
      'focus-visible:bg-surface/dim-5',
    ]),
  },
] as const
