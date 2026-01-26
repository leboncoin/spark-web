# Migration Guide: Dialog from Radix UI to Base UI

This document outlines the changes that require action from consumers when migrating from the Radix UI-based Dialog to the Base UI-based implementation.

## Breaking Changes Requiring Migration

### 1. Removed Props: Focus Management

**Status:** ⚠️ **Breaking change** (props removed)

The following props have been removed from `Dialog.Content` as they are not supported by Base UI:

- `onOpenAutoFocus?: (event: Event) => void` - Removed
- `onCloseAutoFocus?: (event: Event) => void` - Removed
- `onEscapeKeyDown?: (event: KeyboardEvent) => void` - Removed

**Migration:**

```tsx
// ❌ Before (no longer supported)
<Dialog.Content 
  onOpenAutoFocus={(e) => console.log('opened')}
  onCloseAutoFocus={(e) => console.log('closed')}
  onEscapeKeyDown={(e) => console.log('escape')}
>
  {/* ... */}
</Dialog.Content>

// ✅ After (focus management is automatic)
<Dialog.Content>
  {/* Focus is automatically managed by Base UI */}
</Dialog.Content>
```

**Note:** Focus management and escape key handling are now automatic in Base UI. However, you can customize these behaviors using the alternatives below.

#### Alternative: Custom Focus Management

**For `onOpenAutoFocus` replacement:**

If you need to focus a specific element when the dialog opens, use the `initialFocus` prop:

```tsx
// ❌ Before
<Dialog.Content onOpenAutoFocus={(e) => {
  e.preventDefault()
  customInputRef.current?.focus()
}}>
  <Input ref={customInputRef} />
</Dialog.Content>

// ✅ After
const customInputRef = useRef<HTMLInputElement>(null)

<Dialog>
  <Dialog.Content initialFocus={customInputRef}>
    <Input ref={customInputRef} />
  </Dialog.Content>
</Dialog>
```

The `initialFocus` prop accepts:

- `RefObject<HTMLElement>`: Focus the referenced element
- `false`: Don't move focus
- `true`: Use default behavior
- `(interaction: 'mouse' | 'touch' | 'pen' | 'keyboard') => HTMLElement | false | true | undefined`: Function that returns the element to focus based on interaction type

**For `onCloseAutoFocus` replacement:**

If you need to focus a specific element when the dialog closes, use the `finalFocus` prop:

```tsx
// ❌ Before
<Dialog.Content onCloseAutoFocus={(e) => {
  e.preventDefault()
  customButtonRef.current?.focus()
}}>
  {/* ... */}
</Dialog.Content>

// ✅ After
const customButtonRef = useRef<HTMLButtonElement>(null)

<Dialog>
  <Dialog.Content finalFocus={customButtonRef}>
    {/* ... */}
  </Dialog.Content>
</Dialog>

<Button ref={customButtonRef}>Custom button</Button>
```

The `finalFocus` prop accepts the same types as `initialFocus`.

**For `onEscapeKeyDown` replacement:**

If you need to detect when the dialog is closed via the Escape key, you can listen to keyboard events:

```tsx
// ❌ Before
<Dialog.Content onEscapeKeyDown={(e) => {
  console.log('Escape pressed')
  // Custom logic (e.g., analytics, cleanup)
}}>
  {/* ... */}
</Dialog.Content>

// ✅ After
const [isOpen, setIsOpen] = useState(false)

useEffect(() => {
  if (!isOpen) return

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      console.log('Escape pressed')
      // Custom logic (e.g., analytics, cleanup)
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}, [isOpen])

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Content>
    {/* ... */}
  </Dialog.Content>
</Dialog>
```

**Note:** The keyboard event listener approach works because Base UI's Dialog closes on Escape key automatically. The listener will fire before the dialog closes, allowing you to execute custom logic.

### 2. Transition Attributes: `data-[state=open]` → `data-open` / `data-closed` and `data-[starting-style]` / `data-[ending-style]` → `data-starting-style` / `data-ending-style`

**Status:** ⚠️ **Breaking change** (for custom CSS/styling)

- **Radix UI:** Used `data-[state=open]` and `data-[state=closed]` attributes for transitions
- **Base UI:** Uses `data-open` and `data-closed` attributes for `Dialog.Content`, and `data-starting-style` and `data-ending-style` attributes (without brackets) for `Dialog.Overlay`
- **Impact:** If you have custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `Dialog.Content` or `Dialog.Overlay`, it will no longer work.

**Migration:**

