// oxlint-disable max-lines-per-function
import type { DOMAttributes, FocusableElement } from '@react-types/shared'
import type { FocusEventHandler, KeyboardEventHandler, PointerEventHandler, RefObject } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { mergeProps } from 'react-aria'

type KeyboardMode = 'grid' | 'interaction'

// Scope to body cells only so we do not affect header keyboard navigation.
const BODY_CELL_SELECTOR = '[data-spark-component="table-cell"]'

/**
 * Collapsible list widgets handle Arrow keys on the focused control (Downshift, native select).
 * - Capture: stopping propagation on the grid would prevent the event from reaching them.
 * - Bubble: useSelectableCollection's grid onKeyDown still runs (target is inside the table), so
 *   we must not forward vertical arrows to the collection handler in that case.
 */
export function targetIsListboxLikeArrowKeyHandler(target: EventTarget | null): boolean {
  if (!target || !(target instanceof Element)) return false
  return Boolean(
    target.closest(
      '[role="combobox"],select,[data-spark-component="dropdown-trigger"],[data-spark-component="combobox-input"]'
    )
  )
}

/**
 * Open combobox / dropdown consumes Escape to close the list first (APG pattern).
 * Grid uses onKeyDownCapture on the table element, which runs before the trigger's handlers,
 * so we must not exit interaction mode until aria-expanded is false.
 */
export function targetIsOpenComboboxConsumingEscape(target: EventTarget | null): boolean {
  if (!target || !(target instanceof Element)) return false
  const el = target.closest(
    '[role="combobox"],[data-spark-component="dropdown-trigger"],[data-spark-component="combobox-input"]'
  )
  if (!el) return false
  return el.getAttribute('aria-expanded') === 'true'
}
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]'

function getCellFromTarget(target: EventTarget | null): HTMLElement | null {
  if (!target || !(target instanceof Element)) return null
  return (target as Element).closest(BODY_CELL_SELECTOR) as HTMLElement | null
}

/** Row selection column: checkbox should not switch the grid to interaction (edit) mode. */
function isSelectionBodyCell(cell: HTMLElement): boolean {
  return cell.getAttribute('data-table-cell-kind') === 'selection'
}

