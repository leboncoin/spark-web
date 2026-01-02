# Migration Guide: Drawer from Radix UI to Base UI

This document outlines the changes that require action from consumers when migrating from the Radix UI-based Drawer to the Base UI-based implementation.

## Breaking Changes Requiring Migration

### 1. Removed Props: Focus Management

**Status:** ⚠️ **Breaking change** (props removed)

The following props have been removed from `Drawer.Content` as they are not supported by Base UI:

- `onOpenAutoFocus?: (event: Event) => void` - Removed
- `onCloseAutoFocus?: (event: Event) => void` - Removed
- `onEscapeKeyDown?: (event: KeyboardEvent) => void` - Removed

**Migration:**

```tsx
// ❌ Before (no longer supported)
<Drawer.Content 
  onOpenAutoFocus={(e) => console.log('opened')}
  onCloseAutoFocus={(e) => console.log('closed')}
  onEscapeKeyDown={(e) => console.log('escape')}
>
  {/* ... */}
</Drawer.Content>

// ✅ After (focus management is automatic)
<Drawer.Content>
  {/* Focus is automatically managed by Base UI */}
</Drawer.Content>
```

**Note:** Focus management and escape key handling are now automatic in Base UI. However, you can customize these behaviors using the alternatives below.

#### Alternative: Custom Focus Management

**For `onOpenAutoFocus` replacement:**

If you need to focus a specific element when the drawer opens, use the `initialFocus` prop:

```tsx
// ❌ Before
<Drawer.Content onOpenAutoFocus={(e) => {
  e.preventDefault()
  customInputRef.current?.focus()
}}>
  <Input ref={customInputRef} />
</Drawer.Content>

// ✅ After
const customInputRef = useRef<HTMLInputElement>(null)

<Drawer>
  <Drawer.Content initialFocus={customInputRef}>
    <Input ref={customInputRef} />
  </Drawer.Content>
</Drawer>
```

The `initialFocus` prop accepts:

- `RefObject<HTMLElement>`: Focus the referenced element
- `false`: Don't move focus
- `true`: Use default behavior
- `(interaction: 'mouse' | 'touch' | 'pen' | 'keyboard') => HTMLElement | false | true | undefined`: Function that returns the element to focus based on interaction type

**For `onCloseAutoFocus` replacement:**

If you need to focus a specific element when the drawer closes, use the `finalFocus` prop:

```tsx
// ❌ Before
<Drawer.Content onCloseAutoFocus={(e) => {
  e.preventDefault()
  customButtonRef.current?.focus()
}}>
  {/* ... */}
</Drawer.Content>

// ✅ After
const customButtonRef = useRef<HTMLButtonElement>(null)

<Drawer>
  <Drawer.Content finalFocus={customButtonRef}>
    {/* ... */}
  </Drawer.Content>
</Drawer>

<Button ref={customButtonRef}>Custom button</Button>
```

The `finalFocus` prop accepts the same types as `initialFocus`.

**For `onEscapeKeyDown` replacement:**

If you need to detect when the drawer is closed via the Escape key, you can listen to keyboard events:

```tsx
// ❌ Before
<Drawer.Content onEscapeKeyDown={(e) => {
  console.log('Escape pressed')
  // Custom logic (e.g., analytics, cleanup)
}}>
  {/* ... */}
</Drawer.Content>

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

<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <Drawer.Content>
    {/* ... */}
  </Drawer.Content>
</Drawer>
```

**Note:** The keyboard event listener approach works because Base UI's Drawer closes on Escape key automatically. The listener will fire before the drawer closes, allowing you to execute custom logic.

### 2. Transition Attributes: `data-[state=open]` → `data-open` / `data-closed` and `data-[starting-style]` / `data-[ending-style]` → `data-starting-style` / `data-ending-style`

**Status:** ⚠️ **Breaking change** (for custom CSS/styling)

- **Radix UI:** Used `data-[state=open]` and `data-[state=closed]` attributes for transitions
- **Base UI:** Uses `data-open` and `data-closed` attributes for `Drawer.Content`, and `data-starting-style` and `data-ending-style` attributes (without brackets) for `Drawer.Overlay`
- **Impact:** If you have custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `Drawer.Content` or `Drawer.Overlay`, it will no longer work.

