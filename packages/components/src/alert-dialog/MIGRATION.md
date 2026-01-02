# Migration Guide: AlertDialog from Radix UI to Base UI

This document outlines the changes that require action from consumers when migrating from the Radix UI-based AlertDialog to the Base UI-based implementation.

## Breaking Changes Requiring Migration

### 1. Removed Props: Focus Management

**Status:** ⚠️ **Breaking change** (props removed)

The following props have been removed from `AlertDialog.Content` as they are not supported by Base UI:

- `onOpenAutoFocus?: (event: Event) => void` - Removed
- `onCloseAutoFocus?: (event: Event) => void` - Removed
- `onEscapeKeyDown?: (event: KeyboardEvent) => void` - Removed

**Migration:**

```tsx
// ❌ Before (no longer supported)
<AlertDialog.Content 
  onOpenAutoFocus={(e) => console.log('opened')}
  onCloseAutoFocus={(e) => console.log('closed')}
  onEscapeKeyDown={(e) => console.log('escape')}
>
  {/* ... */}
</AlertDialog.Content>

// ✅ After (focus management is automatic)
<AlertDialog.Content>
  {/* Focus is automatically managed by Base UI */}
</AlertDialog.Content>
```

**Note:** Focus management and escape key handling are now automatic in Base UI. However, you can customize these behaviors using the alternatives below.

#### Alternative: Custom Focus Management

**For `onOpenAutoFocus` replacement:**

If you need to focus a specific element when the dialog opens (instead of the default cancel button), use the `initialFocus` prop:

```tsx
// ❌ Before
<AlertDialog.Content onOpenAutoFocus={(e) => {
  e.preventDefault()
  customInputRef.current?.focus()
}}>
  <Input ref={customInputRef} />
</AlertDialog.Content>

// ✅ After
const customInputRef = useRef<HTMLInputElement>(null)

<AlertDialog>
  <AlertDialog.Content initialFocus={customInputRef}>
    <Input ref={customInputRef} />
  </AlertDialog.Content>
</AlertDialog>
```

The `initialFocus` prop accepts:

- `RefObject<HTMLElement>`: Focus the referenced element
- `false`: Don't move focus
- `true`: Use default behavior (focus cancel button)
- `(interaction: 'mouse' | 'touch' | 'pen' | 'keyboard') => HTMLElement | false | true | undefined`: Function that returns the element to focus based on interaction type

**For `onCloseAutoFocus` replacement:**

If you need to focus a specific element when the dialog closes (instead of the default trigger), use the `finalFocus` prop:

```tsx
// ❌ Before
<AlertDialog.Content onCloseAutoFocus={(e) => {
  e.preventDefault()
  customButtonRef.current?.focus()
}}>
  {/* ... */}
</AlertDialog.Content>

// ✅ After
const customButtonRef = useRef<HTMLButtonElement>(null)

<AlertDialog>
  <AlertDialog.Content finalFocus={customButtonRef}>
    {/* ... */}
  </AlertDialog.Content>
</AlertDialog>

<Button ref={customButtonRef}>Custom button</Button>
```

The `finalFocus` prop accepts the same types as `initialFocus`.

**For `onEscapeKeyDown` replacement:**

If you need to detect when the dialog is closed via the Escape key, you can listen to keyboard events:

```tsx
// ❌ Before
<AlertDialog.Content onEscapeKeyDown={(e) => {
  console.log('Escape pressed')
  // Custom logic (e.g., analytics, cleanup)
}}>
  {/* ... */}
</AlertDialog.Content>

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

<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
  <AlertDialog.Content>
    {/* ... */}
  </AlertDialog.Content>
</AlertDialog>
```

**Note:** The keyboard event listener approach works because Base UI's AlertDialog closes on Escape key automatically. The listener will fire before the dialog closes, allowing you to execute custom logic.

### 2. Portal Z-Index Changes

**Status:** ⚠️ **Breaking change** (for custom CSS/styling)

- **Radix UI:** Portal had no default z-index classes
- **Base UI:** Portal now has `z-modal absolute` classes applied by default
- **Overlay:** Still has `z-overlay` class (unchanged)

**Migration:**

If you have custom CSS targeting the Portal z-index, you may need to adjust:

```css
/* ❌ Before (Radix UI) */
.alert-dialog-portal {
  /* No default z-index */
}

/* ✅ After (Base UI) */
.alert-dialog-portal {
  z-index: var(--z-modal);
  position: absolute;
}
```

**Note:** The default z-index values are automatically applied. You only need to migrate if you have custom z-index overrides. The Overlay z-index remains unchanged (`z-overlay`).

### 3. Transition Attributes: `data-[state=open]` → `data-open` / `data-closed` and `data-[starting-style]` / `data-[ending-style]` → `data-starting-style` / `data-ending-style`

**Status:** ⚠️ **Breaking change** (for custom CSS/styling)

- **Radix UI:** Used `data-[state=open]` and `data-[state=closed]` attributes for transitions
- **Base UI:** Uses `data-open` and `data-closed` attributes for `AlertDialog.Content`, and `data-starting-style` and `data-ending-style` attributes (without brackets) for `AlertDialog.Overlay`
- **Impact:** If you have custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `AlertDialog.Content` or `AlertDialog.Overlay`, it will no longer work.

**Migration:**

```css
/* ❌ Before (Radix UI) */
.alert-dialog-content[data-state="open"] {
  animation: fade-in 0.2s;
}

.alert-dialog-content[data-state="closed"] {
  animation: fade-out 0.2s;
}

.alert-dialog-overlay[data-state="open"] {
  animation: fade-in 0.2s;
}

.alert-dialog-overlay[data-state="closed"] {
  animation: fade-out 0.2s;
}

/* ✅ After (Base UI) */
.alert-dialog-content[data-open] {
  animation: fade-in 0.2s;
}

.alert-dialog-content[data-closed] {
  animation: fade-out 0.2s;
}

.alert-dialog-overlay[data-starting-style] {
  animation: fade-in 0.2s;
}

.alert-dialog-overlay[data-ending-style] {
  animation: fade-out 0.2s;
}
```

**Note:** The default transitions (`animate-fade-in` and `animate-fade-out`) are automatically applied and work out of the box. You only need to migrate if you have custom transition styles.

**Important:** Base UI uses `data-open`/`data-closed` for `AlertDialog.Content` and `data-starting-style`/`data-ending-style` (without brackets) for `AlertDialog.Overlay`.

## Migration Checklist

- [ ] ⚠️ Remove any usage of `onOpenAutoFocus` on `AlertDialog.Content` (use `initialFocus` prop instead)
- [ ] ⚠️ Remove any usage of `onCloseAutoFocus` on `AlertDialog.Content` (use `finalFocus` prop instead)
- [ ] ⚠️ Remove any usage of `onEscapeKeyDown` on `AlertDialog.Content` (use `onOpenChange` on `AlertDialog` root instead)
- [ ] ⚠️ Update custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `AlertDialog.Content` to use `data-open` and `data-closed` instead
- [ ] ⚠️ Update custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `AlertDialog.Overlay` to use `data-starting-style` and `data-ending-style` instead (without brackets)
- [ ] ⚠️ Review custom z-index overrides for `AlertDialog.Portal` if applicable

## Summary

Most consumers won't need any changes. The migration only requires action if you:

- Use the removed event handler props (`onOpenAutoFocus`, `onCloseAutoFocus`, `onEscapeKeyDown`)
- Have custom CSS targeting the old transition attributes (`data-[state=open]`, `data-[state=closed]`)
- Have custom z-index overrides for Portal

All other functionality remains the same and works automatically.
