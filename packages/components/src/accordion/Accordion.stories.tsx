import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect } from 'storybook/test'

import { Checkbox, CheckboxGroup } from '../checkbox'
import { Tag } from '../tag'
import { Accordion } from '.'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['data-display'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=54248-11756&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

const defaultAccordionJSX = (
  <Accordion defaultValue={['watercraft']}>
    <Accordion.Item value="watercraft">
      <Accordion.ItemHeader asChild>
        <h4>
          <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
        </h4>
      </Accordion.ItemHeader>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="automobiles">
      <Accordion.ItemHeader asChild>
        <h4>
          <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
        </h4>
      </Accordion.ItemHeader>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="aircrafts">
      <Accordion.ItemHeader asChild>
        <h4>
          <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
        </h4>
      </Accordion.ItemHeader>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
)

export const Default: Story = {
  render: () => defaultAccordionJSX,
  play: async ({ canvas, userEvent, step }) => {
    await step('Watercraft is expanded by default', async () => {
      const watercraftTrigger = canvas.getByRole('button', { name: 'Watercraft' })
      await expect(watercraftTrigger).toHaveAttribute('aria-expanded', 'true')
    })
    await step('Expand Automobiles by click', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Automobiles' }))
      const automobilesTrigger = canvas.getByRole('button', { name: 'Automobiles' })
      await expect(automobilesTrigger).toHaveAttribute('aria-expanded', 'true')
    })
    await step('Collapse Automobiles by clicking again', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Automobiles' }))
      const automobilesTrigger = canvas.getByRole('button', { name: 'Automobiles' })
      await expect(automobilesTrigger).toHaveAttribute('aria-expanded', 'false')
    })
  },
}

const disabledAccordionJSX = (
  <Accordion disabled>
    <Accordion.Item value="watercraft">
      <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="automobiles">
      <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="aircrafts">
      <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
)

export const Disabled: Story = {
  render: () => disabledAccordionJSX,
  play: async ({ canvas, step }) => {
    await step('All triggers are disabled', async () => {
      const watercraft = canvas.getByRole('button', { name: 'Watercraft' })
      const automobiles = canvas.getByRole('button', { name: 'Automobiles' })
      const aircrafts = canvas.getByRole('button', { name: 'Aircrafts' })
      await expect(watercraft).toBeDisabled()
      await expect(automobiles).toBeDisabled()
      await expect(aircrafts).toBeDisabled()
    })
  },
}

const DesignAccordions = () => {
  const designs = ['outlined', 'filled'] as const

  return (
    <div className="gap-xl bg-main-container p-xl grid grid-cols-2">
      {designs.map(design => (
        <div key={design}>
          <Tag className="mb-sm">{design}</Tag>
          <Accordion
            multiple
            design={design}
            defaultValue={['watercraft']}
            aria-label={`Accordion with ${design} design`}
          >
            <Accordion.Item value="watercraft">
              <Accordion.ItemTrigger>
                Watercraft <span className="sr-only">{design}</span>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <p>{lorem}</p>
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="automobiles">
              <Accordion.ItemTrigger>
                Automobiles <span className="sr-only">{design}</span>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <p>{lorem}</p>
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="aircrafts">
              <Accordion.ItemTrigger>
                Aircrafts <span className="sr-only">{design}</span>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <p>{lorem}</p>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  )
}

export const Design: Story = {
  render: () => <DesignAccordions />,
}

const disabledItemAccordionJSX = (
  <Accordion defaultValue={['watercraft']}>
    <Accordion.Item value="watercraft">
      <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="automobiles" disabled>
      <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="aircrafts">
      <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
)

export const DisabledItem: Story = {
  render: () => disabledItemAccordionJSX,
  play: async ({ canvas, userEvent, step }) => {
    await step('Automobiles trigger is disabled', async () => {
      const automobilesTrigger = canvas.getByRole('button', { name: 'Automobiles' })
      await expect(automobilesTrigger).toBeDisabled()
    })
    await step('Expand Aircrafts by click', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Aircrafts' }))
      const aircraftsTrigger = canvas.getByRole('button', { name: 'Aircrafts' })
      await expect(aircraftsTrigger).toHaveAttribute('aria-expanded', 'true')
    })
  },
}

const multipleAccordionJSX = (
  <Accordion multiple defaultValue={['watercraft']}>
    <Accordion.Item value="watercraft">
      <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="automobiles">
      <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="aircrafts">
      <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{lorem}</p>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
)

export const Multiple: Story = {
  render: () => multipleAccordionJSX,
  play: async ({ canvas, userEvent, step }) => {
    await step('Watercraft is expanded by default', async () => {
      const watercraftTrigger = canvas.getByRole('button', { name: 'Watercraft' })
      await expect(watercraftTrigger).toHaveAttribute('aria-expanded', 'true')
    })
    await step('Expand Automobiles while keeping Watercraft open', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Automobiles' }))
      await expect(canvas.getByRole('button', { name: 'Watercraft' })).toHaveAttribute(
        'aria-expanded',
        'true'
      )
      await expect(canvas.getByRole('button', { name: 'Automobiles' })).toHaveAttribute(
        'aria-expanded',
        'true'
      )
    })
  },
}

const ControlledRender = () => {
  const [value, setValue] = useState(['watercraft'])

  return (
    <div>
      <CheckboxGroup
        orientation="horizontal"
        value={value}
        onCheckedChange={setValue}
        className="mb-lg"
      >
        <Checkbox value="watercraft">Watercraft</Checkbox>
        <Checkbox value="automobiles">Automobiles</Checkbox>
        <Checkbox value="aircrafts">Aircrafts</Checkbox>
      </CheckboxGroup>

      <Accordion multiple value={value} onValueChange={setValue}>
        <Accordion.Item value="watercraft">
          <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <p>{lorem}</p>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="automobiles">
          <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <p>{lorem}</p>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="aircrafts">
          <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <p>{lorem}</p>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledRender />,
}