**Migration:**

```css
/* ❌ Before (Radix UI) */
.drawer-content[data-state="open"] {
  animation: slide-in-right 0.4s;
}

.drawer-content[data-state="closed"] {
  animation: slide-out-right 0.2s;
}

.drawer-overlay[data-state="open"] {
  animation: fade-in 0.2s;
}

.drawer-overlay[data-state="closed"] {
  animation: fade-out 0.2s;
}

/* ✅ After (Base UI) */
.drawer-content[data-open] {
  animation: slide-in-right 0.4s;
}

.drawer-content[data-closed] {
  animation: slide-out-right 0.2s;
}

.drawer-overlay[data-starting-style] {
  animation: fade-in 0.2s;
}

.drawer-overlay[data-ending-style] {
  animation: fade-out 0.2s;
}
```

**Note:** The default transitions (`animate-slide-in-*`, `animate-slide-out-*`, `animate-fade-in`, and `animate-fade-out`) are automatically applied and work out of the box. You only need to migrate if you have custom transition styles.

**Important:** Base UI uses `data-open`/`data-closed` for `Drawer.Content` and `data-starting-style`/`data-ending-style` (without brackets) for `Drawer.Overlay`.

### 3. Removed Prop: `onInteractOutside`

**Status:** ⚠️ **Breaking change** (prop removed)

The `onInteractOutside` prop has been removed from `Drawer.Content` as it is not supported by Base UI:

- `onInteractOutside?: (event: Event) => void` - Removed

**Migration:**

```tsx
// ❌ Before (no longer supported)
<Drawer.Content
  onInteractOutside={(event) => {
    // Prevent closing when clicking outside
    event.preventDefault()
  }}
>
  {/* ... */}
</Drawer.Content>

// ✅ After (use modal prop to control outside interaction)
<Drawer.Content modal={true}>
  {/* Drawer will close on outside click by default */}
</Drawer.Content>
```

**Note:** Base UI handles outside interactions automatically. If you need to prevent closing on outside click, you can use the `modal` prop or handle the `onOpenChange` event on the `Drawer` root component.

### 4. Portal Z-Index Changes

**Status:** ⚠️ **Breaking change** (for custom CSS/styling)

- **Radix UI:** Portal had no default z-index classes
- **Base UI:** Portal now has `z-modal absolute` classes applied by default

**Migration:**

If you have custom CSS targeting the Portal z-index, you may need to adjust:

```css
/* ❌ Before (Radix UI) */
.drawer-portal {
  /* No default z-index */
}

/* ✅ After (Base UI) */
.drawer-portal {
  z-index: var(--z-modal);
  position: absolute;
}
```

**Note:** The default z-index values are automatically applied. You only need to migrate if you have custom z-index overrides. The Overlay z-index remains unchanged (`z-overlay`).

## Migration Checklist

- [ ] ⚠️ Remove any usage of `onOpenAutoFocus` on `Drawer.Content` (use `initialFocus` prop instead)
- [ ] ⚠️ Remove any usage of `onCloseAutoFocus` on `Drawer.Content` (use `finalFocus` prop instead)
- [ ] ⚠️ Remove any usage of `onEscapeKeyDown` on `Drawer.Content` (use `onOpenChange` on `Drawer` root instead)
- [ ] ⚠️ Remove any usage of `onInteractOutside` on `Drawer.Content`
- [ ] ⚠️ Update custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `Drawer.Content` to use `data-open` and `data-closed` instead
- [ ] ⚠️ Update custom CSS targeting `data-[state=open]` or `data-[state=closed]` on `Drawer.Overlay` to use `data-starting-style` and `data-ending-style` instead (without brackets)
- [ ] ⚠️ Review custom z-index overrides for `Drawer.Portal` if applicable

## Summary

Most consumers won't need any changes. The migration only requires action if you:

- Use the removed event handler props (`onOpenAutoFocus`, `onCloseAutoFocus`, `onEscapeKeyDown`, `onInteractOutside`)
- Have custom CSS targeting the old transition attributes (`data-[state=open]`, `data-[state=closed]`)
- Have custom z-index overrides for Portal

All other functionality remains the same and works automatically.

