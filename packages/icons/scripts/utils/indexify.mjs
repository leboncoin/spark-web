const indexify = componentsMap =>
  `${Array.from(componentsMap.entries())
    .map(([name]) => `export { ${name} } from './icons/${name}'`)
    .join('\n')}\n`

export default indexify
