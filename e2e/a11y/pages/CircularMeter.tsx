import { CircularMeter } from '@spark-ui/components/circular-meter'
import React from 'react'

export const A11yCircularMeter = () => (
  <section>
    <div>
      <CircularMeter value={24} aria-label="Storage used">
        <CircularMeter.Track>
          <CircularMeter.Value />
          <CircularMeter.Label>Storage used</CircularMeter.Label>
        </CircularMeter.Track>
      </CircularMeter>
    </div>

    <div>
      <CircularMeter value={75} size="sm" aria-label="Small meter">
        <CircularMeter.Track />
        <CircularMeter.Content>
          <CircularMeter.Value />
          <CircularMeter.Label>Storage used</CircularMeter.Label>
        </CircularMeter.Content>
      </CircularMeter>
    </div>

    <div>
      <CircularMeter value={50} size="md" aria-label="Medium meter">
        <CircularMeter.Track>
          <CircularMeter.Value />
        </CircularMeter.Track>
        <CircularMeter.Content>
          <CircularMeter.Label>Storage used</CircularMeter.Label>
        </CircularMeter.Content>
      </CircularMeter>
    </div>

    <div>
      <CircularMeter value={70} intent="success" aria-label="Success meter">
        <CircularMeter.Track>
          <CircularMeter.Value />
          <CircularMeter.Label>Storage used</CircularMeter.Label>
        </CircularMeter.Track>
      </CircularMeter>
    </div>

    <div>
      <CircularMeter value={90} orientation="horizontal" aria-label="Horizontal meter">
        <CircularMeter.Track>
          <CircularMeter.Value />
          <CircularMeter.Label>Storage used</CircularMeter.Label>
        </CircularMeter.Track>
      </CircularMeter>
    </div>
  </section>
)
