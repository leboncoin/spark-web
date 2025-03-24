import { Stepper } from '@spark-ui/components/stepper'
import React from 'react'

export const A11yStepper = () => (
  <section>
    <div>
      <Stepper
        aria-label="Stepper with min/max values"
        defaultValue={0}
        maxValue={100}
        minValue={0}
      >
        <Stepper.DecrementButton aria-label="Decrement" />
        <Stepper.Input />
        <Stepper.IncrementButton aria-label="Increment" />
      </Stepper>
    </div>
  </section>
)
