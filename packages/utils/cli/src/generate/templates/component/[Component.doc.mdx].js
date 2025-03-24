import { pascalCase } from 'pascal-case'

export default ({ name, description }) => {
  const componentName = pascalCase(name)

  return `import { Meta, Canvas } from '@storybook/blocks'
import { ArgTypes } from '@docs/helpers/ArgTypes'

import { ${componentName} } from '.'

import * as stories from './${componentName}.stories'

<Meta of={stories} />

# ${componentName}

${description}

## Install

\`\`\`sh
npm install @spark-ui/${name}
\`\`\`

## Import

\`\`\`tsx
import { ${componentName} } from "@spark-ui/${name}"
\`\`\`

## Props

<ArgTypes of={${componentName}} />

## Variants
<Canvas of={stories.Default} />
`
}
