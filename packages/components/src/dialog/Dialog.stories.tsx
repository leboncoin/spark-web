import { Meta, StoryFn } from '@storybook/react'
import { FormEvent, useRef, useState } from 'react'

import { Button } from '../button'
import { FormField } from '../form-field'
import { Input } from '../input'
import { RadioGroup } from '../radio-group'
import { Dialog, type DialogContentProps } from '.'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['overlays'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=55901-24848&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Edit profile</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content size="sm">
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Dialog.Description>
              Make changes to your profile here. Click save when you are done.
            </Dialog.Description>

            <p>Lorem ipsum dolor sit amet</p>
          </Dialog.Body>

          <Dialog.Footer className="gap-md flex justify-end">
            <Dialog.Close asChild>
              <Button>Close</Button>
            </Dialog.Close>
          </Dialog.Footer>

          <Dialog.CloseButton aria-label="Close edit profile" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export const Controlled: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button>Edit profile</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Dialog.Description>
              Make changes to your profile here. Click save when you are done.
            </Dialog.Description>

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
          </Dialog.Body>

          <Dialog.Footer className="gap-md flex justify-end">
            <Dialog.Close asChild>
              <Button>Close</Button>
            </Dialog.Close>
          </Dialog.Footer>

          <Dialog.CloseButton aria-label="Close edit profile" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export const Sizes = () => {
  const [size, setSize] = useState<ExcludeNull<DialogContentProps>['size']>('md')

  const handleValueChange = (value: string) => {
    setSize(value as ExcludeNull<DialogContentProps>['size'])
  }

  return (
    <Dialog>
      <div className="gap-md flex">
        <Dialog.Trigger asChild>
          <Button>Open</Button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content size={size}>
          <Dialog.Header>
            <Dialog.Title>Edit size</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body className="gap-lg flex flex-col">
            <Dialog.Description>Please select a dialog size</Dialog.Description>

            <RadioGroup className="gap-md flex" value={size} onValueChange={handleValueChange}>
              <RadioGroup.Radio value="sm">Small</RadioGroup.Radio>
              <RadioGroup.Radio value="md">Medium</RadioGroup.Radio>
              <RadioGroup.Radio value="lg">Large</RadioGroup.Radio>
              <RadioGroup.Radio value="fullscreen">Fullscreen</RadioGroup.Radio>
            </RadioGroup>
          </Dialog.Body>

          <Dialog.Footer className="gap-md flex justify-end">
            <Dialog.Close asChild>
              <Button>Close</Button>
            </Dialog.Close>
          </Dialog.Footer>

          <Dialog.CloseButton aria-label="Close edit size" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export const Inset = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content size="sm">
          <Dialog.Header>
            <Dialog.Title>Inset example</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body inset className="gap-lg flex flex-col">
            <img src="https://placehold.co/600x400" alt="" />
            <p className="px-md">The image above is taking up the full width.</p>
          </Dialog.Body>

          <Dialog.Footer className="gap-md flex justify-end">
            <Button intent="neutral" design="outlined" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Dialog.Footer>

          <Dialog.CloseButton aria-label="Close dialog" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export const Form = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button>Create account</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content>
          <form onSubmit={handleSubmit}>
            <Dialog.Header>
              <Dialog.Title>Create account</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="gap-lg flex flex-col">
              <FormField name="pseudo" isRequired className="flex-1">
                <FormField.Label>Pseudo</FormField.Label>
                <Input placeholder="Luke" />
              </FormField>
            </Dialog.Body>

            <Dialog.Footer className="gap-md flex justify-end">
              <Button type="submit">Submit</Button>
            </Dialog.Footer>
          </form>

          <Dialog.CloseButton aria-label="Close dialog" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export const ForwardFocus = () => {
  const fieldToFocus = useRef<HTMLInputElement>(null)

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Forward focus</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content
          className="pb-xl"
          onOpenAutoFocus={e => {
            e.preventDefault()
            fieldToFocus.current?.focus()
          }}
        >
          <Dialog.Header>
            <Dialog.Title>Forward focus</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body className="gap-lg flex flex-col">
            <Input placeholder="First field" />
            <Input placeholder="Second field (focused)" ref={fieldToFocus} />
            <Input placeholder="Third field" />
          </Dialog.Body>

          <Dialog.CloseButton aria-label="Close dialog" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
