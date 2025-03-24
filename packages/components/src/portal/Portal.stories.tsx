import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Portal } from '.'

const meta: Meta<typeof Portal> = {
  title: 'Components/Portal',
  component: Portal,
  tags: ['others'],
}

export default meta

export const Usage: StoryFn = () => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)

  return (
    <div className="gap-lg flex">
      <div className="h-sz-160 bg-main-container p-lg text-on-main-container w-1/2 rounded-md">
        <p>Element is located here in the JSX...</p>
        <Portal container={portalContainer}>
          <p className="bg-surface p-md hover:bg-surface-hovered rounded-sm text-current">
            This element is wrapped by Portal.
          </p>
        </Portal>
      </div>

      <div
        className="h-sz-160 bg-support-container p-lg text-on-support-container w-1/2 rounded-md"
        ref={setPortalContainer}
      >
        <p>...but rendered here thanks to the Portal</p>
      </div>
    </div>
  )
}
