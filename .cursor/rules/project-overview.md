# Project Overview

**Spark UI** is Adevinta's React Design System focused on modularity and accessibility. It provides a comprehensive set of React components with semantic theming based on TailwindCSS.

- **Repository**: [leboncoin/spark-web](https://github.com/leboncoin/spark-web)
- **Documentation**: [sparkui.vercel.app](https://sparkui.vercel.app)
- **License**: MIT

## Architecture

### Monorepo Structure
- **Package Manager**: NPM with workspaces
- **Build Tool**: Vite + TSUP
- **Monorepo Management**: Nx (with Nx Release for versioning and publishing)
- **Node Version**: 22.x

### Packages
```
packages/
├── components/     # Main React components library
├── hooks/         # Custom React hooks
├── icons/         # Icon components and SVG assets
└── utils/         # Utility packages (internal-utils, theme-utils)
```

### Key Technologies
- **React**: 19.1.1
- **TypeScript**: 5.9.2
- **TailwindCSS**: 4.1.1
- **Storybook**: 9.1.8 (for component development)
- **Vitest**: 3.2.4 (for testing)
- **Playwright**: 1.55.1 (for E2E testing)
