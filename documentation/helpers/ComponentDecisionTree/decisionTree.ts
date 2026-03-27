// oxlint-disable max-lines
import { type DecisionTreeNode } from '.'

/**
 * Strict binary decision tree — every intermediate node has exactly 2 children.
 * Each node has:
 *   label    → short text shown on the card button and in the graph node
 *   question → full yes/no question shown as the heading when you're AT that node
 *
 * Terminal nodes have label = component name and a `component` reference.
 */
export const decisionTree: DecisionTreeNode = {
  id: 'root',
  label: 'Start',
  question: 'Does it primarily serve as a control for user input, actions, or navigation?',
  children: [
    // ── Left branch: interactive ─────────────────────────────────────────────
    {
      id: 'interactive',
      label: 'A control (input, action, or navigation)',
      question: 'Does it collect or modify data?',
      children: [
        // YES → data entry
        {
          id: 'data-entry',
          label: 'Collects / modifies data',
          question: 'Is it a text input field?',
          children: [
            // YES → text
            {
              id: 'text-field',
              label: 'A text input field',
              question: 'Can it hold multiple lines?',
              children: [
                { id: 'c-Textarea', label: 'Textarea', component: 'Textarea' },
                {
                  id: 'single-line',
                  label: 'Single-line only',
                  question: 'Is it for a one-time password / code?',
                  children: [
                    { id: 'c-InputOTP', label: 'InputOTP', component: 'InputOTP' },
                    { id: 'c-Input', label: 'Input', component: 'Input' },
                  ],
                },
              ],
            },
            // NO → not text
            {
              id: 'not-text-field',
              label: 'Not a text field',
              question: 'Is it a binary on/off toggle?',
              children: [
                { id: 'c-Switch', label: 'Switch', component: 'Switch' },
                {
                  id: 'not-toggle',
                  label: 'Not a toggle',
                  question: 'Is it a selection control (choose from options)?',
                  children: [
                    // YES → selection
                    {
                      id: 'selection',
                      label: 'A selection control',
                      question: 'Can the user select multiple items?',
                      children: [
                        // YES → multi
                        {
                          id: 'multi-select',
                          label: 'Multiple items selectable',
                          question: 'Are choices shown as dismissible chips / pills?',
                          children: [
                            { id: 'c-Chip', label: 'Chip', component: 'Chip' },
                            { id: 'c-Checkbox', label: 'Checkbox', component: 'Checkbox' },
                          ],
                        },
                        // NO → single
                        {
                          id: 'single-select',
                          label: 'Single item only',
                          question: 'Are options always visible (not in a dropdown)?',
                          children: [
                            { id: 'c-RadioGroup', label: 'RadioGroup', component: 'RadioGroup' },
                            {
                              id: 'dropdown-select',
                              label: 'In a dropdown',
                              question: 'Is it searchable / filterable?',
                              children: [
                                { id: 'c-Combobox', label: 'Combobox', component: 'Combobox' },
                                { id: 'c-Select', label: 'Select', component: 'Select' },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    // NO → numeric / file
                    {
                      id: 'numeric-or-file',
                      label: 'Numeric or file control',
                      question: 'Is it a continuous range (slider)?',
                      children: [
                        { id: 'c-Slider', label: 'Slider', component: 'Slider' },
                        {
                          id: 'not-slider',
                          label: 'Not a slider',
                          question: 'Does it increment / decrement a value step by step?',
                          children: [
                            { id: 'c-Stepper', label: 'Stepper', component: 'Stepper' },
                            {
                              id: 'file-or-rating',
                              label: 'Not a stepper',
                              question: 'Is it for uploading files?',
                              children: [
                                {
                                  id: 'c-FileUpload',
                                  label: 'FileUpload',
                                  component: 'FileUpload',
                                },
                                { id: 'c-Rating', label: 'Rating', component: 'Rating' },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // NO → action or navigation
        {
          id: 'action-or-nav',
          label: 'Action or navigation',
          question: 'Does it trigger an action (a button)?',
          children: [
            // YES → button
            {
              id: 'button',
              label: 'A button',
              question: 'Does it show only an icon (no text label)?',
              children: [
                { id: 'c-IconButton', label: 'IconButton', component: 'IconButton' },
                { id: 'c-Button', label: 'Button', component: 'Button' },
              ],
            },
            // NO → navigation or overlay
            {
              id: 'nav-or-overlay',
              label: 'Navigation or overlay',
              question: 'Does it navigate to a different page or in-page section?',
              children: [
                // YES → navigation
                {
                  id: 'navigation',
                  label: 'Navigation',
                  question: 'Is it for in-page navigation?',
                  children: [
                    // YES → in-page
                    {
                      id: 'in-page-nav',
                      label: 'In-page',
                      question: 'Does it switch between content panels (tabs)?',
                      children: [
                        {
                          id: 'tabs-vs-segmented',
                          label: 'Tabs or segmented control',
                          question: 'Is it primary navigation between distinct sections/pages?',
                          children: [
                            { id: 'c-Tabs', label: 'Tabs', component: 'Tabs' },
                            {
                              id: 'c-SegmentedControl',
                              label: 'SegmentedControl',
                              component: 'SegmentedControl',
                            },
                          ],
                        },
                        {
                          id: 'not-tabs',
                          label: 'Not tabs',
                          question: 'Does it track steps in a multi-step flow?',
                          children: [
                            {
                              id: 'c-ProgressTracker',
                              label: 'ProgressTracker',
                              component: 'ProgressTracker',
                            },
                            { id: 'c-Pagination', label: 'Pagination', component: 'Pagination' },
                          ],
                        },
                      ],
                    },
                    // NO → cross-page
                    {
                      id: 'cross-page-nav',
                      label: 'Cross-page',
                      question: 'Is it an inline text hyperlink?',
                      children: [
                        { id: 'c-TextLink', label: 'TextLink', component: 'TextLink' },
                        {
                          id: 'not-textlink',
                          label: 'Not a text link',
                          question: 'Is it a breadcrumb trail?',
                          children: [
                            { id: 'c-Breadcrumb', label: 'Breadcrumb', component: 'Breadcrumb' },
                            { id: 'c-LinkBox', label: 'LinkBox', component: 'LinkBox' },
                          ],
                        },
                      ],
                    },
                  ],
                },
                // NO → overlay
                {
                  id: 'overlay',
                  label: 'Overlay / popup',
                  question: 'Does it cover the full screen (modal)?',
                  children: [
                    // YES → modal
                    {
                      id: 'full-modal',
                      label: 'Full-screen modal',
                      question: 'Is it specifically for destructive / confirmation actions?',
                      children: [
                        { id: 'c-AlertDialog', label: 'AlertDialog', component: 'AlertDialog' },
                        {
                          id: 'general-modal',
                          label: 'General-purpose modal',
                          question: 'Does it slide in from the side?',
                          children: [
                            { id: 'c-Drawer', label: 'Drawer', component: 'Drawer' },
                            { id: 'c-Dialog', label: 'Dialog', component: 'Dialog' },
                          ],
                        },
                      ],
                    },
                    // NO → floating
                    {
                      id: 'floating',
                      label: 'Floating / anchored',
                      question: 'Does it open a contextual action menu?',
                      children: [
                        { id: 'c-Dropdown', label: 'Dropdown', component: 'Dropdown' },
                        { id: 'c-Popover', label: 'Popover', component: 'Popover' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Right branch: display / structure / utility ──────────────────────────
    {
      id: 'display',
      label: 'Display, structure, or utility component',
      question: 'Does it communicate status or progress?',
      children: [
        // YES → feedback
        {
          id: 'feedback',
          label: 'Status or feedback',
          question: 'Is it a temporary notification?',
          children: [
            { id: 'c-Toast', label: 'Toast', component: 'Toast' },
            {
              id: 'not-toast',
              label: 'Not a notification',
              question: 'Is it a small label attached to another element?',
              children: [
                { id: 'c-Badge', label: 'Badge', component: 'Badge' },
                {
                  id: 'progress-or-gauge',
                  label: 'Progress or gauge',
                  question: 'Is it showing a loading / indeterminate state?',
                  children: [
                    // YES → loading
                    {
                      id: 'loading',
                      label: 'Loading state',
                      question: 'Is it a content placeholder skeleton?',
                      children: [
                        { id: 'c-Skeleton', label: 'Skeleton', component: 'Skeleton' },
                        {
                          id: 'spinner-or-progress',
                          label: 'Not a skeleton',
                          question: 'Is it a spinning / animated indicator?',
                          children: [
                            { id: 'c-Spinner', label: 'Spinner', component: 'Spinner' },
                            { id: 'c-Progress', label: 'Progress', component: 'Progress' },
                          ],
                        },
                      ],
                    },
                    // NO → gauge
                    {
                      id: 'gauge',
                      label: 'Fixed-value gauge',
                      question: 'Is it circular?',
                      children: [
                        {
                          id: 'c-CircularMeter',
                          label: 'CircularMeter',
                          component: 'CircularMeter',
                        },
                        {
                          id: 'linear-or-segmented',
                          label: 'Linear or segmented',
                          question: 'Is it divided into discrete segments?',
                          children: [
                            {
                              id: 'c-SegmentedGauge',
                              label: 'SegmentedGauge',
                              component: 'SegmentedGauge',
                            },
                            { id: 'c-Meter', label: 'Meter', component: 'Meter' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // NO → structure / utility
        {
          id: 'structure-utility',
          label: 'Structure, layout, or utility',
          question: 'Is it structural content (layout or display)?',
          children: [
            // YES → structure
            {
              id: 'structure',
              label: 'Content structure',
              question: 'Does it show or hide content on demand?',
              children: [
                // YES → collapsible
                {
                  id: 'collapsible-content',
                  label: 'Shows / hides content',
                  question: 'Does it have multiple independent collapsible sections?',
                  children: [
                    { id: 'c-Accordion', label: 'Accordion', component: 'Accordion' },
                    { id: 'c-Collapsible', label: 'Collapsible', component: 'Collapsible' },
                  ],
                },
                // NO → always visible
                {
                  id: 'always-visible',
                  label: 'Always visible content',
                  question: 'Is it a scrollable list or gallery?',
                  children: [
                    {
                      id: 'scrollable',
                      label: 'Scrollable',
                      question: 'Is it a horizontal media gallery (slides)?',
                      children: [
                        { id: 'c-Carousel', label: 'Carousel', component: 'Carousel' },
                        {
                          id: 'c-ScrollingList',
                          label: 'ScrollingList',
                          component: 'ScrollingList',
                        },
                      ],
                    },
                    {
                      id: 'static-container',
                      label: 'Static container',
                      question: 'Is it a content card?',
                      children: [
                        { id: 'c-Card', label: 'Card', component: 'Card' },
                        {
                          id: 'form-label',
                          label: 'Form or label structure',
                          question: 'Does it wrap an input with validation and helper text?',
                          children: [
                            { id: 'c-FormField', label: 'FormField', component: 'FormField' },
                            { id: 'c-Label', label: 'Label', component: 'Label' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // NO → visual / utility
            {
              id: 'visual-utility',
              label: 'Visual element or utility',
              question: 'Is it a visual / decorative element?',
              children: [
                // YES → visual
                {
                  id: 'visual',
                  label: 'Visual / decorative',
                  question: 'Is it an icon or a user image?',
                  children: [
                    {
                      id: 'icon-or-avatar',
                      label: 'Icon or image',
                      question: 'Is it a user profile picture?',
                      children: [
                        { id: 'c-Avatar', label: 'Avatar', component: 'Avatar' },
                        { id: 'c-Icon', label: 'Icon', component: 'Icon' },
                      ],
                    },
                    {
                      id: 'text-or-separator',
                      label: 'Text or separator',
                      question: 'Is it a keyboard shortcut display?',
                      children: [
                        { id: 'c-Kbd', label: 'Kbd', component: 'Kbd' },
                        {
                          id: 'divider-or-tag',
                          label: 'Divider or tag',
                          question: 'Is it a separator line between sections?',
                          children: [
                            { id: 'c-Divider', label: 'Divider', component: 'Divider' },
                            { id: 'c-Tag', label: 'Tag', component: 'Tag' },
                          ],
                        },
                      ],
                    },
                  ],
                },
                // NO → utility
                {
                  id: 'utility',
                  label: 'Low-level utility',
                  question: 'Does it render content outside the current DOM hierarchy?',
                  children: [
                    { id: 'c-Portal', label: 'Portal', component: 'Portal' },
                    {
                      id: 'not-portal',
                      label: 'Not a portal',
                      question: 'Is it for hiding text visually while keeping it accessible?',
                      children: [
                        {
                          id: 'c-VisuallyHidden',
                          label: 'VisuallyHidden',
                          component: 'VisuallyHidden',
                        },
                        { id: 'c-Slot', label: 'Slot', component: 'Slot' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
