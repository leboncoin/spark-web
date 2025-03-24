import { StoryLabel } from '@docs/helpers/StoryLabel'
import { LikeFill } from '@spark-ui/icons/LikeFill'
import { LikeOutline } from '@spark-ui/icons/LikeOutline'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from '../checkbox'
import { Icon } from '../icon'
import { IconButton, IconButtonProps } from '.'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['action'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=1835-22582&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const sizes: IconButtonProps['size'][] = ['sm', 'md', 'lg']
const intents: IconButtonProps['intent'][] = [
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
const designs: IconButtonProps['design'][] = ['filled', 'outlined', 'tinted', 'ghost', 'contrast']
const shapes: IconButtonProps['shape'][] = ['rounded', 'square', 'pill']

const icon = (
  <Icon>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.91958 20.1667C8.73748 20.1667 8.56045 20.1323 8.38847 20.0635C8.21649 19.9947 8.05969 19.8915 7.91806 19.7539L2.42489 14.4176C2.14163 14.1425 2 13.8083 2 13.4152C2 13.0222 2.14163 12.688 2.42489 12.4129C2.70814 12.1377 3.04704 12.0001 3.44158 12.0001C3.83612 12.0001 4.18513 12.1377 4.48862 12.4129L8.91958 16.7173L19.5417 6.42797C19.825 6.1528 20.1639 6.0103 20.5584 6.00048C20.953 5.99065 21.2919 6.13315 21.5751 6.42797C21.8584 6.70313 22 7.03727 22 7.43036C22 7.82346 21.8584 8.15759 21.5751 8.43276L9.92109 19.7539C9.77946 19.8915 9.62266 19.9947 9.45068 20.0635C9.27871 20.1323 9.10167 20.1667 8.91958 20.1667Z" />
    </svg>
  </Icon>
)

export const Default: StoryFn = _args => <IconButton aria-label="Button">{icon}</IconButton>

export const Sizes: StoryFn = _args => (
  <div className="gap-lg flex">
    {sizes.map(size => {
      return (
        <div key={size} className="text-center">
          <StoryLabel className="mx-auto">{size}</StoryLabel>
          <IconButton size={size} aria-label={`${size} button`}>
            {icon}
          </IconButton>
        </div>
      )
    })}
  </div>
)

export const Shapes: StoryFn = _args => (
  <div className="gap-lg flex">
    {shapes.map(shape => {
      return (
        <div key={shape} className="text-center">
          <StoryLabel className="mx-auto">{shape}</StoryLabel>
          <IconButton shape={shape} aria-label={`${shape} button`}>
            {icon}
          </IconButton>
        </div>
      )
    })}
  </div>
)

export const Disabled: StoryFn = _args => (
  <IconButton aria-label="Disabled button" disabled>
    {icon}
  </IconButton>
)

export const Intent: StoryFn = _args => (
  <div className="gap-lg flex">
    {intents.map(intent => (
      <div key={intent} className="text-center">
        <StoryLabel className="mx-auto">{intent}</StoryLabel>
        <IconButton intent={intent} aria-label={`${intent} button`}>
          {icon}
        </IconButton>
      </div>
    ))}
  </div>
)

export const Design: StoryFn = _args => (
  <div className="gap-lg flex">
    {designs.map(design => (
      <div key={design} className="text-center">
        <StoryLabel className="mx-auto">{design}</StoryLabel>
        <IconButton design={design} aria-label={`${design} button`}>
          {icon}
        </IconButton>
      </div>
    ))}
  </div>
)

export const Loading: StoryFn = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="gap-lg flex flex-col">
      <Checkbox checked={isLoading} onClick={() => setIsLoading(!isLoading)}>
        Toggle loading state
      </Checkbox>

      <div className="gap-md flex flex-wrap">
        <div>
          <IconButton aria-label="Submit" isLoading={isLoading} loadingLabel="Loading...">
            {icon}
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export const Link: StoryFn = _args => (
  <div className="gap-md flex">
    <IconButton aria-label="Link" asChild>
      <a href="/">{icon}</a>
    </IconButton>
  </div>
)

export const Toggle: StoryFn = () => {
  const [pressed, setPressed] = useState(false)
  const toggle = () => setPressed(!pressed)

  return (
    <IconButton
      aria-label="Add to favorites"
      aria-pressed={pressed}
      onClick={toggle}
      design={pressed ? 'filled' : 'outlined'}
    >
      <Icon>{pressed ? <LikeFill /> : <LikeOutline />}</Icon>
    </IconButton>
  )
}
