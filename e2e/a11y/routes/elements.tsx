import { type ComponentType } from 'react'

import { A11yAccordion } from '../pages/Accordion'
import { A11yAlertDialog } from '../pages/AlertDialog'
import { A11yAvatar } from '../pages/Avatar'
import { A11yBadge } from '../pages/Badge'
import { A11yBreadcrumb } from '../pages/Breadcrumb'
import { A11yButton } from '../pages/Button'
import { A11yCard } from '../pages/Card'
import { A11yCheckbox } from '../pages/Checkbox'
import { A11yChip } from '../pages/Chip'
import { A11yCircularMeter } from '../pages/CircularMeter'
import { A11yCollapsible } from '../pages/Collapsible'
import { A11yCombobox } from '../pages/Combobox'
import { A11yDialog } from '../pages/Dialog'
import { A11yDivider } from '../pages/Divider'
import { A11yDrawer } from '../pages/Drawer'
import { A11yDropdown } from '../pages/Dropdown'
import { A11yFileUpload } from '../pages/FileUpload'
import { A11yFormField } from '../pages/FormField'
import { A11yIcon } from '../pages/Icon'
import { A11yIconButton } from '../pages/IconButton'
import { A11yInput } from '../pages/Input'
import { A11yInputOTP } from '../pages/InputOTP'
import { A11yKbd } from '../pages/Kbd'
import { A11yLabel } from '../pages/Label'
import { A11yLinkBox } from '../pages/LinkBox'
import { A11yMeter } from '../pages/Meter'
import { A11yPagination } from '../pages/Pagination'
import { A11yPopover } from '../pages/Popover'
import { A11yProgress } from '../pages/Progress'
import { A11yProgressTracker } from '../pages/ProgressTracker'
import { A11yRadioGroup } from '../pages/RadioGroup'
import { A11yRating } from '../pages/Rating'
import { A11yRatingDisplay } from '../pages/RatingDisplay'
import { A11ySelect } from '../pages/Select'
import { A11ySkeleton } from '../pages/Skeleton'
import { A11ySlider } from '../pages/Slider'
import { A11ySnackbar } from '../pages/Snackbar'
import { A11ySpinner } from '../pages/Spinner'
import { A11yStepper } from '../pages/Stepper'
import { A11ySwitch } from '../pages/Switch'
import { A11yTabs } from '../pages/Tabs'
import { A11yTag } from '../pages/Tag'
import { A11yTextarea } from '../pages/Textarea'
import { A11yTextLink } from '../pages/TextLink'
import { A11yToast } from '../pages/Toast'
import { A11yVisuallyHidden } from '../pages/VisuallyHidden'
import { type A11yComponentsKey } from './components'

/**
 * Due to Playwright specifities, imports are limited to .js/.ts files. This file is useful
 * to build the `a11yRoutes` constant, and should NOT be imported within test files.
 * See https://github.com/microsoft/playwright/issues/18150#issuecomment-1282887786
 */

export const a11yElements: Record<A11yComponentsKey, ComponentType> = {
  accordion: A11yAccordion,
  'alert-dialog': A11yAlertDialog,
  avatar: A11yAvatar,
  badge: A11yBadge,
  breadcrumb: A11yBreadcrumb,
  button: A11yButton,
  card: A11yCard,
  checkbox: A11yCheckbox,
  chip: A11yChip,
  'circular-meter': A11yCircularMeter,
  collapsible: A11yCollapsible,
  combobox: A11yCombobox,
  dialog: A11yDialog,
  divider: A11yDivider,
  drawer: A11yDrawer,
  dropdown: A11yDropdown,
  'file-upload': A11yFileUpload,
  'form-field': A11yFormField,
  icon: A11yIcon,
  'icon-button': A11yIconButton,
  input: A11yInput,
  'input-otp': A11yInputOTP,
  kbd: A11yKbd,
  label: A11yLabel,
  'link-box': A11yLinkBox,
  meter: A11yMeter,
  pagination: A11yPagination,
  popover: A11yPopover,
  progress: A11yProgress,
  'progress-tracker': A11yProgressTracker,
  'radio-group': A11yRadioGroup,
  rating: A11yRating,
  'rating-display': A11yRatingDisplay,
  select: A11ySelect,
  skeleton: A11ySkeleton,
  slider: A11ySlider,
  snackbar: A11ySnackbar,
  spinner: A11ySpinner,
  stepper: A11yStepper,
  switch: A11ySwitch,
  tabs: A11yTabs,
  tag: A11yTag,
  textarea: A11yTextarea,
  'text-link': A11yTextLink,
  toast: A11yToast,
  'visually-hidden': A11yVisuallyHidden,
}
