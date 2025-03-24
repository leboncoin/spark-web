import { Label } from '@spark-ui/components/label'
import React from 'react'

export const A11yLabel = () => (
  <section>
    <div className="gap-md flex flex-col">
      <Label className="gap-sm flex items-center" htmlFor="label-required">
        Title
        <Label.RequiredIndicator />
      </Label>

      <input
        type="text"
        id="label-required"
        placeholder="IPhone 14"
        className="border-md border-neutral p-md active:border-main rounded-sm"
        required
      />
    </div>
  </section>
)
