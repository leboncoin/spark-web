import { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'

import { Accordion } from '.'
import { Button } from '../button'
import { Card } from '../card'
import { Checkbox, CheckboxGroup } from '../checkbox'
import { Tag } from '../tag'
import { Item as AccordionItem } from './AccordionItem'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    'Accordion.Item': AccordionItem,
    'Accordion.ItemHeader': Accordion.ItemHeader,
    'Accordion.ItemTrigger': Accordion.ItemTrigger,
    'Accordion.ItemContent': Accordion.ItemContent,
  },
  tags: ['data-display'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=54248-11756&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  return (
    <Accordion defaultValue={['watercraft']}>
      <Accordion.Item value="watercraft">
        <Accordion.ItemHeader asChild>
          <h4>
            <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
          </h4>
        </Accordion.ItemHeader>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="automobiles">
        <Accordion.ItemHeader asChild>
          <h4>
            <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
          </h4>
        </Accordion.ItemHeader>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="aircrafts">
        <Accordion.ItemHeader asChild>
          <h4>
            <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
          </h4>
        </Accordion.ItemHeader>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  )
}

export const Disabled: StoryFn = () => {
  return (
    <Accordion disabled>
      <Accordion.Item value="watercraft">
        <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="automobiles">
        <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="aircrafts">
        <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  )
}

export const Design: StoryFn = _args => {
  const designs = ['outlined', 'filled'] as const

  return (
    <div className="gap-xl bg-main-container p-xl grid grid-cols-2">
      {designs.map(design => {
        return (
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
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value="automobiles">
                <Accordion.ItemTrigger>
                  Automobiles <span className="sr-only">{design}</span>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value="aircrafts">
                <Accordion.ItemTrigger>
                  Aircrafts <span className="sr-only">{design}</span>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}

export const Intent: StoryFn = _args => {
  const intents = ['surface', 'support'] as const

  return (
    <div className="gap-xl p-xl grid grid-cols-2">
      {intents.map(intent => {
        return (
          <div key={intent}>
            <Tag className="mb-sm">{intent === 'surface' ? 'surface (default)' : intent}</Tag>
            <Accordion
              multiple
              intent={intent}
              defaultValue={['watercraft']}
              aria-label={`Accordion with ${intent} intent`}
            >
              <Accordion.Item value="watercraft">
                <Accordion.ItemTrigger>
                  Watercraft <span className="sr-only">{intent}</span>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value="automobiles">
                <Accordion.ItemTrigger>
                  Automobiles <span className="sr-only">{intent}</span>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value="aircrafts">
                <Accordion.ItemTrigger>
                  Aircrafts <span className="sr-only">{intent}</span>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}

export const DisabledItem: StoryFn = () => {
  return (
    <Accordion defaultValue={['watercraft']}>
      <Accordion.Item value="watercraft">
        <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="automobiles" disabled>
        <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="aircrafts">
        <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  )
}

export const Multiple: StoryFn = () => {
  return (
    <Accordion multiple defaultValue={['watercraft']}>
      <Accordion.Item value="watercraft">
        <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="automobiles">
        <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="aircrafts">
        <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  )
}

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState<string[]>(['watercraft'])

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="automobiles">
          <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="aircrafts">
          <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export const CustomHeaders: StoryFn = () => {
  const programs = [
    {
      id: 'wonder-flats',
      name: 'Apartment - 2 rooms - WONDER FLATS',
      minPrice: '200,000 €',
      unitsAvailable: 2,
      units: [
        { rooms: 2, price: 200000, sqm: 45, floor: 2 },
        { rooms: 2, price: 215000, sqm: 48, floor: 4 },
      ],
    },
    {
      id: 'green-residence',
      name: 'Apartment - 3 rooms - GREEN RESIDENCE',
      minPrice: '320,000 €',
      unitsAvailable: 3,
      units: [
        { rooms: 3, price: 320000, sqm: 65, floor: 1 },
        { rooms: 3, price: 335000, sqm: 68, floor: 3 },
        { rooms: 3, price: 350000, sqm: 70, floor: 5 },
      ],
    },
    {
      id: 'sunset-towers',
      name: 'Apartment - 4 rooms - SUNSET TOWERS',
      minPrice: '480,000 €',
      unitsAvailable: 1,
      units: [{ rooms: 4, price: 480000, sqm: 95, floor: 8 }],
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
  }

  const calculatePricePerSqm = (price: number, sqm: number) => {
    return Math.round(price / sqm)
  }

  return (
    <Accordion intent="support" defaultValue={['wonder-flats']}>
      {programs.map(program => (
        <Accordion.Item key={program.id} value={program.id}>
          <Accordion.ItemTrigger>
            <div className="flex grow items-center justify-between">
              <div className="flex flex-col">
                <span className="text-headline-2">{program.name}</span>
                <span className="text-caption font-regular">as low as {program.minPrice}</span>
              </div>
              <span className="text-body-2 font-regular ml-lg shrink-0">
                {program.unitsAvailable} {program.unitsAvailable === 1 ? 'unit' : 'units'} available
              </span>
            </div>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <div className="gap-md flex flex-col">
              {program.units.map((unit, index) => {
                const pricePerSqm = calculatePricePerSqm(unit.price, unit.sqm)
                return (
                  <Card design="tinted" intent="neutral" key={index}>
                    <Card.Content className="gap-md flex items-center">
                      <div className="gap-sm flex grow flex-col">
                        <span className="text-body-1">
                          {unit.rooms} {unit.rooms === 1 ? 'room' : 'rooms'} •{' '}
                          <span className="text-main font-bold">{formatPrice(unit.price)}</span> (
                          {formatPrice(pricePerSqm)}/m²)
                        </span>
                        <span className="text-caption text-neutral">
                          {unit.sqm} m² • Floor {unit.floor}
                        </span>
                      </div>
                      <Button design="filled" intent="support">
                        Request map
                      </Button>
                    </Card.Content>
                  </Card>
                )
              })}
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
