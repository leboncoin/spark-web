import { pascalCase } from 'pascal-case'

export default ({ name }) => {
  const componentName = pascalCase(name)

  return `import { ComponentPropsWithRef, PropsWithChildren } from 'react'

export type ${componentName}Props = ComponentPropsWithRef<'div'>

export const ${componentName} = ({ ref, ...props }: PropsWithChildren<${componentName}Props>) => {
  return <div ref={ref} {...props} />
}
`
}
