/**
 * Selector for elements that have their own Space/Enter behavior (buttons, switches, inputs, etc.).
 * Used to avoid table row selection capturing these keys when focus is on an interactive cell content.
 */
const INTERACTIVE_SELECTOR =
  'button, [role="button"], [role="switch"], [role="checkbox"], [role="option"], input:not([type="hidden"]), select, textarea, [href], [data-spark-component="dropdown-trigger"], [data-spark-component="icon-button"], [data-spark-component="switch"], [data-spark-component="switch-input"], [data-spark-component="combobox-input"]'

/** Matches table-keyboard `FOCUSABLE_SELECTOR` filtering (body cells with embedded controls). */
const TABLE_CELL_FOCUSABLE_DESCENDANT_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]'

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

function elementFromEventTarget(target: EventTarget | null): Element | null {
  if (!target) return null
  if (target instanceof Element) return target
  if (target instanceof Text) return target.parentElement
  return null
}

function tableBodyCellHasInteractiveDescendants(cell: Element): boolean {
  for (const el of cell.querySelectorAll<HTMLElement>(TABLE_CELL_FOCUSABLE_DESCENDANT_SELECTOR)) {
    if (el === cell) continue
    if (el.hasAttribute('disabled')) continue
    if (el.getAttribute('aria-disabled') === 'true') continue
    if (el.getAttribute('hidden') !== null) continue
    return true
  }
  return false
}

/**
 * Skip React Aria row press/selection when the pointer target is inside in-cell controls
 * (or any "interactive" body cell — same heuristic as grid vs interaction keyboard mode).
 */
export function shouldSuppressRowSelectionFromPointerTarget(target: EventTarget | null): boolean {
  const el = elementFromEventTarget(target)
  if (!el) return false
  // Cast so the type guard's false-branch does not narrow `el` to `never` (Element ∧ ¬Element).
  if (isInteractiveElement(el as EventTarget)) return true

  const cell = el.closest('[data-spark-component="table-cell"]')
  if (!cell || cell.getAttribute('data-table-cell-kind') === 'selection') return false

  return tableBodyCellHasInteractiveDescendants(cell)
}
