import { Chip } from '@spark-ui/components/chip'
import React from 'react'

export const A11yChip = () => (
  <section>
    <Chip onClear={() => console.log('clear')} intent="success">
      <Chip.Content>Accessibility</Chip.Content>
      <Chip.ClearButton label="clear" />
    </Chip>
  </section>
)
