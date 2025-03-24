import { pascalCase } from 'pascal-case'

export default ({ name }) => {
  const componentName = pascalCase(name)

  return `export { ${componentName} } from './${componentName}'
`
}
