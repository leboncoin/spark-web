import { Meter } from '@spark-ui/components/meter'
import React from 'react'

export const A11yMeter = () => (
  <section>
    <div>
      <Meter value={24} aria-label="Storage used">
        <Meter.Label>Storage used</Meter.Label>
        <Meter.Value />
        <Meter.Track />
      </Meter>
    </div>

    <div>
      <Meter value={60} intent="success" aria-label="Success meter">
        <Meter.Label>Storage used</Meter.Label>
        <Meter.Value />
        <Meter.Track />
      </Meter>
    </div>

    <div>
      <Meter value={1} max={4} aria-label="Step meter">
        <Meter.Label>Step</Meter.Label>
        <Meter.Value>{((_: string, value: number) => `${value}/4`) as any}</Meter.Value>
        <Meter.Track />
      </Meter>
    </div>

    <div>
      <Meter value={85} intent="danger" aria-label="Danger meter">
        <Meter.Label>Storage used</Meter.Label>
        <Meter.Value />
        <Meter.Track />
      </Meter>
    </div>
  </section>
)
