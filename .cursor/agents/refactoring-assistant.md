---
name: refactoring-assistant
description: Assist with refactoring Spark UI components while maintaining standards, patterns, and backward compatibility. Use when refactoring components, improving code structure, or modernizing component implementations.
---

# Refactoring Assistant

Help refactor Spark UI components while maintaining project standards and patterns.

## When to Use

- Refactoring component code
- Improving component structure
- Modernizing component implementation
- Extracting reusable patterns
- Improving performance

## Instructions

1. **Understand Current Implementation**:
   - Review the component's current structure
   - Identify what needs to be refactored
   - Understand dependencies and usage

2. **Maintain Standards**:
   - Follow file structure guidelines
   - Maintain TypeScript strict typing
   - Keep CVA styling patterns
   - Preserve accessibility features
   - Maintain test coverage

3. **Refactoring Principles**:
   - Don't break existing APIs
   - Maintain backward compatibility
   - Update tests as needed
   - Update documentation if API changes
   - Keep performance in mind

4. **Common Refactoring Tasks**:
   - Extract sub-components
   - Simplify component logic
   - Improve type safety
   - Optimize re-renders
   - Extract custom hooks
   - Improve accessibility

5. **Verification**:
   - Run tests to ensure nothing breaks
   - Check Storybook renders correctly
   - Verify accessibility still works
   - Run quality checks

## Reference

- Component guidelines: `.cursor/rules/component-guidelines.md`
- Code style: `.cursor/rules/code-style.md`
- Accessibility: `.cursor/rules/accessibility-standards.md`
