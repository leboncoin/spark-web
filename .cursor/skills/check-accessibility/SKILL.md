---
name: check-accessibility
description: Check and verify accessibility compliance for Spark UI components. Use when the user wants to test accessibility, verify WCAG compliance, or fix accessibility issues.
---

# Check Accessibility

Verify that components meet WCAG 2.1 AA accessibility standards.

## When to Use

- User wants to check accessibility
- User mentions "a11y", "accessibility", or "WCAG"
- Component has accessibility issues
- Before submitting a PR

## Instructions

1. **Automated Testing**:

   ```bash
   # Test all components
   npm run test:a11y
   
   # Test specific component(s)
   npm run test:a11y -- tabs
   npm run test:a11y -- tabs button card
   
   # Combine with Playwright options
   npm run test:a11y -- tabs --workers 1
   ```

   This runs Playwright tests with `@axe-core/playwright` for automated accessibility checks. You can test specific components by passing their names as arguments after `--`. Component names are case-insensitive and should match the keys in `e2e/a11y/routes/components.ts`.

2. **Manual Checks**:
   - Verify semantic HTML elements
   - Check ARIA attributes are correct
   - Test keyboard navigation
   - Verify focus management
   - Test with screen readers

3. **Common Accessibility Requirements**:
   - All interactive elements must be keyboard accessible
   - Proper ARIA labels and roles
   - Focus indicators visible
   - Color contrast meets WCAG AA (4.5:1 for text)
   - Semantic HTML structure

4. **Testing Tools**:
   - `@axe-core/playwright` for automated testing
   - `@testing-library/react` for unit test accessibility
   - Browser DevTools Accessibility panel
   - Screen reader testing (NVDA, JAWS, VoiceOver)

5. **Fix Issues**:
   - Add missing ARIA attributes
   - Fix keyboard navigation
   - Improve focus management
   - Fix color contrast
   - Use semantic HTML

## Standards

All components must meet WCAG 2.1 AA standards. See `.cursor/rules/accessibility-standards.md` for details.
