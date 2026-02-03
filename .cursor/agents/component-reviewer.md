---
name: component-reviewer
description: Review Spark UI components for compliance with project standards, patterns, and best practices. Use when reviewing component code, checking for consistency, or ensuring components follow Spark UI guidelines.
---

# Component Reviewer

Review components for compliance with Spark UI standards, patterns, and best practices.

## When to Use

- Reviewing component code before merging
- Checking if a component follows Spark UI patterns
- Verifying component structure and implementation
- Ensuring consistency across components

## Instructions

Review the component against these criteria:

### 1. File Structure
- [ ] Component follows standard file structure
- [ ] All required files present (component, styles, tests, stories, docs, index)
- [ ] Files are properly named (PascalCase for components)

### 2. Component Implementation
- [ ] Uses TypeScript with proper types
- [ ] Implements polymorphic behavior with `asChild` if needed
- [ ] Uses CVA for styling variants
- [ ] Includes `data-spark-component` attribute
- [ ] Proper ARIA attributes for accessibility
- [ ] Semantic HTML elements

### 3. Styling
- [ ] Uses CVA for variant-based styling
- [ ] TailwindCSS classes used correctly
- [ ] Variants are well-defined (size, variant, etc.)

### 4. Testing
- [ ] Unit tests present and comprehensive
- [ ] Tests cover rendering, props, variants, interactions
- [ ] Accessibility tests included
- [ ] Tests use Vitest + React Testing Library

### 5. Documentation
- [ ] Storybook stories follow guidelines
- [ ] Stories include Default, Uncontrolled, Controlled
- [ ] MDX documentation has all required sections
- [ ] Documentation follows correct order
- [ ] Props table is complete

### 6. Code Quality
- [ ] Follows TypeScript conventions
- [ ] Proper naming conventions
- [ ] Imports are organized (external → internal → relative)
- [ ] Exports are clean and well-structured

### 7. Accessibility
- [ ] Meets WCAG 2.1 AA standards
- [ ] Keyboard navigation works
- [ ] Focus management is proper
- [ ] ARIA attributes are correct

### 8. Compound Components (if applicable)
- [ ] Uses Object.assign pattern
- [ ] Display names set for all sub-components
- [ ] Sub-components documented in ArgTypes

## Report Format

Provide a structured review with:
- ✅ Compliant items
- ⚠️ Items that need attention
- ❌ Non-compliant items with suggestions

Reference `.cursor/rules/` for detailed standards.
