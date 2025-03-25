import { camelCase } from 'camel-case'

export default ({ name, description }) => {
  const hookName = camelCase(name)

  return `import { Meta, Story } from '@storybook/blocks'
  import { ArgTypes } from '@storybook/blocks';

import { ${hookName} } from '.'

import * as stories from './${hookName}.stories'

<Meta title="Hooks/${hookName}" />

# ${hookName}

${description}

## Install

\`\`\`
npm install @spark-ui/${name}
\`\`\`

## Import

\`\`\`
import { ${hookName} } from "@spark-ui/${name}"
\`\`\`

## Usage

<ArgTypes of={${hookName}} />

\`\`\`jsx
import { ${hookName} } from "@spark-ui/${name}"

const Demo = () => {}
\`\`\`
`
}
