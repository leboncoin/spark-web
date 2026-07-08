import { Switch } from '@spark-ui/components/switch'
import { Table } from '@spark-ui/components/table'
import { Check } from '@spark-ui/icons/Check'
import { FavoriteOutline } from '@spark-ui/icons/FavoriteOutline'
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite'
import { cx } from 'class-variance-authority'
import { type ComponentProps, useState } from 'react'

import { Button } from '.'
import { Checkbox } from '../checkbox'
import { Icon } from '../icon'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['action'],
}

export default meta

type ButtonProps = ComponentProps<typeof Button>

const sizes: ButtonProps['size'][] = ['sm', 'md', 'lg']
const intents: ButtonProps['intent'][] = [
  'main',
  'support',
  'accent',
  'ai',
  'success',
  'alert',
  'danger',
  'info',
  'neutral',
  'surface',
  'surfaceInverse',
]
const designs: ButtonProps['design'][] = ['filled', 'outlined', 'tinted', 'contrast', 'ghost']
const appearances: NonNullable<ButtonProps['appearance']>[] = [
  'primary',
  'secondary',
  'tertiary',
  'contrast',
  'ghost',
  'success',
  'danger',
  'boost',
  'AI',
]

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

      <Button isLoading={isLoading} loadingText="Loading...">
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

export const Appearance: StoryFn = _args => {
  const [underline, setUnderline] = useState(false)

  const appearanceRows = appearances.map((appearance, index) => ({
    id: `appearance-${index}`,
    appearance,
  }))

  return (
    <div className="gap-lg flex flex-col">
      <Switch checked={underline} onClick={() => setUnderline(!underline)}>
        Show underline
      </Switch>
      <Table>
        <Table.Grid aria-label="Button appearance by state">
          <Table.Header>
            <Table.Column id="appearance" label="Appearance" isRowHeader />
            <Table.Column id="base" label="Base" />
            <Table.Column id="disabled" label="Disabled" />
            <Table.Column id="loading" label="Loading" />
          </Table.Header>
          <Table.Body>
            {appearanceRows.map(row => (
              <Table.Row key={row.id} id={row.id}>
                <Table.Cell>{row.appearance}</Table.Cell>
                <Table.Cell className="bg-neutral-container">
                  <Button appearance={row.appearance} underline={underline}>
                    Click me
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button appearance={row.appearance} underline={underline} disabled>
                    Click me
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    appearance={row.appearance}
                    underline={underline}
                    isLoading
                    loadingLabel="Loading..."
                  >
                    Click me
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Grid>
      </Table>
    </div>
  )
}
