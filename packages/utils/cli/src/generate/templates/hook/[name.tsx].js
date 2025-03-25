import { camelCase } from 'camel-case'

export default ({ name }) => {
  const hookName = camelCase(name)

  return `export function ${hookName}() {
  return null
}
`
}
