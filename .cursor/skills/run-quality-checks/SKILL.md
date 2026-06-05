---
name: run-quality-checks
description: "Run all quality checks including linting, type checking, formatting, and tests. Use when the user wants to verify code quality, before committing, or when preparing a PR."
---

# Run Quality Checks

## Quick Pipeline

Run all checks before committing or opening a PR:

```bash
npm run lint && npm run format:check && npm run typecheck && npm run test:run && npm run test:a11y
```

If any step fails, fix the reported issues and re-run from the failed step before continuing.

## Individual Checks

### Linting

```bash
npm run lint
npm run lint:fix  # auto-fix lint issues
```

### Formatting

```bash
npm run format:check  # verify only
npm run format         # apply fixes
```

### Type Checking

```bash
npm run typecheck
```

### Unit Tests

```bash
npm run test:run
npm run test:coverage  # with coverage report
```

### E2E Tests

```bash
npm run test:e2e
```

### Accessibility Tests

```bash
npm run test:a11y
```

## Combined Commands

Lint and format in a single step:

```bash
npm run prettify
```
