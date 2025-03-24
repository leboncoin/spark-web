import { Switch } from '@spark-ui/components/switch'
import React from 'react'

export const A11ySwitch = () => (
  <section>
    <div>
      <Switch intent="main">Agreed</Switch>
    </div>

    <div>
      <Switch intent="main" aria-label="Agreed again" defaultChecked />
    </div>
  </section>
)
