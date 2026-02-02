---
name: create-component
description: Create a new Spark UI component with complete file structure including component, styles, tests, stories, and documentation. Use when the user wants to create a new component or add a component to the design system.
---

# Create Component

Create a new Spark UI component following the project's standards and file structure.

## When to Use

- User wants to create a new component
- User mentions "new component", "add component", or "create component"
- User is implementing a component from a design

## Instructions

1. **Determine component location**: Components go in `packages/components/src/<component-name>/`

2. **Create the file structure**:
   ```
   component-name/
   ├── ComponentName.tsx           # Main component
   ├── ComponentName.styles.tsx    # Styling with CVA
   ├── ComponentName.test.tsx      # Unit tests
   ├── ComponentName.stories.tsx   # Storybook stories
   ├── ComponentName.doc.mdx       # Documentation
   ├── index.ts                    # Exports
   └── variants/                   # Style variants (if applicable)
   ```

3. **Component Implementation**:
   - Use TypeScript with strict typing
   - Implement polymorphic behavior with `asChild` prop if needed
   - Use CVA (Class Variance Authority) for styling variants
   - Include `data-spark-component` attribute
   - Ensure WCAG 2.1 AA compliance
   - Use proper ARIA attributes

4. **Styling**:
   - Create `ComponentName.styles.tsx` with CVA
   - Define variants (size, variant, etc.)
   - Use TailwindCSS classes

5. **Tests**:
   - Create `ComponentName.test.tsx` with Vitest + React Testing Library
   - Test rendering, props, variants, and accessibility
   - Test user interactions

6. **Stories**:
   - Create `ComponentName.stories.tsx` following Storybook CSF format
   - Use `Components/*` meta structure
   - Create stories for: Default, Uncontrolled, Controlled, and other variants
   - One story per prop/feature

7. **Documentation**:
   - Create `ComponentName.doc.mdx` with sections in this order:
     - Title (H1)
     - Meta (link to stories)
     - Install
     - Import
     - Props table (using ArgTypes component)
     - Usage (Default, Uncontrolled, Controlled, others alphabetically)
     - Advanced Usage
     - Accessibility

8. **Exports**:
   - Create `index.ts` with named exports
   - Export component, types, and sub-components if compound

9. **For Compound Components**:
   - Use Object.assign pattern
   - Set display names for all sub-components
   - Document sub-components in ArgTypes

10. **Verify**:
    - Run `npm run lint` to check code quality
    - Run `npm run typecheck` to verify types
    - Run tests to ensure they pass
    - Check Storybook renders correctly

## Examples

Reference existing components in `packages/components/src/` for patterns:
- Simple component: `badge/`, `button/`
- Compound component: `card/`, `input/`, `accordion/`
- Complex component: `combobox/`, `select/`
