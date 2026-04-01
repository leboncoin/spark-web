/**
 * Selector for elements that have their own Space/Enter behavior (buttons, switches, inputs, etc.).
 * Used to avoid table row selection capturing these keys when focus is on an interactive cell content.
 */
const INTERACTIVE_SELECTOR =
  'button, [role="button"], [role="switch"], [role="checkbox"], [role="option"], input:not([type="hidden"]), select, textarea, [href]'

/**
 * Elements that are expected to "activate" on Space/Enter (and for which we may safely synthesize a click
 * when we intercept key events in capture phase).
 *
 * IMPORTANT: text entry controls (text inputs, textarea, select) are intentionally excluded so Space
 * keeps typing/behaving normally.
 */
const KEYBOARD_ACTIVATABLE_SELECTOR =
  'button, [role="button"], [role="switch"], [role="checkbox"], [href], input[type="checkbox"], input[type="radio"], input[type="button"], input[type="submit"], input[type="reset"]'

/** Column resizer uses a hidden focusable input for keyboard resize (Enter to toggle, ArrowLeft/Right). Don't convert Enter to click there. */
const COLUMN_RESIZER_SELECTOR = '[data-resizable-direction]'

export function isInteractiveElement(element: EventTarget | null): element is Element {
  if (!element || !(element instanceof Element)) return false
  const el = element as Element

  return el.matches(INTERACTIVE_SELECTOR) || el.closest(INTERACTIVE_SELECTOR) !== null
}

export function isKeyboardActivatableElement(element: EventTarget | null): element is Element {
  if (!element || !(element instanceof Element)) return false
  const el = element as Element

  return (
    el.matches(KEYBOARD_ACTIVATABLE_SELECTOR) || el.closest(KEYBOARD_ACTIVATABLE_SELECTOR) !== null
  )
}

export function isColumnResizerElement(element: EventTarget | null): element is Element {
  if (!element || !(element instanceof Element)) return false

  return (element as Element).closest(COLUMN_RESIZER_SELECTOR) !== null
}
