import { Source } from '@storybook/addon-docs/blocks'
import { useDarkMode } from '@vueless/storybook-dark-mode'
import { type ComponentProps, useState } from 'react'

import { Button } from '../button'
import { Collapsible } from '../collapsible'

type StoryRef = NonNullable<ComponentProps<typeof Source>['of']>

export interface TableDocSourceCollapsibleProps {
  of: StoryRef
}

export function TableDocSourceCollapsible({ of: storyRef }: TableDocSourceCollapsibleProps) {
  const [open, setOpen] = useState(false)
  const isDarkDocs = useDarkMode()

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="gap-md flex flex-col">
      <Collapsible.Trigger asChild>
        <Button type="button" intent="neutral" design="ghost" underline className="m-md self-start">
          {open ? 'Hide code' : 'View source'}
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Source of={storyRef} dark={isDarkDocs} />
      </Collapsible.Content>
    </Collapsible>
  )
}
