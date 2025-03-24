import { Button } from '@spark-ui/components/button'
import { Dialog } from '@spark-ui/components/dialog'
import { Drawer } from '@spark-ui/components/drawer'
import React from 'react'

import { DropdownField as PositionField } from './fields/DropdownField'
import { DropdownMultipleField as HobbiesField } from './fields/DropdownMultipleField'
import { InputField as NameField } from './fields/InputField'

const SparkForm = () => {
  return (
    <form style={{ width: 400 }} className="m-lg gap-xl mx-auto flex flex-col">
      <NameField defaultValue="" />

      <PositionField isRequired defaultValue="" />

      <HobbiesField defaultValue={[]} />

      <Button type="submit" className="mt-lg">
        Submit
      </Button>
    </form>
  )
}

export const DialogForm = () => (
  <Dialog defaultOpen>
    <Dialog.Trigger asChild>
      <Button>Open dialog form</Button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay />

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Dialog form</Dialog.Title>
        </Dialog.Header>

        <SparkForm />

        <Dialog.CloseButton aria-label="Close dialog" />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>
)

export const DrawerForm = () => (
  <Drawer defaultOpen>
    <Drawer.Trigger asChild>
      <Button>Open drawer form</Button>
    </Drawer.Trigger>

    <Drawer.Portal>
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Drawer form</Drawer.Title>
        </Drawer.Header>

        <SparkForm />

        <Drawer.CloseButton aria-label="Close drawer" />
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer>
)
