import { Tag } from '@spark-ui/components/tag'
import { StarFill } from '@spark-ui/icons/StarFill'
import { StarOutline } from '@spark-ui/icons/StarOutline'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { type ComponentProps, useState } from 'react'

import { Switch } from '.'
import { FormField } from '../form-field'
import { Table } from '../table'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['data-entry'],
}

export default meta

export const Default: StoryFn = _args => <Switch>Agreed</Switch>

export const Uncontrolled: StoryFn = _args => <Switch defaultChecked>Agreed</Switch>

export const Controlled: StoryFn = () => {
  const [checked, setChecked] = useState(true)

  return (
    <Switch checked={checked} onCheckedChange={setChecked}>
      Agreed
    </Switch>
  )
}

export const Reverse: StoryFn = _args => <Switch reverse>Agreed</Switch>

export const Icons: StoryFn = _args => (
  <Switch checkedIcon={<StarFill />} uncheckedIcon={<StarOutline />}>
    Mode
  </Switch>
)

export const Disabled: StoryFn = _args => {
  const rows = [
    { id: 'enabled', label: 'Enabled', disabled: false },
    { id: 'disabled', label: 'Disabled', disabled: true },
  ]

  return (
    <Table>
      <Table.Grid aria-label="Switch states">
        <Table.Header>
          <Table.Column id="state" label="State" isRowHeader />
          <Table.Column id="unchecked" label="Unchecked" />
          <Table.Column id="checked" label="Checked" />
        </Table.Header>
        <Table.Body>
          {rows.map(row => (
            <Table.Row key={row.id} id={row.id}>
              <Table.Cell>{row.label}</Table.Cell>
              <Table.Cell>
                <Switch disabled={row.disabled}>Agreed</Switch>
              </Table.Cell>
              <Table.Cell>
                <Switch defaultChecked disabled={row.disabled}>
                  Agreed
                </Switch>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
    </Table>
  )
}

const sizes: ComponentProps<typeof Switch>['size'][] = ['sm', 'md']

export const Sizes: StoryFn = _args => (
  <div className="gap-lg flex">
    {sizes.map(size => (
      <div key={size}>
        <Tag className="mb-md flex">{size}</Tag>
        <Switch name="small" size={size}>
          Agreed
        </Switch>
      </div>
    ))}
  </div>
)

export const FieldHelperMessage: StoryFn = _args => (
  <FormField name="agreement">
    <Switch>Gifts only</Switch>

    <FormField.HelperMessage>Display free items only</FormField.HelperMessage>
  </FormField>
)

export const FieldInvalid: StoryFn = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <FormField name="agreement" state={!isChecked ? 'error' : undefined}>
      <Switch checked={isChecked} onCheckedChange={setIsChecked}>
        Third-party recommendations
      </Switch>

      <FormField.ErrorMessage>
        You must agree with third-party recommendations
      </FormField.ErrorMessage>
    </FormField>
  )
}
