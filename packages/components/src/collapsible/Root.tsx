import { Collapsible } from '@base-ui/react/collapsible'
import { type ComponentProps } from 'react'

export interface RootProps extends ComponentProps<typeof Collapsible.Root> {}

export const Root = ({ children, ...props }: RootProps) => {
  return (
    <Collapsible.Root data-spark-component="collapsible" {...props}>
      {children}
    </Collapsible.Root>
  )
}

Root.displayName = 'Collapsible'
