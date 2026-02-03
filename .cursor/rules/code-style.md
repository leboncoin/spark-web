# Code Style

## TypeScript
- Use strict TypeScript configuration
- Prefer interfaces over types for component props
- Use proper generic constraints
- Export types when needed

## Naming Conventions
- Components: PascalCase (`Button`, `CardContent`)
- Files: PascalCase for components, camelCase for utilities
- Props: camelCase
- CSS classes: kebab-case (handled by TailwindCSS)

## Import/Export
- Use named exports for components
- Group imports: external → internal → relative
- Use `index.ts` for clean public API

## Development Workflow

### Essential Commands
```bash
npm run build:watch          # Build packages in watch mode
npm run storybook:start      # Start Storybook dev server
npm run test:ui              # Run tests in watch mode
npm run lint                 # ESLint check
npm run test:a11y            # Run accessibility tests
```
