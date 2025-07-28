/**
 * Due to Playwright specifities, imports are limited to .js/.ts files. This file is useful
 * to build the `a11yRoutes` constant, but also to be imported within test files.
 * See https://github.com/microsoft/playwright/issues/18150#issuecomment-1282887786
 */

export const a11yComponents = {
  accordion: 'accordion',
  'alert-dialog': 'alert-dialog',
  avatar: 'avatar',
  badge: 'badge',
  breadcrumb: 'breadcrumb',
  button: 'button',
  card: 'card',
  checkbox: 'checkbox',
  chip: 'chip',
  collapsible: 'collapsible',
  combobox: 'combobox',
  dialog: 'dialog',
  divider: 'divider',
  drawer: 'drawer',
  dropdown: 'dropdown',
  'form-field': 'form-field',
  icon: 'icon',
  'icon-button': 'icon-button',
  input: 'input',
  kbd: 'kbd',
  label: 'label',
  'link-box': 'link-box',
  pagination: 'pagination',
  popover: 'popover',
  progress: 'progress',
  'progress-tracker': 'progress-tracker',
  'radio-group': 'radio-group',
  rating: 'rating',
  select: 'select',
  skeleton: 'skeleton',
  slider: 'slider',
  snackbar: 'snackbar',
  spinner: 'spinner',
  stepper: 'stepper',
  switch: 'switch',
  tabs: 'tabs',
  tag: 'tag',
  textarea: 'textarea',
  'text-link': 'text-link',
  'visually-hidden': 'visually-hidden',
}

export type A11yComponentsKey = keyof typeof a11yComponents
