# Stepper Migration Guide

## Migration from react-aria to Base UI

The Stepper component has been migrated from `react-aria` to Base UI's `NumberField`. This migration introduces **NO breaking changes** - all existing code will continue to work without any modifications.

## No Breaking Changes! ✅

Your existing code will work exactly as before. The API remains unchanged:

```tsx
// Your code continues to work as-is
<Stepper minValue={0} maxValue={100} formatOptions={{ style: 'currency', currency: 'EUR' }}>
  <Stepper.DecrementButton aria-label="Decrement" />
  <Stepper.Input />
  <Stepper.IncrementButton aria-label="Increment" />
</Stepper>
```

## What Changed Internally

The component now uses Base UI's NumberField under the hood instead of react-aria, but the public API remains identical:

- ✅ `minValue` prop - works exactly as before
- ✅ `maxValue` prop - works exactly as before
- ✅ `formatOptions` prop - works exactly as before
- ✅ All other props remain unchanged

## Removed Feature (Non-Breaking)

**Mouse wheel scrolling:** The ability to increment/decrement using the mouse wheel when the input is focused is no longer supported. This feature was rarely used and is not considered a breaking change.

## All Features Preserved

The following features continue to work as before:

- ✅ Controlled and uncontrolled modes (`value` / `defaultValue`)
- ✅ Value change callbacks (`onValueChange`)
- ✅ Min/max validation (`minValue` / `maxValue`)
- ✅ Step increments
- ✅ Disabled and read-only states
- ✅ Keyboard navigation (Arrow Up/Down, Home, End)
- ✅ Locale-aware number formatting
- ✅ Currency, percentage, and unit formatting (`formatOptions`)
- ✅ Integration with FormField
- ✅ Custom button implementations
- ✅ Accessibility (ARIA attributes)

## Behavioral Guarantees

### Value Initialization with `undefined`

Behavior remains identical:
- Incrementing from `undefined` with `minValue` set → starts at `minValue`
- Incrementing from `undefined` without `minValue` → starts at `0`
- Decrementing from `undefined` with `maxValue` set → starts at `maxValue`

### Number Formatting

Base UI's NumberField uses the same `Intl.NumberFormat` API as react-aria, so formatting behavior is identical:

```tsx
// Currency formatting - works exactly as before
<Stepper formatOptions={{ style: 'currency', currency: 'EUR' }} />

// Percentage formatting - works exactly as before
<Stepper formatOptions={{ style: 'percent' }} />

// Unit formatting - works exactly as before
<Stepper formatOptions={{ style: 'unit', unit: 'celsius' }} />
```

## Updated Dependencies

The following internal dependencies have been replaced:
- ❌ `@react-aria/button` (removed)
- ❌ `@react-aria/numberfield` (removed)
- ❌ `@react-stately/numberfield` (removed)
- ✅ Now uses `@base-ui/react` (already a project dependency)

This change is internal only and does not affect your code.

## Testing Considerations

If you have custom tests that:
1. Test mouse wheel behavior - these tests should be updated or removed
2. Mock `@react-aria` internals - these mocks are no longer needed

## Internal Hook Deprecation

The `useStepper` hook was an internal implementation detail and should not be used externally. It remains available for backward compatibility but will be removed in a future version.

## Questions or Issues?

If you encounter any issues, please report them at:
https://github.com/leboncoin/spark-web/issues
