---
name: create-storybook-docs
description: Create or update Storybook stories and documentation for a Spark UI component. Use when the user wants to add stories, update documentation, or improve component documentation in Storybook.
---

# Create Storybook Documentation

Create or update Storybook stories and MDX documentation for Spark UI components.

## When to Use

- User wants to add Storybook stories
- User wants to update component documentation
- Component is missing stories or documentation
- User mentions "stories", "storybook", or "documentation"

## Instructions

### Stories File (`ComponentName.stories.tsx`)

1. **Meta Definition**:
   ```tsx
   const meta: Meta<typeof ComponentName> = {
     title: 'Components/ComponentName',
     component: ComponentName,
   }
   export default meta
   ```

2. **Story Guidelines**:
   - Use `*.stories.tsx` extension
   - One story per prop/feature (avoid mixing many props)
   - Use `Components/*` meta structure
   - Avoid `_args` when using JS logic (`useState`, etc.)
   - Include all variants and states

3. **Required Stories** (in order):
   - `Default`: Minimal common case
   - `Uncontrolled`: Stateful with internal state
   - `Controlled`: Stateless with props
   - Other variants alphabetically

### Documentation File (`ComponentName.doc.mdx`)

1. **Sections Order** (must follow this exact order):
   - **Title**: H1 heading with component description
   - **Meta**: Link to stories using `<Meta of={stories} />`
   - **Install**: Installation instructions
   - **Import**: Import examples
   - **Props table**: Use custom `ArgTypes` component
   - **Usage**: Examples in specific order (Default, Uncontrolled, Controlled, others alphabetically)
   - **Advanced Usage**: Complex examples and edge cases
   - **Accessibility**: Keyboard interactions and a11y requirements

2. **Usage Section Format**:
   ```mdx
   ## Usage

   ### Default
   <Canvas of={stories.Default} />

   ### Uncontrolled
   Description of uncontrolled usage.
   <Canvas of={stories.Uncontrolled} />

   ### Controlled
   Description of controlled usage.
   <Canvas of={stories.Controlled} />
   ```

3. **For Compound Components**:
   - Use `ArgTypes` with `subcomponents` prop
   - Document each sub-component separately

## Reference

See `documentation/contributing/WritingStories.mdx` for complete guidelines.

## Examples

Reference existing stories in `packages/components/src/*/ComponentName.stories.tsx` and `ComponentName.doc.mdx`.
