# Migration Guide: Progress from Radix UI to Base UI

This document outlines the changes that require action from consumers when migrating from the Radix UI-based Progress to the Base UI-based implementation.

## Breaking Changes Requiring Migration

### 1. Component Name Change: `Progress.Bar` → `Progress.Track`

**Status:** ⚠️ **Breaking change** (component renamed)

The `Progress.Bar` component has been renamed to `Progress.Track` to align with Base UI's naming convention.

**Migration:**

```tsx
// ❌ Before (Radix UI)
<Progress value={50}>
  <Progress.Bar />
  <Progress.Label>Loading</Progress.Label>
</Progress>

// ✅ After (Base UI)
<Progress value={50}>
  <Progress.Track />
  <Progress.Label>Loading</Progress.Label>
</Progress>
```

**Note:** The functionality remains the same - only the component name has changed.

### 2. New Component: `Progress.Value`

**Status:** ✨ **New feature** (optional)

A new `Progress.Value` component is now available to display the current progress value as text. This component is optional and can be used when you want to show the value visually.

**Usage:**

```tsx
// ✅ New component available
<Progress value={50}>
  <Progress.Label>Loading</Progress.Label>
  <Progress.Track />
  <Progress.Value />
</Progress>

// ✅ Custom value format
<Progress value={75}>
  <Progress.Label>Loading</Progress.Label>
  <Progress.Track />
  <Progress.Value>
    {(formattedValue, value) => `${value}% (${100 - value}% remaining)`}
  </Progress.Value>
</Progress>
```

### 3. Prop Change: `getValueLabel` → `getAriaValueText`

**Status:** ⚠️ **Breaking change** (prop renamed, backward compatible)

The `getValueLabel` prop has been deprecated in favor of `getAriaValueText` to align with Base UI's API. However, `getValueLabel` is still supported for backward compatibility.

**Migration:**

```tsx
// ❌ Before (deprecated, but still works)
<Progress
  value={1}
  max={4}
  getValueLabel={(value, max) => `${value} out of ${max} actions made to earn the reward`}
>
  <Progress.Track />
  <Progress.Label>Reward</Progress.Label>
</Progress>

// ✅ After (recommended)
<Progress
  value={1}
  max={4}
  getAriaValueText={(formattedValue, value) => `${value} out of 4 actions made to earn the reward`}
>
  <Progress.Track />
  <Progress.Label>Reward</Progress.Label>
</Progress>
```

**Note:** 
- `getValueLabel` signature: `(value: number, max: number) => string`
- `getAriaValueText` signature: `(formattedValue: string | null, value: number | null) => string`
- `getValueLabel` is still supported but will be removed in a future version

### 4. Internal Implementation Changes

**Status:** ℹ️ **No action required** (internal changes)

The component now uses Base UI's Progress component internally instead of Radix UI. This change is transparent to consumers and doesn't require any migration steps.

**What changed:**
- Underlying library: Radix UI → Base UI
- Internal state management improved
- Better TypeScript support

**What stayed the same:**
- All existing props work the same way
- Component behavior is identical
- Styling and theming unchanged
- Accessibility features preserved

## Migration Checklist

- [ ] ⚠️ Replace all instances of `Progress.Bar` with `Progress.Track`
- [ ] ⚠️ Update `getValueLabel` to `getAriaValueText` (optional but recommended)
- [ ] ✨ Consider using `Progress.Value` component for displaying values visually (optional)

## Summary

Most consumers will only need to:
1. Replace `Progress.Bar` with `Progress.Track` (required)
2. Optionally migrate `getValueLabel` to `getAriaValueText` (recommended)

All other functionality remains the same and works automatically. The migration is straightforward and should take minimal effort.
