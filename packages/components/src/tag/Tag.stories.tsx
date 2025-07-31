import { Check } from '@spark-ui/icons/Check'
import { Meta, StoryFn } from '@storybook/react-vite'
import { type ComponentProps } from 'react'

import { Icon } from '../icon'
import { Tag } from '.'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['data-display'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=1613-33301&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

type TagProps = ComponentProps<typeof Tag>

const intents: TagProps['intent'][] = [
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
const designs: TagProps['design'][] = ['filled', 'outlined', 'tinted']

export const Default: StoryFn = _args => <Tag>Default tag</Tag>

export const Design: StoryFn = _args => (
  <div className="gap-md flex flex-row">
    {designs.map(design => (
      <Tag key={design} design={design}>
        {design} tag
      </Tag>
    ))}
  </div>
)

export const Intent: StoryFn = _args => (
  <div className="gap-md flex flex-col">
    {designs.map(design => (
      <div key={design} className="gap-md flex flex-row">
        {intents.map(intent => {
          if (design !== 'filled' && intent === 'surface') {
            return (
              <span key={intent} className="text-small self-center">
                N/A
              </span>
            )
          }

          return (
            <Tag key={intent} design={design} intent={intent as any}>
              {intent} tag
            </Tag>
          )
        })}
      </div>
    ))}
  </div>
)

export const Icons: StoryFn = _args => (
  <div className="gap-md flex flex-wrap">
    <Tag>
      Button
      <Icon>
        <Check />
      </Icon>
    </Tag>
    <Tag>
      <Icon>
        <Check />
      </Icon>
      Button
    </Tag>
  </div>
)

export const Sizes: StoryFn = _args => (
  <div className="gap-md flex flex-row items-center">
    <Tag size="md">Medium tag</Tag>
    <Tag size="lg">Large tag</Tag>
  </div>
)

export const Shapes: StoryFn = _args => (
  <div className="gap-md flex flex-row items-center">
    <Tag shape="square">Square tag</Tag>
    <Tag shape="rounded">Rounded tag</Tag>
    <Tag shape="pill">Pill tag</Tag>
    <Tag shape="rounded" className="rounded-bl-none">
      Custom shape
    </Tag>
  </div>
)

export const AllCombinations: StoryFn = _args => {
  const designs: TagProps['design'][] = ['filled', 'outlined', 'tinted']
  const intents: TagProps['intent'][] = [
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
  const shapes: TagProps['shape'][] = ['square', 'rounded', 'pill']

  return (
    <div className="overflow-x-auto">
      <table className="border-sm border-outline border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-outline p-lg border-sm text-left font-bold">Intent/Design</th>
            {designs.map(design => (
              <th
                key={design}
                className="border-outline p-lg border-sm text-center font-bold capitalize"
              >
                {design}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {intents.map(intent => (
            <tr key={intent}>
              <td className="border-outline p-lg border-sm font-bold capitalize">{intent}</td>
              {designs.map(design => {
                // Skip surface intent for outlined and tinted designs
                if (design !== 'filled' && intent === 'surface') {
                  return (
                    <td
                      key={design}
                      className="border-outline p-lg border-sm text-center text-gray-500"
                    >
                      N/A
                    </td>
                  )
                }

                return (
                  <td key={design} className="p-lg border-sm border-outline">
                    <div className="gap-md flex flex-wrap justify-center">
                      {shapes.map(shape => (
                        <Tag key={shape} design={design} intent={intent as any} shape={shape}>
                          {shape}
                        </Tag>
                      ))}
                      <Tag
                        key="custom"
                        design={design}
                        intent={intent as any}
                        shape="rounded"
                        className="rounded-bl-none"
                      >
                        custom
                      </Tag>
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
