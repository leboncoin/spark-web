import { Progress } from '@spark-ui/components/progress'
import React from 'react'

export const A11yProgress = () => (
  <section>
    <div>
      <Progress aria-label="Loading" value={35} />
    </div>

    <div>
      <Progress value={50}>
        <Progress.Bar />

        <div className="flex justify-between">
          <Progress.Label>Loading</Progress.Label>

          <span className="text-body-2 text-on-surface">50%</span>
        </div>
      </Progress>
    </div>
  </section>
)