```css
/* ❌ Before (Radix UI) */
.dialog-content[data-state="open"] {
  animation: fade-in 0.4s;
}

.dialog-content[data-state="closed"] {
  animation: fade-out 0.2s;
}

.dialog-overlay[data-state="open"] {
  animation: fade-in 0.2s;
}

.dialog-overlay[data-state="closed"] {
  animation: fade-out 0.2s;
}

/* ✅ After (Base UI) */
.dialog-content[data-open] {
  animation: fade-in 0.4s;
}

.dialog-content[data-closed] {
  animation: fade-out 0.2s;
}

.dialog-overlay[data-starting-style] {
  animation: fade-in 0.2s;
}

.dialog-overlay[data-ending-style] {
  animation: fade-out 0.2s;
}
```

**Note:** The default transitions (`animate-fade-in` and `animate-fade-out`) are automatically applied and work out of the box. You only need to migrate if you have custom transition styles.

**Important:** Base UI uses `data-starting-style` and `data-ending-style` (without brackets), not `data-[starting-style]` and `data-[ending-style]`.

### 3. Removed Prop: `onInteractOutside`

**Status:** ⚠️ **Breaking change** (prop removed)

The `onInteractOutside` prop has been removed from `Dialog.Content` as it is not supported by Base UI:

- `onInteractOutside?: (event: Event) => void` - Removed

**Migration:**

```tsx
// ❌ Before (no longer supported)
<Dialog.Content
  onInteractOutside={(event) => {
    // Prevent closing when clicking outside
    event.preventDefault()
  }}
>
  {/* ... */}
</Dialog.Content>

// ✅ After (use modal prop to control outside interaction)
<Dialog.Content modal={true}>
  {/* Dialog will close on outside click by default */}
</Dialog.Content>
```

**Note:** Base UI handles outside interactions automatically. If you need to prevent closing on outside click, you can use the `modal` prop or handle the `onOpenChange` event on the `Dialog` root component.

### 4. Portal Z-Index Changes

**Status:** ⚠️ **Breaking change** (for custom CSS/styling)

- **Radix UI:** Portal had no default z-index classes
- **Base UI:** Portal now has `z-modal absolute` classes applied by default
- **Overlay:** Still has `z-overlay` class (unchanged)

**Migration:**

If you have custom CSS targeting the Portal z-index, you may need to adjust:

```css
/* ❌ Before (Radix UI) */
.dialog-portal {
  /* No default z-index */
}

/* ✅ After (Base UI) */
.dialog-portal {
  z-index: var(--z-modal);
  position: absolute;
}
```

**Note:** The default z-index values are automatically applied. You only need to migrate if you have custom z-index overrides. The Overlay z-index remains unchanged (`z-overlay`).

### 5. Nested Dialog Support

**Status:** ✅ **New feature** (no migration required)

Base UI now supports nested dialogs with automatic visual feedback. When a dialog is opened inside another dialog, the parent dialog automatically receives a `data-nested-dialog-open` attribute that applies a dimming effect.

**Usage:**

```tsx
// ✅ Nested dialogs are now supported
<Dialog>
  <Dialog.Content>
    {/* Parent dialog content */}
    <Dialog>
      <Dialog.Content>
        {/* Nested dialog content */}
      </Dialog.Content>
    </Dialog>
  </Dialog.Content>
</Dialog>
```

The parent dialog will automatically scale down and show a dimming overlay when a nested dialog is open.

## Migration Checklist

- [ ] ⚠️ Remove any usage of `onOpenAutoFocus` on `Dialog.Content` (use `initialFocus` prop instead)
- [ ] ⚠️ Remove any usage of `onCloseAutoFocus` on `Dialog.Content` (use `finalFocus` prop instead)
- [ ] ⚠️ Remove any usage of `onEscapeKeyDown` on `Dialog.Content` (use `onOpenChange` on `Dialog` root instead)
- [ ] ⚠️ Remove any usage of `onInteractOutside` on `Dialog.Content`
- [ ] ⚠️ Update custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `Dialog.Content` to use `data-open` and `data-closed` instead
- [ ] ⚠️ Update custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `Dialog.Overlay` to use `data-starting-style` and `data-ending-style` instead (without brackets)
- [ ] ⚠️ Review custom z-index overrides for `Dialog.Portal` if applicable

## Summary

Most consumers won't need any changes. The migration only requires action if you:

- Use the removed event handler props (`onOpenAutoFocus`, `onCloseAutoFocus`, `onEscapeKeyDown`, `onInteractOutside`)
- Have custom CSS targeting the old transition attributes (`data-[state=open]`, `data-[state=closed]`)
- Have custom z-index overrides for Portal

All other functionality remains the same and works automatically. Nested dialogs are now supported out of the box.

