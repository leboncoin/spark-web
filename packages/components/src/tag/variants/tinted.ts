import { tw } from '@spark-ui/internal-utils'

export const tintedVariants = [
  {
    intent: 'main',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-main-container',
      'bg-main-container',
      'text-on-main-container',
    ]),
  },
  {
    intent: 'support',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-support-container',
      'bg-support-container',
      'text-on-support-container',
    ]),
  },
  {
    intent: 'accent',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-accent-container',
      'bg-accent-container',
      'text-on-accent-container',
    ]),
  },
  {
    intent: 'basic',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-basic-container',
      'bg-basic-container',
      'text-on-basic-container',
    ]),
  },
  {
    intent: 'success',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-success-container',
      'bg-success-container',
      'text-on-success-container',
    ]),
  },
  {
    intent: 'alert',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-alert-container',
      'bg-alert-container',
      'text-on-alert-container',
    ]),
  },
  {
    intent: 'danger',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-error-container',
      'bg-error-container',
      'text-on-error-container',
    ]),
  },
  {
    intent: 'info',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-info-container',
      'bg-info-container',
      'text-on-info-container',
    ]),
  },
  {
    intent: 'neutral',
    design: 'tinted',
    class: tw([
      'data-[with-gradient=true]:u-tinted-gradient-neutral-container',
      'bg-neutral-container',
      'text-on-neutral-container',
    ]),
  },
] as const
