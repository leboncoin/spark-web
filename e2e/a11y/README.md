# Accessibility testing for Spark

To add or improve a component's accessibility testing here are the steps you should follow:

1. Create your implementation page within `./pages` directory (ex: `A11yButton.tsx`)
2. Add your implementation page to the Playwright testable routes (see `./routes/components.ts` and `./routes/elements.tsx`)
3. Run the tests using `npm run test:a11y`!

## Testing specific components

You can test one or multiple components in isolation by passing component names as arguments after `--`:

```bash
# Test a single component
npm run test:a11y -- tabs

# Test multiple components
npm run test:a11y -- tabs button card

# Test all components (default behavior)
npm run test:a11y
```

You can also combine component names with Playwright options:

```bash
# Test specific components with custom workers
npm run test:a11y -- tabs button --workers 2
```

The component names are case-insensitive and should match the keys in `./routes/components.ts`.
