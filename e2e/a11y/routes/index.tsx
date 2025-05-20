import type { RouteObject } from 'react-router-dom'

import { a11yComponents, type A11yComponentsKey } from './components'
import { a11yElements } from './elements'

export const a11yRoutes: RouteObject[] = (Object.keys(a11yComponents) as A11yComponentsKey[]).map(
  componentName => ({
    path: `a11y/${componentName}`,
    Component: a11yElements[componentName],
  })
)
