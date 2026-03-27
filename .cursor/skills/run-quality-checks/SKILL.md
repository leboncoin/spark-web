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
   Checks code style and quality with Oxlint.

2. **Type Checking**:
   ```bash
   npm run typecheck
   ```
   Verifies TypeScript types are correct.

3. **Formatting**:
   ```bash
   npm run format
   ```
   Writes formatted source with Oxfmt.

4. **Formatting (check only)**:
   ```bash
   npm run format:check
   ```
   Verifies formatting without modifying files.

5. **Lint and format**:
   ```bash
   npm run prettify
   ```
   Runs lint, then applies Oxfmt.

6. **Tests**:
   ```bash
   npm run test:run
   ```
   Runs all unit tests.

7. **Test Coverage**:
   ```bash
   npm run test:coverage
   ```
   Generates coverage report.

8. **E2E Tests**:
   ```bash
   npm run test:e2e
   ```
   Runs end-to-end tests with Playwright.

9. **Accessibility Tests**:
   ```bash
   npm run test:a11y
   ```
   Runs accessibility tests.

## Complete Quality Pipeline

For a complete check before PR:
```bash
npm run lint && npm run format:check && npm run typecheck && npm run test:run && npm run test:a11y
```
