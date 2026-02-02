---
name: generate-tests
description: Generate comprehensive unit tests for a Spark UI component using Vitest and React Testing Library. Use when the user wants to add tests, improve test coverage, or test a specific component.
---

# Generate Tests

Create or update unit tests for Spark UI components following the project's testing standards.

## When to Use

- User wants to add tests to a component
- User mentions "test", "testing", or "test coverage"
- Component is missing tests or has incomplete test coverage

## Instructions

1. **Test File Location**: Tests go in `ComponentName.test.tsx` in the component directory

2. **Testing Library Setup**:
   - Use Vitest as the test runner
   - Use React Testing Library for rendering and queries
   - Use `@testing-library/user-event` for interactions

3. **Test Structure**:
   ```tsx
   import { describe, it, expect } from 'vitest'
   import { render, screen } from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import { ComponentName } from './ComponentName'

   describe('ComponentName', () => {
     it('should render', () => {
       render(<ComponentName {...defaultProps} />)
       expect(screen.getByRole('...')).toBeInTheDocument()
     })
     
     it('should be accessible', () => {
       // Accessibility tests
     })
   })
   ```

4. **What to Test**:
   - Component renders correctly
   - All props work as expected
   - All variants (size, variant, etc.) render correctly
   - User interactions (clicks, keyboard, etc.)
   - Accessibility features (ARIA attributes, roles, etc.)
   - Edge cases and error states

5. **Accessibility Testing**:
   - Verify proper ARIA attributes
   - Test keyboard navigation
   - Verify focus management
   - Check semantic HTML

6. **Run Tests**:
   - Use `npm run test:ui` for watch mode
   - Use `npm run test:run` for single run
   - Use `npm run test:coverage` for coverage report

## Examples

Reference existing test files in `packages/components/src/*/ComponentName.test.tsx` for patterns.
