import { pascalCase } from 'pascal-case'

export default ({ name }) => {
  const componentName = pascalCase(name)

  return `
    import { Meta, StoryFn } from '@storybook/react'
    import { ${componentName} } from '.'

    const meta: Meta<typeof ${componentName}> = {
      title: 'Experimental/${componentName}',
      component: ${componentName},
    }

    export default meta

    export const Default: StoryFn = _args => (
      <${componentName}>Hello World!</${componentName}>
    )
  `
}
