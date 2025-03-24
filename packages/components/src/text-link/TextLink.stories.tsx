import { Link as LinkSVG } from '@spark-ui/icons/Link'
import { Meta, StoryFn } from '@storybook/react'

import { Icon } from '../icon'
import { TextLink, type TextLinkProps } from '.'

const meta: Meta<typeof TextLink> = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['action'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=8718-2496&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = _args => {
  return (
    <p>
      You should learn more about{' '}
      <TextLink href="https://en.wikipedia.org/wiki/Kitten" target="_blank">
        kitten
      </TextLink>{' '}
      and{' '}
      <TextLink href="https://en.wikipedia.org/wiki/Puppy" target="_blank">
        puppies
      </TextLink>
      .
    </p>
  )
}

export const Bold: StoryFn = _args => {
  return (
    <p>
      You should learn more about{' '}
      <TextLink href="https://en.wikipedia.org/wiki/Kitten" target="_blank" bold>
        kitten
      </TextLink>
      .
    </p>
  )
}

const intents: TextLinkProps['intent'][] = [
  'main',
  'support',
  'accent',
  'basic',
  'success',
  'alert',
  'danger',
  'info',
  'neutral',
]

export const CurrentIntent: StoryFn = _args => {
  const cardColors = [
    'bg-main text-on-main',
    'bg-main-container text-on-main-container',
    'bg-support text-on-support',
    'bg-support-container text-on-support-container',
    'bg-accent text-on-accent',
    'bg-accent-container text-on-accent-container',
    'bg-basic text-on-basic',
    'bg-basic-container text-on-basic-container',
    'bg-success text-on-success',
    'bg-success-container text-on-success-container',
    'bg-alert text-on-alert',
    'bg-alert-container text-on-alert-container',
    'bg-danger text-on-danger',
    'bg-danger-container text-on-danger-container',
    'bg-info text-on-info',
    'bg-info-container text-on-info-container',
    'bg-neutral text-on-neutral',
    'bg-neutral-container text-on-neutral-container',
    'bg-surface text-on-surface',
  ]

  return (
    <div className="flex flex-row flex-wrap">
      {cardColors.map((colorStyles, i) => (
        <p key={i} className={'p-md inline ' + colorStyles}>
          Current{' '}
          <TextLink href="https://en.wikipedia.org/wiki/Kitten" target="_blank">
            link
          </TextLink>
          .
        </p>
      ))}
    </div>
  )
}

export const Intents: StoryFn = _args => {
  return (
    <div className="gap-md flex flex-col">
      {intents.map(intent => (
        <p key={intent}>
          {intent}{' '}
          <TextLink intent={intent} href="https://en.wikipedia.org/wiki/Kitten" target="_blank">
            link
          </TextLink>
          .
        </p>
      ))}
    </div>
  )
}

export const Sizes: StoryFn = _args => {
  return (
    <div className="gap-md flex flex-col">
      {['text-caption', 'text-body-1', 'text-headline-1'].map((textSize, i) => {
        return (
          <p key={i} className={textSize}>
            Have you heard about{' '}
            <TextLink href="/?path=/docs/getting-started--docs" target="_blank">
              Spark
            </TextLink>{' '}
            ? It’s awesome .
          </p>
        )
      })}
    </div>
  )
}

export const Icons: StoryFn = _args => {
  return (
    <p>
      External{' '}
      <TextLink href="https://en.wikipedia.org/wiki/Kitten" target="_blank" className="gap-sm">
        link
        <Icon>
          <LinkSVG />
        </Icon>
      </TextLink>
      .
    </p>
  )
}

export const Underline: StoryFn = _args => {
  return (
    <TextLink underline={false} href="/?path=/docs/getting-started--docs" target="_blank">
      Link with underline disabled
    </TextLink>
  )
}
