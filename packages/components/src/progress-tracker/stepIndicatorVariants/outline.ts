export const outlineVariants = [
  {
    design: 'outline',
    intent: 'basic',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-basic-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-basic-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'basic',
    state: 'active',
    class: 'text-on-basic-container bg-basic-container',
  },
  {
    design: 'outline',
    intent: 'support',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-support-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-support-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'support',
    state: 'active',
    class: 'text-on-support-container bg-support-container',
  },
  {
    design: 'outline',
    intent: 'main',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-main-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-main-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'main',
    state: 'active',
    class: 'text-on-main-container bg-main-container',
  },
  {
    design: 'outline',
    intent: 'neutral',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-neutral-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-neutral-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'neutral',
    state: 'active',
    class: 'text-on-neutral-container bg-neutral-container',
  },
  {
    design: 'outline',
    intent: 'info',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-info-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-info-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'info',
    state: 'active',
    class: 'text-on-info-container bg-info-container',
  },
  {
    design: 'outline',
    intent: 'accent',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-accent-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-accent-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'accent',
    state: 'active',
    class: 'text-on-accent-container bg-accent-container',
  },
  {
    design: 'outline',
    intent: 'danger',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-error-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-error-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'danger',
    state: 'active',
    class: 'text-on-error-container bg-error-container',
  },
  {
    design: 'outline',
    intent: 'alert',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-alert-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-alert-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'alert',
    state: 'active',
    class: 'text-on-alert-container bg-alert-container',
  },
  {
    design: 'outline',
    intent: 'success',
    state: ['complete', 'incomplete'],
    class: [
      'text-on-success-container bg-transparent',
      'group-hover/btn:group-data-[interactive=true]/btn:bg-success-container-hovered',
      'group-hover/btn:group-data-[interactive=false]/btn:bg-transparent',
    ],
  },
  {
    design: 'outline',
    intent: 'success',
    state: 'active',
    class: 'text-on-success-container bg-success-container',
  },
] as const
