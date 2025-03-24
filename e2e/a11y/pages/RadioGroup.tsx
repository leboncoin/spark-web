import { FormField } from '@spark-ui/components/form-field'
import { RadioGroup } from '@spark-ui/components/radio-group'
import React from 'react'

export const A11yRadioGroup = () => (
  <section>
    <div>
      <RadioGroup defaultValue="1">
        <RadioGroup.Radio value="1">First</RadioGroup.Radio>
        <RadioGroup.Radio value="2" disabled>
          Second
        </RadioGroup.Radio>
        <RadioGroup.Radio value="3">Third</RadioGroup.Radio>
      </RadioGroup>
    </div>

    <div>
      <FormField name="title" state="error">
        <FormField.Label>Sports</FormField.Label>
        <RadioGroup>
          <RadioGroup.Radio value="soccer">Soccer</RadioGroup.Radio>
          <RadioGroup.Radio value="tennis">Tennis</RadioGroup.Radio>
          <RadioGroup.Radio value="baseball">Baseball</RadioGroup.Radio>
        </RadioGroup>
        <FormField.ErrorMessage>You must choose a sport among the list</FormField.ErrorMessage>
      </FormField>
    </div>
  </section>
)
