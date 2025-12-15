/* eslint-disable max-lines */
import { AlertDialog } from '@spark-ui/components/alert-dialog'
import { Button } from '@spark-ui/components/button'
import { Card } from '@spark-ui/components/card'
import { Drawer } from '@spark-ui/components/drawer'
import { FormField } from '@spark-ui/components/form-field'
import { Input } from '@spark-ui/components/input'
import { RadioGroup } from '@spark-ui/components/radio-group'
import { Tabs } from '@spark-ui/components/tabs'
import { ToastProvider, useToastManager } from '@spark-ui/components/toast'
import { Meta, StoryFn } from '@storybook/react-vite'
import { FormEvent, useRef, useState } from 'react'

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
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
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

        <Dialog.Content size="lg">
          <Dialog.Header>
            <Dialog.Title>Accessibilité</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Tabs defaultValue="tab1">
              <Tabs.List aria-labelledby="tasks-label">
                <Tabs.Trigger value="settings">Paramètres</Tabs.Trigger>
                <Tabs.Trigger value="information">Informations</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="settings">
                <p>Paramètre d'accessibilité</p>
              </Tabs.Content>
              <Tabs.Content value="information">
                <p>Informations</p>
              </Tabs.Content>
            </Tabs>
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

export const Fade: StoryFn = () => {
  return (
    <Dialog withFade>
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

        <Dialog.Content className="pb-xl" initialFocus={fieldToFocus}>
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

// Advanced Examples

export const NestedDialogs = () => {
  const [open, setOpen] = useState(false)

  const closeParentDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button>Account settings</Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay />

          <Dialog.Content size="lg">
            <Dialog.Header>
              <Dialog.Title>Account settings</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="gap-lg flex flex-col">
              <Dialog.Description>Manage your account settings and preferences.</Dialog.Description>
            </Dialog.Body>

            <Dialog.Footer className="gap-lg flex justify-end">
              <AlertDialog>
                <AlertDialog.Trigger asChild>
                  <Button intent="danger">Delete account</Button>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                  <AlertDialog.Overlay />

                  <AlertDialog.Content>
                    <AlertDialog.Header>
                      <AlertDialog.Title>Delete account</AlertDialog.Title>
                    </AlertDialog.Header>

                    <AlertDialog.Body>
                      <Card intent="danger" design="tinted">
                        <Card.Content>
                          <AlertDialog.Description>
                            Are you sure you want to delete your account? You can not undo this
                            action afterwards.
                          </AlertDialog.Description>
                        </Card.Content>
                      </Card>
                    </AlertDialog.Body>

                    <AlertDialog.Footer className="gap-lg flex justify-end">
                      <AlertDialog.Cancel asChild>
                        <Button intent="neutral" design="ghost">
                          Cancel
                        </Button>
                      </AlertDialog.Cancel>

                      <AlertDialog.Action asChild>
                        <Button intent="danger" onClick={closeParentDialog}>
                          Confirm deletion
                        </Button>
                      </AlertDialog.Action>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog>
              <Dialog.Close asChild>
                <Button intent="basic" design="outlined">
                  Close
                </Button>
              </Dialog.Close>
            </Dialog.Footer>

            <Dialog.CloseButton aria-label="Close dialog with nested drawer" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  )
}

export const SparkLayers = () => {
  const toastManager = useToastManager()

  const openToast = () => {
    toastManager.add({
      title: 'Toast with action',
      description:
        'This toast contains an action button and can be closed. Use F6 to access it with the keyboard.',
      timeout: 0,
      data: {
        isClosable: true,
        action: {
          close: true,
          label: 'Cancel',
          onClick: () => console.log('Action canceled'),
        },
      },
    })
  }

  return (
    <>
      <div className="bg-surface z-dropdown p-lg bottom-md right-md fixed shadow-md">
        This element should remain below the overlay
      </div>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Open dialog</Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay />

          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Notifications</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="gap-lg flex flex-col">
              <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
            </Dialog.Body>

            <Dialog.Footer className="gap-lg flex justify-end">
              <Drawer>
                <Drawer.Trigger asChild>
                  <Button intent="accent" design="tinted">
                    Customize
                  </Button>
                </Drawer.Trigger>

                <Drawer.Portal>
                  <Drawer.Overlay />

                  <Drawer.Content size="sm">
                    <Drawer.Header>
                      <Drawer.Title>Customize notifications</Drawer.Title>
                    </Drawer.Header>

                    <Drawer.Body className="gap-md flex flex-col">
                      <Drawer.Description>Review your settings here.</Drawer.Description>
                      <Button onClick={openToast}>Show toast</Button>
                      <Card intent="danger" design="tinted">
                        <Card.Content>
                          <p>
                            Danger zone - click on the button below to delete your notifications.
                          </p>
                          <AlertDialog>
                            <AlertDialog.Trigger asChild>
                              <Button intent="danger">Delete</Button>
                            </AlertDialog.Trigger>

                            <AlertDialog.Portal>
                              <AlertDialog.Overlay />

                              <AlertDialog.Content>
                                <AlertDialog.Header>
                                  <AlertDialog.Title>Delete notifications</AlertDialog.Title>
                                </AlertDialog.Header>

                                <AlertDialog.Body>
                                  <AlertDialog.Description>
                                    Are you sure? You can not undo this action afterwards.
                                  </AlertDialog.Description>
                                </AlertDialog.Body>

                                <AlertDialog.Footer className="gap-lg flex justify-end">
                                  <AlertDialog.Cancel asChild>
                                    <Button intent="neutral" design="ghost">
                                      Cancel
                                    </Button>
                                  </AlertDialog.Cancel>

                                  <AlertDialog.Action asChild>
                                    <Button intent="danger">Delete</Button>
                                  </AlertDialog.Action>
                                </AlertDialog.Footer>
                              </AlertDialog.Content>
                            </AlertDialog.Portal>
                          </AlertDialog>
                        </Card.Content>
                      </Card>
                    </Drawer.Body>

                    <Drawer.Footer className="gap-md flex justify-end">
                      <Drawer.Close asChild>
                        <Button intent="basic" design="outlined">
                          Close
                        </Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                    <Drawer.CloseButton aria-label="Close nested Drawer" />
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer>
              <Dialog.Close asChild>
                <Button intent="basic" design="outlined">
                  Close
                </Button>
              </Dialog.Close>
            </Dialog.Footer>

            <Dialog.CloseButton aria-label="Close dialog with nested drawer" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  )
}
