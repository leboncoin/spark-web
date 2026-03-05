/* eslint-disable max-lines */
import { EyeOutline } from '@spark-ui/icons/EyeOutline'
import { InfoOutline } from '@spark-ui/icons/InfoOutline'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { TrashOutline } from '@spark-ui/icons/TrashOutline'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useMemo, useRef, useState } from 'react'
import type { SortDescriptor } from 'react-aria-components'

import { Button } from '../button'
import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { Popover } from '../popover'
import { Switch } from '../switch'
import { Table } from '.'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['data-display'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  const defaultRows = [
    { id: 'row-1', name: 'Games', type: 'File folder', dateModified: '6/7/2020' },
    { id: 'row-2', name: 'Program Files', type: 'File folder', dateModified: '4/7/2021' },
    { id: 'row-3', name: 'bootmgr', type: 'System file', dateModified: '11/20/2010' },
    { id: 'row-4', name: 'log.txt', type: 'Text Document', dateModified: '1/18/2016' },
    { id: 'row-5', name: 'Documents', type: 'File folder', dateModified: '3/12/2022' },
    { id: 'row-6', name: 'Downloads', type: 'File folder', dateModified: '8/5/2023' },
    { id: 'row-7', name: 'config.ini', type: 'Configuration', dateModified: '9/14/2019' },
    { id: 'row-8', name: 'README', type: 'Text Document', dateModified: '2/28/2024' },
    { id: 'row-9', name: 'System32', type: 'File folder', dateModified: '7/1/2020' },
    { id: 'row-10', name: 'temp', type: 'File folder', dateModified: '12/9/2023' },
  ]

  const [selected, setSelected] = useState<Set<string> | 'all'>(new Set())
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  })

  const sortedRows = [...defaultRows].sort((a, b) => {
    const col = sortDescriptor.column as keyof (typeof defaultRows)[0]
    const aVal = a[col]
    const bVal = b[col]
    let cmp = String(aVal).localeCompare(String(bVal))
    if (sortDescriptor.direction === 'descending') cmp = -cmp

    return cmp
  })

  return (
    <Table
      aria-label="Files"
      selectionMode="multiple"
      selectedKeys={selected}
      maxHeight={500}
      onSelectionChange={keys => setSelected(keys as Set<string> | 'all')}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <Table.Header>
        <Table.Column id="name" label="Name" isRowHeader allowsSorting>
          <Popover>
            <Popover.Trigger asChild>
              <IconButton aria-label="Edit" intent="neutral" design="ghost" size="sm">
                <Icon>
                  <InfoOutline />
                </Icon>
              </IconButton>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content>
                <Popover.Header>Title</Popover.Header>
                <p>Are you sure you want to have that cookie now ?</p>
                <Popover.Arrow />
                <Popover.CloseButton aria-label="Close the popover" />
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        </Table.Column>
        <Table.Column id="type" label="Type" allowsSorting />
        <Table.Column id="dateModified" label="Date Modified" allowsSorting />
        <Table.Column id="actions" label="Actions" />
      </Table.Header>
      <Table.Body>
        {sortedRows.map(item => (
          <Table.Row key={item.id} id={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.dateModified}</Table.Cell>
            <Table.Cell>
              <div className="gap-md flex flex-wrap">
                <Switch>Agree</Switch>
                <div className="gap-md flex">
                  <IconButton aria-label="Edit" intent="support" design="outlined" size="sm">
                    <Icon>
                      <PenOutline />
                    </Icon>
                  </IconButton>
                  <IconButton aria-label="Delete" intent="support" design="outlined" size="sm">
                    <Icon>
                      <TrashOutline />
                    </Icon>
                  </IconButton>
                  <IconButton aria-label="View" intent="support" design="outlined" size="sm">
                    <Icon>
                      <EyeOutline />
                    </Icon>
                  </IconButton>
                </div>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const Sortable: StoryFn = () => {
  const rows = [
    { id: '1', name: 'Charizard', type: 'Fire, Flying', level: 67 },
    { id: '2', name: 'Blastoise', type: 'Water', level: 56 },
    { id: '3', name: 'Venusaur', type: 'Grass, Poison', level: 83 },
    { id: '4', name: 'Pikachu', type: 'Electric', level: 100 },
  ]

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  })

  const sortedRows = [...rows].sort((a, b) => {
    const col = sortDescriptor.column as keyof (typeof rows)[0]
    const aVal = a[col]
    const bVal = b[col]
    let cmp = aVal < bVal ? -1 : 1
    if (sortDescriptor.direction === 'descending') cmp = -cmp

    return cmp
  })

  return (
    <Table
      aria-label="Sortable table"
      className="max-w-sz-640"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <Table.Header>
        <Table.Column id="name" label="Name" isRowHeader allowsSorting />
        <Table.Column id="type" label="Type" allowsSorting />
        <Table.Column id="level" label="Level" allowsSorting />
      </Table.Header>
      <Table.Body>
        {sortedRows.map(item => (
          <Table.Row key={item.id} id={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.level}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const EmptyState: StoryFn = () => {
  interface RowData {
    id: string
    name: string
    type: string
    dateModified: string
  }
  const emptyItems = useMemo(() => [] as RowData[], [])

  return (
    <Table aria-label="Search results (items + renderEmptyState)" className="max-w-sz-640">
      <Table.Header>
        <Table.Column id="name" label="Name" isRowHeader />
        <Table.Column id="type" label="Type" />
        <Table.Column id="dateModified" label="Date Modified" />
      </Table.Header>
      <Table.Body
        items={emptyItems}
        dependencies={[emptyItems]}
        renderEmptyState={() => 'No results found.'}
      >
        {item => (
          <Table.Row id={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.dateModified}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export const WithSelectionMultiple: StoryFn = () => {
  const selectionRows = [
    { id: 'a', name: 'Alpha', type: 'Type A', date: '1/1/2024' },
    { id: 'b', name: 'Beta', type: 'Type B', date: '2/2/2024' },
    { id: 'c', name: 'Gamma', type: 'Type C', date: '3/3/2024' },
  ]

  const [selected, setSelected] = useState<Set<string> | 'all'>(new Set())

  return (
    <Table
      aria-label="Selectable rows (multiple)"
      className="max-w-sz-640"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={keys => setSelected(keys as Set<string> | 'all')}
    >
      <Table.Header>
        <Table.Column id="name" label="Name" isRowHeader />
        <Table.Column id="type" label="Type" />
        <Table.Column id="date" label="Date" />
      </Table.Header>
      <Table.Body>
        {selectionRows.map(row => (
          <Table.Row key={row.id} id={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.type}</Table.Cell>
            <Table.Cell>{row.date}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const WithSelectionMultipleWithLinks: StoryFn = () => {
  const selectionRows = [
    {
      id: 'a',
      name: 'Spark UI documentation',
      type: 'External link',
      date: '1/1/2024',
      href: '/?path=/docs/introduction--docs',
    },
    {
      id: 'b',
      name: 'Spark UI GitHub',
      type: 'External link',
      date: '2/2/2024',
      href: 'http://localhost:6006/?path=/docs/introduction--docs',
    },
    {
      id: 'c',
      name: 'Spark UI playground',
      type: 'External link',
      date: '3/3/2024',
      href: 'http://localhost:6006/?path=/docs/introduction--docs',
    },
  ]

  const [selected, setSelected] = useState<Set<string> | 'all'>(new Set())

  return (
    <>
      <Table
        aria-label="Selectable rows (multiple) with links"
        className="max-w-sz-800 mb-lg"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={keys => setSelected(keys as Set<string> | 'all')}
        selectionBehavior="toggle"
      >
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader />
          <Table.Column id="type" label="Type" />
          <Table.Column id="date" label="Date" />
          <Table.Column id="enabled" label="Enabled" />
        </Table.Header>
        <Table.Body>
          {selectionRows.map(row => (
            <Table.Row
              key={row.id}
              id={row.id}
              href={row.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.type}</Table.Cell>
              <Table.Cell>{row.date}</Table.Cell>
              <Table.Cell>
                <Switch>Enabled</Switch>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export const WithSelectionSingle: StoryFn = () => {
  const selectionRows = [
    { id: 'a', name: 'Alpha', type: 'Type A', date: '1/1/2024' },
    { id: 'b', name: 'Beta', type: 'Type B', date: '2/2/2024' },
    { id: 'c', name: 'Gamma', type: 'Type C', date: '3/3/2024' },
  ]

  const [selected, setSelected] = useState<Set<string>>(new Set())

  return (
    <Table
      aria-label="Selectable rows (single)"
      className="max-w-sz-640"
      selectionMode="single"
      selectedKeys={selected}
      onSelectionChange={keys => setSelected(keys as Set<string>)}
    >
      <Table.Header>
        <Table.Column id="name" label="Name" isRowHeader />
        <Table.Column id="type" label="Type" />
        <Table.Column id="date" label="Date" />
      </Table.Header>
      <Table.Body>
        {selectionRows.map(row => (
          <Table.Row key={row.id} id={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.type}</Table.Cell>
            <Table.Cell>{row.date}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export const WithResizingDisabled: StoryFn = () => (
  <Table
    aria-label="Simple table without column resize"
    allowsResizing={false}
    className="max-w-sz-640"
  >
    <Table.Header>
      <Table.Column id="name" label="Name" isRowHeader />
      <Table.Column id="type" label="Type" />
      <Table.Column id="date" label="Date" />
    </Table.Header>
    <Table.Body>
      <Table.Row id="row-1">
        <Table.Cell>Alpha</Table.Cell>
        <Table.Cell>Type A</Table.Cell>
        <Table.Cell>1/1/2024</Table.Cell>
      </Table.Row>
      <Table.Row id="row-2">
        <Table.Cell>Beta</Table.Cell>
        <Table.Cell>Type B</Table.Cell>
        <Table.Cell>2/2/2024</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export const CustomInteractiveElements: StoryFn = () => {
  const customInteractiveRows = [
    { id: '1', name: 'Feature A', enabled: true },
    { id: '2', name: 'Feature B', enabled: false },
    { id: '3', name: 'Feature C', enabled: true },
  ]

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    '1': true,
    '2': false,
    '3': true,
  })

  return (
    <Table aria-label="Table with custom interactive elements" className="max-w-sz-640">
      <Table.Header>
        <Table.Column id="name" label="Name" isRowHeader />
        <Table.Column id="enabled" label="Enabled">
          <Popover>
            <Popover.Trigger asChild>
              <IconButton aria-label="Info" intent="neutral" design="ghost" size="sm">
                <Icon>
                  <InfoOutline />
                </Icon>
              </IconButton>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content>
                <Popover.Header>Column info</Popover.Header>
                <p>Use Switch or other interactive components inside Table.Cell.</p>
                <Popover.Arrow />
                <Popover.CloseButton aria-label="Close" />
              </Popover.Content>
            </Popover.Portal>
          </Popover>
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {customInteractiveRows.map(item => (
          <Table.Row key={item.id} id={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>
              <Switch
                checked={toggles[item.id] ?? item.enabled}
                onCheckedChange={checked => setToggles(prev => ({ ...prev, [item.id]: !!checked }))}
              >
                {(toggles[item.id] ?? item.enabled) ? 'On' : 'Off'}
              </Switch>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

function NameCellWithRenderCount({ name }: { id: string; name: string }) {
  const countRef = useRef(0)
  countRef.current++

  return (
    <>
      {name}{' '}
      <span className="text-body-2 text-on-surface/dim-3">(renders: {countRef.current})</span>
    </>
  )
}

export const WithItemsAndDependencies: StoryFn = () => {
  const memoizationDemoRows = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: `row-${i + 1}`,
        name: `Item ${i + 1}`,
        value: 100 + i,
      })),
    []
  )

  const [triggerCount, setTriggerCount] = useState(0)

  return (
    <div className="gap-lg flex flex-col">
      <p className="text-body-2 text-on-surface">
        Click the button to trigger a parent re-render. The <code>items</code> +{' '}
        <code>{'dependencies={[rows]}'}</code> table keeps row render counts at 1; the{' '}
        <code>.map()</code> table re-renders every row on each trigger.
      </p>
      <Button onClick={() => setTriggerCount(c => c + 1)}>
        Trigger re-render (count: {triggerCount})
      </Button>
      <div className="gap-xl flex flex-wrap">
        <div className="gap-sm min-w-sz-320 flex flex-1 flex-col">
          <p className="text-body-2 text-on-surface font-semibold">
            With <code>items</code> + <code>dependencies</code>
          </p>
          <Table aria-label="Table with items and dependencies" className="max-w-sz-640">
            <Table.Header>
              <Table.Column id="name" label="Name" isRowHeader />
              <Table.Column id="value" label="Value" />
            </Table.Header>
            <Table.Body items={memoizationDemoRows} dependencies={[memoizationDemoRows]}>
              {item => (
                <Table.Row id={item.id}>
                  <Table.Cell>
                    <NameCellWithRenderCount id={item.id} name={item.name} />
                  </Table.Cell>
                  <Table.Cell>{item.value}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="gap-sm min-w-sz-320 flex flex-1 flex-col">
          <p className="text-body-2 text-on-surface font-semibold">
            With <code>.map()</code>
          </p>
          <Table aria-label="Table with map" className="max-w-sz-640">
            <Table.Header>
              <Table.Column id="name" label="Name" isRowHeader />
              <Table.Column id="value" label="Value" />
            </Table.Header>
            <Table.Body>
              {memoizationDemoRows.map(item => (
                <Table.Row key={item.id} id={item.id}>
                  <Table.Cell>
                    <NameCellWithRenderCount id={item.id} name={item.name} />
                  </Table.Cell>
                  <Table.Cell>{item.value}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
}