function getFocusableDescendants(cell: HTMLElement): HTMLElement[] {
  return Array.from(cell.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(el => {
    if (el === cell) return false
    if (el.hasAttribute('disabled')) return false
    if (el.getAttribute('aria-disabled') === 'true') return false
    if (el.getAttribute('hidden') !== null) return false
    return true
  })
}

function setDescendantsFocusable(cell: HTMLElement, enabled: boolean) {
  for (const el of getFocusableDescendants(cell)) {
    const key = 'data-prev-tabindex'
    if (!enabled) {
      if (!el.hasAttribute(key)) {
        el.setAttribute(key, el.getAttribute('tabindex') ?? '')
      }
      el.setAttribute('tabindex', '-1')
    } else {
      const prev = el.getAttribute(key)
      if (prev === null) continue
      el.removeAttribute(key)
      if (prev === '') el.removeAttribute('tabindex')
      else el.setAttribute('tabindex', prev)
    }
  }
}

function disableInCellFocusablesForGridMode(table: HTMLTableElement) {
  const cells = Array.from(table.querySelectorAll<HTMLElement>(BODY_CELL_SELECTOR))
  for (const cell of cells) {
    setDescendantsFocusable(cell, false)
  }
}

export function useTableKeyboardModes<T extends Element>({
  ref,
  gridProps,
  onKeyDownCapture: userOnKeyDownCapture,
  onFocusCapture: userOnFocusCapture,
}: {
  ref: RefObject<T | null>
  gridProps: DOMAttributes<FocusableElement> | Record<string, unknown>
  onKeyDownCapture?: KeyboardEventHandler<Element>
  onFocusCapture?: FocusEventHandler<Element>
}): { gridProps: Record<string, unknown>; keyboardMode: KeyboardMode } {
  const [keyboardMode, setKeyboardMode] = useState<KeyboardMode>('grid')
  const keyboardModeRef = useRef<KeyboardMode>('grid')
  const activeCellRef = useRef<HTMLElement | null>(null)
  /** Pointer on a cell descendant: do not pull focus back to the `td` (grid mode). */
  const skipCellFocusRedirectRef = useRef(false)

  const mergedGridProps = useMemo(() => {
    const { onKeyDown: collectionOnKeyDown, ...gridPropsWithoutKeyDown } = gridProps as Record<
      string,
      unknown
    > & {
      onKeyDown?: KeyboardEventHandler<Element>
    }

    const enterInteractionModeForCell = (bodyCell: HTMLElement) => {
      activeCellRef.current = bodyCell
      keyboardModeRef.current = 'interaction'
      setKeyboardMode('interaction')
      setDescendantsFocusable(bodyCell, true)
    }

    const onBlurCapture: FocusEventHandler<Element> = e => {
      if (keyboardModeRef.current !== 'interaction') return
      const root = ref.current
      if (!root) return
      const next = e.relatedTarget
      if (next instanceof Node && root.contains(next)) return

      activeCellRef.current = null
      keyboardModeRef.current = 'grid'
      setKeyboardMode('grid')
    }

    const onPointerDownCapture: PointerEventHandler<Element> = e => {
      const cell = getCellFromTarget(e.target)
      if (!cell?.matches(BODY_CELL_SELECTOR)) return
      if (!(e.target instanceof Element)) return
      if (e.target !== cell && cell.contains(e.target)) {
        skipCellFocusRedirectRef.current = true
      }
    }

    const onFocusCapture: FocusEventHandler<Element> = e => {
      userOnFocusCapture?.(e)

      const skipRedirectFromPointerOnChild = skipCellFocusRedirectRef.current
      skipCellFocusRedirectRef.current = false

      const root = ref.current
      const cell = getCellFromTarget(e.target)

      if (keyboardModeRef.current === 'interaction' && activeCellRef.current && root) {
        const focusMovedToAnotherBodyCell = Boolean(cell && cell !== activeCellRef.current)
        const focusInsideTableButOutsideActiveCell =
          !cell &&
          e.target instanceof Element &&
          root.contains(e.target) &&
          !activeCellRef.current.contains(e.target)

        if (focusMovedToAnotherBodyCell || focusInsideTableButOutsideActiveCell) {
          keyboardModeRef.current = 'grid'
          setKeyboardMode('grid')
          if (focusInsideTableButOutsideActiveCell) {
            activeCellRef.current = null
          }
        }
      }

      if (!cell) return
      activeCellRef.current = cell

      const focusTarget = e.target instanceof Element ? e.target : null
      const isBodyCell = cell.matches(BODY_CELL_SELECTOR)
      const inGridMode = keyboardModeRef.current === 'grid'
      const focusOnCellDescendant = Boolean(
        focusTarget && focusTarget !== cell && cell.contains(focusTarget)
      )
      const hasInteractiveControls = getFocusableDescendants(cell).length > 0

      // Grid roving focus: keep focus on the `td` unless the user pointed at in-cell content.
      if (
        inGridMode &&
        isBodyCell &&
        focusOnCellDescendant &&
        hasInteractiveControls &&
        !skipRedirectFromPointerOnChild
      ) {
        queueMicrotask(() => cell.focus())
      }

      // Pointer placed focus on a control: match Enter — interaction mode for this cell.
      if (
        skipRedirectFromPointerOnChild &&
        inGridMode &&
        focusOnCellDescendant &&
        isBodyCell &&
        hasInteractiveControls &&
        !isSelectionBodyCell(cell)
      ) {
        enterInteractionModeForCell(cell)
      }
    }

    const onKeyDown: KeyboardEventHandler<Element> = e => {
      // In interaction mode, arrow keys should be handled by the focused control (or ignored),
      // not by the grid's roving focus. We gate on the currently focused element rather than
      // the event target so this still holds for composite controls.
      if (
        keyboardModeRef.current === 'interaction' &&
        (e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown')
      ) {
        const activeCell = activeCellRef.current
        const focused = document.activeElement
        if (activeCell && focused instanceof Node && activeCell.contains(focused)) {
          return
        }
      }
      if (
        keyboardModeRef.current === 'interaction' &&
        (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
        targetIsListboxLikeArrowKeyHandler(e.target) &&
        getCellFromTarget(e.target) === activeCellRef.current
      ) {
        return
      }
      collectionOnKeyDown?.(e)
    }

    const onKeyDownCapture: KeyboardEventHandler<Element> = e => {
      userOnKeyDownCapture?.(e)

      // In interaction mode, allow Tab to move between in-cell controls.
      // React Aria's grid tends to treat Tab as "leave the grid", so we stop propagation
      // so the browser can handle normal tabbing inside the active cell.
      if (keyboardModeRef.current === 'interaction' && e.key === 'Tab') {
        const cell = getCellFromTarget(e.target)
        if (cell && cell === activeCellRef.current) {
          e.stopPropagation()
        }
        return
      }

      if (
        targetIsListboxLikeArrowKeyHandler(e.target) &&
        keyboardModeRef.current === 'interaction' &&
        (e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown')
      ) {
        const cell = getCellFromTarget(e.target)
        if (cell && cell === activeCellRef.current) {
          return
        }
      }

      if (
        keyboardModeRef.current === 'interaction' &&
        (e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown')
      ) {
        const cell = getCellFromTarget(e.target)
        if (cell && cell === activeCellRef.current) {
          e.stopPropagation()
          return
        }
      }

      // In grid mode, ArrowRight on the last cell focuses the row (Spark behavior).
      if (keyboardModeRef.current === 'grid' && e.key === 'ArrowRight') {
        const cell = getCellFromTarget(e.target)
        if (cell) {
          const row = cell.closest('tr') as HTMLElement | null
          if (row) {
            const cells = Array.from(row.querySelectorAll<HTMLElement>(BODY_CELL_SELECTOR))
            const isLastCell = cells.length > 0 && cells[cells.length - 1] === cell
            if (isLastCell) {
              e.preventDefault()
              e.stopPropagation()
              row.focus()
              return
            }
          }
        }
      }

      if (keyboardModeRef.current === 'grid' && e.key === 'Enter') {
        const cell = getCellFromTarget(e.target)
        if (!cell) return
        if (isSelectionBodyCell(cell)) return

        const focusables = getFocusableDescendants(cell)
        if (focusables.length === 0) return

        e.preventDefault()
        e.stopPropagation()

        enterInteractionModeForCell(cell)
        focusables[0]?.focus()
        return
      }

      // APG grid pattern: F2 is an alternative to Enter to enter "interaction" mode.
      // It is also commonly used as a toggle (press again to restore grid navigation).
      if (keyboardModeRef.current === 'grid' && e.key === 'F2') {
        const cell = getCellFromTarget(e.target)
        if (!cell) return
        if (isSelectionBodyCell(cell)) return

        const focusables = getFocusableDescendants(cell)
        if (focusables.length === 0) return

        e.preventDefault()
        e.stopPropagation()

        enterInteractionModeForCell(cell)
        focusables[0]?.focus()
        return
      }

      if (keyboardModeRef.current === 'interaction' && e.key === 'Escape') {
        if (targetIsOpenComboboxConsumingEscape(e.target)) {
          return
        }

        const cell = activeCellRef.current
        if (!cell) return

        e.preventDefault()
        e.stopPropagation()

        keyboardModeRef.current = 'grid'
        setKeyboardMode('grid')
        cell.focus()
      }

      if (keyboardModeRef.current === 'interaction' && e.key === 'F2') {
        const cell = activeCellRef.current
        if (!cell) return

        e.preventDefault()
        e.stopPropagation()

        keyboardModeRef.current = 'grid'
        setKeyboardMode('grid')
        cell.focus()
      }
    }

    return mergeProps(gridPropsWithoutKeyDown, {
      onKeyDown,
      onKeyDownCapture,
      onBlurCapture,
      onFocusCapture,
      onPointerDownCapture,
      'data-table-keyboard-mode': keyboardMode,
    })
  }, [gridProps, keyboardMode, ref, userOnFocusCapture, userOnKeyDownCapture])

  useEffect(() => {
    keyboardModeRef.current = keyboardMode
    const table = ref.current
    if (!table) return

    if (keyboardMode === 'grid') {
      disableInCellFocusablesForGridMode(table as unknown as HTMLTableElement)
      activeCellRef.current?.focus?.()
      return
    }

    disableInCellFocusablesForGridMode(table as unknown as HTMLTableElement)
    if (activeCellRef.current) {
      setDescendantsFocusable(activeCellRef.current, true)
    }
  }, [keyboardMode, ref])

  return { gridProps: mergedGridProps, keyboardMode }
}
