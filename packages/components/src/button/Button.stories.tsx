import { Check } from '@spark-ui/icons/Check'
import { FavoriteOutline } from '@spark-ui/icons/FavoriteOutline'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { type ComponentProps, useState } from 'react'

import { Checkbox } from '../checkbox'
import { Icon } from '../icon'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['action'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=2340-22557&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

type ButtonProps = ComponentProps<typeof Button>

const sizes: ButtonProps['size'][] = ['sm', 'md', 'lg']
const intents: ButtonProps['intent'][] = [
  'main',
  'support',
  'accent',
  'basic',
  'success',
  'alert',
  'danger',
  'info',
  'neutral',
  'surface',
]
const designs: ButtonProps['design'][] = ['filled', 'outlined', 'tinted', 'ghost', 'contrast']
const shapes: ButtonProps['shape'][] = ['rounded', 'square', 'pill']

export const Default: StoryObj = {
  render: _args => <Button>Default button</Button>,
}

export const Sizes: StoryFn = _args => (
  <div className="gap-md flex flex-wrap items-center">
    {sizes.map(size => {
      return (
        <Button key={size} size={size}>
          Button {size}
        </Button>
      )
    })}
  </div>
)

export const Shapes: StoryFn = _args => (
  <div className="gap-md flex flex-wrap items-center">
    {shapes.map(shape => {
      return (
        <Button key={shape} shape={shape}>
          {shape} button
        </Button>
      )
    })}
  </div>
)

export const Disabled: StoryFn = _args => <Button disabled>Disabled button</Button>

export const Design: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    {designs.map(design => (
      <Button key={design} design={design}>
        {design} button
      </Button>
    ))}
  </div>
)

export const Intent: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    {intents.map(intent => (
      <Button key={intent} intent={intent}>
        {intent} button
      </Button>
    ))}
  </div>
)

export const Icons: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    <Button>
      Button
      <Icon>
        <FavoriteOutline />
      </Icon>
    </Button>
    <Button>
      <Icon>
        <FavoriteOutline />
      </Icon>
      Button
    </Button>
    <Button>
      <Icon>
        <FavoriteOutline />
      </Icon>
      Button
      <Icon>
        <Check />
      </Icon>
    </Button>
  </div>
)

export const Loading: StoryFn = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="gap-lg flex flex-col items-start">
      <Checkbox checked={isLoading} onClick={() => setIsLoading(!isLoading)}>
        Toggle loading state
      </Checkbox>

      <Button isLoading={isLoading} loadingLabel="Loading...">
        <Icon>
          <FavoriteOutline />
        </Icon>
        Button (width is preserved)
      </Button>
    </div>
  )
}

export const LoadingWithText: StoryFn = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="gap-lg flex flex-col items-start">
      <Checkbox checked={isLoading} onClick={() => setIsLoading(!isLoading)}>
        Toggle loading state
      </Checkbox>

      <Button isLoading={isLoading}>
        <Icon>
          <FavoriteOutline />
        </Icon>
        Button with long text
      </Button>
    </div>
  )
}

export const Link: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    <Button asChild>
      <a href="/">Button as a link</a>
    </Button>
  </div>
)

export const Toggle: StoryFn = () => {
  const [pressed, setPressed] = useState(false)
  const toggle = () => setPressed(!pressed)

  return (
    <Button aria-pressed={pressed} onClick={toggle} design={pressed ? 'filled' : 'outlined'}>
      Toggle button
      {pressed && (
        <Icon>
          <Check />
        </Icon>
      )}
    </Button>
  )
}
