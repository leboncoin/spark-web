# Component Development Guidelines

## File Structure
Each component follows this structure:
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

## Component Patterns

### 1. Polymorphic Components
Use `asChild` prop for polymorphic behavior:
```tsx
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean
}
```

### 2. Styling with CVA
Use Class Variance Authority for variant-based styling:
```tsx
import { cva } from 'class-variance-authority'

const buttonStyles = cva('base-classes', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...' }
  }
})
```

### 3. Accessibility First
- All components must be accessible (WCAG 2.1 AA)
- Use proper ARIA attributes
- Include `data-spark-component` attributes
- Test with `@testing-library/react` and `@axe-core/playwright`

### 4. Compound Components
For complex components, use compound pattern with Object.assign:
```tsx
// Root component
export const Card = ({ children, ...props }) => { ... }

// Sub-components
export const CardContent = ({ children, ...props }) => { ... }
export const CardHeader = ({ children, ...props }) => { ... }

// Compound component assembly
export const Card: typeof Root & {
  Content: typeof CardContent
  Header: typeof CardHeader
} = Object.assign(Root, {
  Content: CardContent,
  Header: CardHeader,
})

// Set display names
Card.displayName = 'Card'
CardContent.displayName = 'Card.Content'
CardHeader.displayName = 'Card.Header'
```

## Testing Requirements

### Unit Tests
- Use Vitest + React Testing Library
- Test all props and variants
- Test accessibility features
- Test user interactions

### E2E Tests
- Use Playwright for visual regression
- Test accessibility with `@axe-core/playwright`
- Test keyboard navigation

### Test Structure
```tsx
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

## Documentation Standards

Spark follows specific documentation guidelines detailed in [WritingStories.mdx](./documentation/contributing/WritingStories.mdx).

### Storybook Stories
- Use `*.stories.tsx` extension
- One story per prop/feature (avoid complex stories mixing many props)
- Use `Components/*` meta structure
- Avoid `_args` when using JS logic (`useState`, etc.)
- Include all variants and states
- Include accessibility testing

### MDX Documentation
Each component must have a `*.doc.mdx` file with these sections in order:

1. **Title** - H1 heading with component description
2. **Meta** - Link to stories using `<Meta of={stories} />`
3. **Install** - Installation instructions with `npm install @spark-ui/components`
4. **Import** - Import examples showing how to use the component
5. **Props table** - Use custom `ArgTypes` component (supports compound components)
6. **Usage** - Examples in specific order:
   - Default (minimal common case)
   - Uncontrolled (stateful with internal state)
   - Controlled (stateless with props)
   - Other examples in alphabetical order
7. **Advanced Usage** - Complex examples, combinations, edge cases
8. **Accessibility** - Keyboard interactions and a11y requirements

### Story Order Guidelines
- Each story should showcase a single prop/feature
- Use explicit descriptions before interactive canvas
- Keep "Usage" section clean and focused on common usage
- Move advanced examples to "Advanced Usage" section
