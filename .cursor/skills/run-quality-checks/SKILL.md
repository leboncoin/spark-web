---
name: run-quality-checks
description: Run all quality checks including linting, type checking, and tests. Use when the user wants to verify code quality, before committing, or when preparing a PR.
---

# Run Quality Checks

Execute all code quality checks for the Spark UI project.

## When to Use

- Before committing code
- When preparing a PR
- User wants to verify code quality
- User mentions "lint", "typecheck", or "quality"

## Instructions

1. **Linting**:
   ```bash
   npm run lint
   ```
   Checks code style and quality with ESLint.

2. **Type Checking**:
   ```bash
   npm run typecheck
   ```
   Verifies TypeScript types are correct.

3. **Formatting**:
   ```bash
   npm run prettier
   ```
   Checks and fixes code formatting.

4. **All Formatting Checks**:
   ```bash
   npm run prettify
   ```
   Runs both lint and prettier.

5. **Tests**:
   ```bash
   npm run test:run
   ```
   Runs all unit tests.

6. **Test Coverage**:
   ```bash
   npm run test:coverage
   ```
   Generates coverage report.

7. **E2E Tests**:
   ```bash
   npm run test:e2e
   ```
   Runs end-to-end tests with Playwright.

8. **Accessibility Tests**:
   ```bash
   npm run test:a11y
   ```
   Runs accessibility tests.

## Complete Quality Pipeline

For a complete check before PR:
```bash
npm run lint && npm run typecheck && npm run test:run && npm run test:a11y
```
