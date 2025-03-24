import { camelCase } from 'change-case'

const tagify = componentsMap =>
  `${Array.from(componentsMap.entries())
    .map(([name]) => `export { tags as ${camelCase(`${name}Tags`)} } from './icons/${name}'`)
    .join('\n')}\n`

export default tagify
