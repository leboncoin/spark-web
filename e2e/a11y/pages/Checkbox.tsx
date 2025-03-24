import { Checkbox, CheckboxGroup } from '@spark-ui/components/checkbox'
import React from 'react'

export const A11yCheckbox = () => (
  <section>
    <div>
      <Checkbox className="max-w-sz-432">
        Refuse terms and conditions, because you are so unhappy with it. There is no reason to
        accept that, it’s unfair!
      </Checkbox>
    </div>

    <div>
      <CheckboxGroup name="sport">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="tennis">Tennis</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
      </CheckboxGroup>
    </div>
  </section>
)
