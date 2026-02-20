import { Accordion } from '@spark-ui/components/accordion'
import React from 'react'

export const A11yAccordion = () => (
  <section>
    <Accordion defaultValue={['watercraft']} aria-label="Playwright Accordion">
      <Accordion.Item value="watercraft">
        <Accordion.ItemHeader render={<h4 />}>
          <Accordion.ItemTrigger>Watercraft</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="automobiles">
        <Accordion.ItemHeader render={<h4 />}>
          <Accordion.ItemTrigger>Automobiles</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="aircrafts">
        <Accordion.ItemHeader render={<h4 />}>
          <Accordion.ItemTrigger>Aircrafts</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  </section>
)
