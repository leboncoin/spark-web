export const tintedVariants = [
  {
    design: 'tinted',
    intent: 'basic',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-basic-container bg-basic-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-basic-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-basic-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'basic',
    state: 'active',
    class: 'text-on-basic bg-basic',
  },
  {
    design: 'tinted',
    intent: 'support',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-support-container bg-support-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-support-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-support-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'support',
    state: 'active',
    class: 'text-on-support bg-support',
  },
  {
    design: 'tinted',
    intent: 'main',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-main-container bg-main-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-main-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-main-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'main',
    state: 'active',
    class: 'text-on-main bg-main',
  },
  {
    design: 'tinted',
    intent: 'neutral',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-neutral-container bg-neutral-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-neutral-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-neutral-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'neutral',
    state: 'active',
    class: 'text-on-neutral bg-neutral',
  },
  {
    design: 'tinted',
    intent: 'info',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-info-container bg-info-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-info-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-info-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'info',
    state: 'active',
    class: 'text-on-info bg-info',
  },
  {
    design: 'tinted',
    intent: 'accent',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-accent-container bg-accent-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-accent-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-accent-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'accent',
    state: 'active',
    class: 'text-on-accent bg-accent',
  },
  {
    design: 'tinted',
    intent: 'danger',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-error-container bg-error-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-error-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-error-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'danger',
    state: 'active',
    class: 'text-on-error bg-error',
  },
  {
    design: 'tinted',
    intent: 'alert',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-alert-container bg-alert-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-alert-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-alert-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'alert',
    state: 'active',
    class: 'text-on-alert bg-alert',
  },
  {
    design: 'tinted',
    intent: 'success',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-success-container bg-success-container',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-success-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-success-container',
    ],
  },
  {
    design: 'tinted',
    intent: 'success',
    state: 'active',
    class: 'text-on-success bg-success',
  },
] as const
