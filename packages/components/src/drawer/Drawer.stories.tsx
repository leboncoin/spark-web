import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Button } from '../button'
import { RadioGroup } from '../radio-group'
import { Drawer, type DrawerContentProps } from '.'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['overlays'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=11237-18028&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Usage: StoryFn = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button>Terms & conditions</Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Terms & conditions</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <Drawer.Description>Please review our terms and conditions</Drawer.Description>

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
          </Drawer.Body>

          <Drawer.Footer className="gap-md flex justify-between">
            <Button intent="basic" design="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <div className="gap-md flex">
              <Button intent="basic" design="outlined" onClick={() => setOpen(false)}>
                Disagree
              </Button>
              <Button>Submit</Button>
            </div>
          </Drawer.Footer>

          <Drawer.CloseButton aria-label="Close edit profile" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  )
}

export const Sizes = () => {
  const [size, setSize] = useState<ExcludeNull<DrawerContentProps>['size']>('md')
  const [open, setOpen] = useState(false)

  return (
    <div>
      <RadioGroup
        className="mb-lg gap-md flex"
        value={size}
        orientation="horizontal"
        onValueChange={value => setSize(value as ExcludeNull<DrawerContentProps>['size'])}
      >
        <RadioGroup.Radio value="sm">Small</RadioGroup.Radio>
        <RadioGroup.Radio value="md">Medium</RadioGroup.Radio>
        <RadioGroup.Radio value="lg">Large</RadioGroup.Radio>
        <RadioGroup.Radio value="fluid">Fluid</RadioGroup.Radio>
        <RadioGroup.Radio value="fullscreen">Fullscreen</RadioGroup.Radio>
      </RadioGroup>

      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button>Open drawer</Button>
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay />

          <Drawer.Content size={size}>
            <Drawer.Header>
              <Drawer.Title>Edit size</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body className="gap-lg flex flex-col">
              <Drawer.Description>Please select a drawer size</Drawer.Description>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

              {size !== 'fluid' && (
                <>
                  {Array.from({ length: 5 }, (_, index) => (
                    <p key={index}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  ))}
                </>
              )}
            </Drawer.Body>

            <Drawer.Footer className="gap-md flex justify-end">
              <Button intent="neutral" design="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button>Submit</Button>
            </Drawer.Footer>

            <Drawer.CloseButton aria-label="Close edit size" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    </div>
  )
}

export const Inset: StoryFn = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay />

        <Drawer.Content size="sm">
          <Drawer.Header>
            <Drawer.Title>Edit inset</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body inset>
            <img src="https://placehold.co/480x800" alt="" />
          </Drawer.Body>

          <Drawer.Footer className="gap-md flex justify-end">
            <Button intent="neutral" design="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Submit</Button>
          </Drawer.Footer>

          <Drawer.CloseButton aria-label="Close edit profile" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  )
}

export const Side = () => {
  const [side, setSide] = useState<ExcludeNull<DrawerContentProps>['side']>('right')
  const [open, setOpen] = useState(false)

  return (
    <>
      <RadioGroup
        className="mb-lg gap-md flex"
        value={side}
        orientation="horizontal"
        onValueChange={value => setSide(value as ExcludeNull<DrawerContentProps>['side'])}
      >
        <RadioGroup.Radio value="right">Right</RadioGroup.Radio>
        <RadioGroup.Radio value="left">Left</RadioGroup.Radio>
        <RadioGroup.Radio value="top">Top</RadioGroup.Radio>
        <RadioGroup.Radio value="bottom">Bottom</RadioGroup.Radio>
      </RadioGroup>

      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button>Open drawer</Button>
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay />

          <Drawer.Content side={side} size="sm">
            <Drawer.Header>
              <Drawer.Title>Edit side</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body className="gap-lg flex flex-col">
              <Drawer.Description>Please select a drawer side</Drawer.Description>

              {Array.from({ length: 10 }, (_, index) => (
                <p key={index}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              ))}
            </Drawer.Body>

            <Drawer.Footer className="gap-md flex justify-end">
              <Button intent="neutral" design="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button>Submit</Button>
            </Drawer.Footer>

            <Drawer.CloseButton aria-label="Close edit side" />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    </>
  )
}
