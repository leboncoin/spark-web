import { Meta, StoryFn } from '@storybook/react'
import { cx } from 'class-variance-authority'
import { PropsWithChildren, Ref, useState } from 'react'

import { Button } from '../button'
import { RadioGroup } from '../radio-group'
import { Popover } from '.'
import { type ContentProps } from './PopoverContent'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['overlays'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=4360-24470&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const ShowcaseContainer = ({
  children,
  className,
  ref,
}: PropsWithChildren<{
  className?: string
  ref?: Ref<HTMLDivElement>
}>) => (
  <div
    ref={ref}
    className={cx(
      'h-sz-240 border-md border-neutral bg-neutral-container p-lg flex items-center justify-center rounded-sm border-dashed',
      className
    )}
  >
    {children}
  </div>
)

export const Default: StoryFn = _args => {
  return (
    <ShowcaseContainer>
      <Popover>
        <Popover.Trigger asChild>
          <Button>Trigger popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content>
            <Popover.Header>Title</Popover.Header>
            <p>Are you sure you want to have that cookie now ?</p>
            <Popover.Arrow />
            <Popover.CloseButton aria-label="Close the popover" />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </ShowcaseContainer>
  )
}

export const Inset: StoryFn = _args => {
  return (
    <ShowcaseContainer>
      <Popover>
        <Popover.Trigger asChild>
          <Button>Trigger popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content inset>
            <img src="https://placehold.co/300x200/white/grey" alt="" />
            <Popover.Arrow />
            <Popover.CloseButton aria-label="Close the popover" />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </ShowcaseContainer>
  )
}

export const Intents: StoryFn = _args => {
  const intents = [
    'surface',
    'main',
    'support',
    'accent',
    'basic',
    'success',
    'alert',
    'danger',
    'info',
    'neutral',
  ] as const

  return (
    <div className="gap-md flex">
      {intents.map(intent => {
        return (
          <Popover key={intent} intent={intent}>
            <Popover.Trigger asChild>
              <Button intent={intent}>{intent}</Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content>
                <Popover.Header>{intent}</Popover.Header>
                <p>Are you sure you want to have that cookie now ?</p>
                <Popover.Arrow />
                <Popover.CloseButton aria-label="Close the popover" />
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        )
      })}
    </div>
  )
}

export const Uncontrolled: StoryFn = () => {
  return (
    <ShowcaseContainer>
      <Popover defaultOpen>
        <Popover.Trigger asChild>
          <Button>Open popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content onInteractOutside={e => e.preventDefault()}>
            <Popover.Header>Title</Popover.Header>
            <p>Are you sure you want to have that cookie now ?</p>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </ShowcaseContainer>
  )
}

export const Controlled: StoryFn = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="mb-lg gap-lg flex">
        <Button onClick={() => setOpen(true)}>Open popover</Button>
        <Button onClick={() => setOpen(false)}>Close popover</Button>
      </div>
      <ShowcaseContainer>
        <Popover open={open}>
          <Popover.Anchor asChild>
            <p>Popover is attached to this text (anchor)</p>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content onInteractOutside={() => setOpen(false)}>
              <Popover.Header>Title</Popover.Header>
              <p>Are you sure you want to have that cookie now ?</p>
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </ShowcaseContainer>
    </>
  )
}

export const Anchored: StoryFn = _args => {
  return (
    <ShowcaseContainer className="justify-between!">
      <Popover>
        <Popover.Trigger asChild>
          <Button>Trigger</Button>
        </Popover.Trigger>

        <Popover.Anchor asChild>
          <Button intent="support">Anchor element</Button>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content>
            <Popover.Header>Title</Popover.Header>
            <p>Are you sure you want to have that cookie now ?</p>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </ShowcaseContainer>
  )
}

export const MatchTriggerWidth: StoryFn = _args => {
  return (
    <ShowcaseContainer>
      <Popover open>
        <Popover.Trigger asChild>
          <Button>Check the width of this popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content matchTriggerWidth aria-label="Match Trigger Width Example">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </ShowcaseContainer>
  )
}

export const Boundaries: StoryFn = () => {
  const [boundaryContainer, setBoundaryContainer] = useState<HTMLDivElement | null>(null)

  return (
    <ShowcaseContainer ref={setBoundaryContainer} className="h-sz-240! w-sz-256!">
      <Popover>
        <Popover.Trigger asChild>
          <Button>Trigger popover</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content collisionBoundary={[boundaryContainer]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </ShowcaseContainer>
  )
}

export const Positionning: StoryFn = _args => {
  const [currentSide, setCurrentSide] = useState<ContentProps['side']>('bottom')
  const [currentAlign, setCurrentAlign] = useState<ContentProps['align']>('center')

  const handleChangeSide = (side: string) => {
    setCurrentSide(side as ContentProps['side'])
  }

  const handleChangeAlign = (align: string) => {
    setCurrentAlign(align as ContentProps['align'])
  }

  return (
    <div className="gap-lg flex flex-col">
      <div className="gap-lg flex">
        <p className="text-headline-2">Side:</p>
        <RadioGroup value={currentSide} onValueChange={handleChangeSide} orientation="horizontal">
          {['bottom', 'top', 'left', 'right'].map(side => (
            <RadioGroup.Radio key={side} value={side}>
              {side}
            </RadioGroup.Radio>
          ))}
        </RadioGroup>
      </div>

      <div className="gap-lg flex">
        <p className="text-headline-2">Align:</p>
        <RadioGroup value={currentAlign} onValueChange={handleChangeAlign} orientation="horizontal">
          {['start', 'center', 'end'].map(align => (
            <RadioGroup.Radio key={align} value={align}>
              {align}
            </RadioGroup.Radio>
          ))}
        </RadioGroup>
      </div>

      <ShowcaseContainer>
        <Popover open>
          <Popover.Trigger asChild>
            <Button>Trigger popover</Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content side={currentSide} align={currentAlign}>
              <p>Are you sure you want to have that cookie now ?</p>
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </ShowcaseContainer>
    </div>
  )
}
