import { Switch } from '@spark-ui/components/switch'
import { Check } from '@spark-ui/icons/Check'
import { FavoriteOutline } from '@spark-ui/icons/FavoriteOutline'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { cx } from 'class-variance-authority'
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
  'surfaceInverse',
]
const designs: ButtonProps['design'][] = ['filled', 'outlined', 'tinted', 'contrast', 'ghost']
const shapes: ButtonProps['shape'][] = ['rounded', 'square', 'pill']

export const Default: StoryObj = {
  render: _args => {
    return <Button>Default button</Button>
  },
}

export const Sizes: StoryFn = _args => (
  <div className="gap-lg flex flex-wrap items-center">
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
  <div className="gap-lg flex flex-wrap items-center">
    {shapes.map(shape => {
      return (
        <Button key={shape} shape={shape}>
          {shape} button
        </Button>
      )
    })}
  </div>
)

export const DesignAndIntentTable: StoryFn = _args => {
  const [underline, setUnderline] = useState(false)

  return (
    <div className="gap-lg flex flex-col">
      <Switch checked={underline} onClick={() => setUnderline(!underline)}>
        Show underline
      </Switch>
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="border-outline p-md bg-surface text-on-surface border">
              Intent \ Design
            </th>
            {designs.map(design => (
              <th key={design} className="border-outline p-md bg-surface text-on-surface border">
                {design}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {intents.map(intent => (
            <tr
              key={intent}
              className={cx({
                'bg-overlay/dim-3': intent === 'surface',
                'bg-overlay/dim-1': intent === 'surfaceInverse',
              })}
            >
              <td className="border-outline p-md bg-surface text-on-surface border">{intent}</td>
              {designs.map(design => (
                <td key={`${intent}-${design}`} className={'border-outline p-lg border'}>
                  <Button intent={intent} design={design} underline={underline}>
                    Click me
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Disabled: StoryFn = _args => <Button disabled>Disabled button</Button>

export const Icons: StoryFn = _args => (
  <div className="gap-lg flex flex-wrap">
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
