import { StoryLabel } from '@docs/helpers/StoryLabel'
import { Meta, StoryFn } from '@storybook/react'
import { ComponentProps, Fragment } from 'react'

import { Divider } from './index'

type DividerProps = ComponentProps<typeof Divider>

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['data-display'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=47694-29759&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

const intents: DividerProps['intent'][] = ['outline', 'current']

export const Default: StoryFn = _args => <Divider />

export const asChild: StoryFn = _args => (
  <>
    <Divider asChild>
      <h1 />
    </Divider>
    <Divider asChild>
      <h1>
        <Divider.Content>content</Divider.Content>
      </h1>
    </Divider>
  </>
)
export const Content: StoryFn = _args => (
  <Divider>
    <Divider.Content>Divider</Divider.Content>
  </Divider>
)

export const Decorative: StoryFn = _args => (
  <>
    <Divider isDecorative />
    <Divider isDecorative asChild>
      <h1 />
    </Divider>
    <Divider isDecorative>
      <Divider.Content>Divider</Divider.Content>
    </Divider>
  </>
)

export const Intent: StoryFn = _args => (
  <div className="flex flex-col">
    {intents.map(intent => (
      <Fragment key={intent}>
        <StoryLabel>{intent}</StoryLabel>
        <Divider intent={intent}>
          <Divider.Content>{intent}</Divider.Content>
        </Divider>
      </Fragment>
    ))}
  </div>
)

export const Alignment: StoryFn = _args => (
  <>
    <Divider alignment="start">
      <Divider.Content>Divider</Divider.Content>
    </Divider>
    <Divider alignment="center">
      <Divider.Content>Divider</Divider.Content>
    </Divider>
    <Divider alignment="end">
      <Divider.Content>Divider</Divider.Content>
    </Divider>
  </>
)

export const Orientation: StoryFn = _args => (
  <>
    <Divider orientation="horizontal">
      <Divider.Content>horizontal</Divider.Content>
    </Divider>
    <div className="h-sz-320 flex w-full">
      <Divider orientation="vertical">
        <Divider.Content>vertical</Divider.Content>
      </Divider>
    </div>
  </>
)

export const WrappedContent: StoryFn = _args => (
  <div className="flex flex-col">
    <Divider>
      <Divider.Content>Top</Divider.Content>
    </Divider>
    <div className="flex flex-row items-stretch justify-between">
      <Divider orientation="vertical" writingMode="vertical-lr">
        <Divider.Content className="rotate-180">Left</Divider.Content>
      </Divider>
      <div className="bg-main-container flex grow items-center justify-center">wrapped content</div>
      <Divider orientation="vertical" writingMode="vertical-lr">
        <Divider.Content>Right</Divider.Content>
      </Divider>
    </div>
    <Divider>
      <Divider.Content className="rotate-180" style={{ writingMode: 'horizontal-tb' }}>
        Bottom
      </Divider.Content>
    </Divider>
  </div>
)

export const Card: StoryFn = _args => (
  <div className="from-main to-support-variant flex w-full items-center justify-center bg-linear-to-br">
    <div className="m-3xl max-w-sz-320 bg-background p-lg text-on-background flex flex-col rounded-md shadow-sm">
      <h1 className="text-headline-1">spark-ui components</h1>
      <p>An open-source UI component library.</p>
      <Divider />
      <div className="flex flex-row items-center justify-start">
        <span>Blog</span>
        <Divider orientation="vertical" />
        <span>Docs</span>
        <Divider orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  </div>
)
