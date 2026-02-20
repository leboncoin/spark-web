import { Meta, StoryFn } from '@storybook/react-vite'
import { useRef, useState } from 'react'

import { Button } from '../button'
import { Input } from '../input'
import { AlertDialog } from '.'

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['overlays'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=10859-1722&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Usage: StoryFn = _args => {
  return (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button intent="danger" />}>Delete</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay />

        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete account</AlertDialog.Title>
          </AlertDialog.Header>

          <AlertDialog.Body>
            <AlertDialog.Description>
              Are you sure? You can not undo this action afterwards.
            </AlertDialog.Description>
          </AlertDialog.Body>

          <AlertDialog.Footer className="gap-lg flex justify-end">
            <AlertDialog.Cancel render={<Button intent="neutral" design="ghost" />}>
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action render={<Button intent="danger" />}>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}

export const Controlled: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog.Trigger render={<Button intent="danger" />}>Delete</AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay />

          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Delete account</AlertDialog.Title>
            </AlertDialog.Header>

            <AlertDialog.Body>
              Are you sure? You can not undo this action afterwards.
            </AlertDialog.Body>

            <AlertDialog.Footer className="gap-lg flex justify-end">
              <AlertDialog.Cancel render={<Button intent="neutral" design="ghost" />}>
                Cancel
              </AlertDialog.Cancel>

              <AlertDialog.Action render={<Button intent="danger" />}>Delete</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  )
}

export const Fade: StoryFn = () => {
  return (
    <AlertDialog withFade>
      <AlertDialog.Trigger render={<Button intent="danger" />}>Delete</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay />

        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete account</AlertDialog.Title>
          </AlertDialog.Header>

          <AlertDialog.Body>
            <AlertDialog.Description>
              Are you sure? You can not undo this action afterwards.
            </AlertDialog.Description>

            {Array.from({ length: 10 }, (_, index) => (
              <p key={index}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            ))}
          </AlertDialog.Body>

          <AlertDialog.Footer className="gap-lg flex justify-end">
            <AlertDialog.Cancel render={<Button intent="neutral" design="ghost" />}>
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action render={<Button intent="danger" />}>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}

export const Inset: StoryFn = () => {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={<Button intent="danger" />}>Delete</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay />

        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete account</AlertDialog.Title>
          </AlertDialog.Header>

          <AlertDialog.Body inset className="gap-lg flex flex-col">
            <img src="https://placehold.co/600x400" alt="" />
            <p className="px-md">The image above is taking up the full width.</p>
          </AlertDialog.Body>

          <AlertDialog.Footer className="gap-lg flex justify-end">
            <AlertDialog.Cancel render={<Button intent="neutral" design="ghost" />}>
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action render={<Button intent="danger" />}>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}

export const ForwardFocus: StoryFn = () => {
  const fieldToFocus = useRef<HTMLInputElement>(null)

  return (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button />}>Forward focus</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay />

        <AlertDialog.Content initialFocus={fieldToFocus}>
          <AlertDialog.Header>
            <AlertDialog.Title>Forward focus</AlertDialog.Title>
          </AlertDialog.Header>

          <AlertDialog.Body className="gap-lg flex flex-col">
            <Input placeholder="First field" />
            <Input placeholder="Second field (focused)" ref={fieldToFocus} />
            <Input placeholder="Third field" />
          </AlertDialog.Body>

          <AlertDialog.Footer className="gap-lg flex justify-end">
            <AlertDialog.Cancel render={<Button intent="neutral" design="ghost" />}>
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action render={<Button intent="danger" />}>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
