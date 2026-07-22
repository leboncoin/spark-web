import { Switch } from '@spark-ui/components/switch'
import React from 'react'

export const A11ySwitch = () => (
  <section>
    <div>
      <Switch>Agreed</Switch>
    </div>

    <div>
      <Switch aria-label="Agreed again" defaultChecked />
    </div>
  </section>
)
