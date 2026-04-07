import type { Selection, SortDescriptor } from '@react-types/shared'
import { BookmarkOutline, CopyOutline } from '@spark-ui/icons'
import { InfoOutline } from '@spark-ui/icons/InfoOutline'
import { PenOutline } from '@spark-ui/icons/PenOutline'
import { TrashOutline } from '@spark-ui/icons/TrashOutline'
import { Meta, StoryFn } from '@storybook/react-vite'
import { useMemo, useRef, useState } from 'react'

import { Table, useTablePagination, useTableSort } from '.'
import { Button } from '../button'
/* eslint-disable max-lines */
import { Dropdown } from '../dropdown'
import { Icon } from '../icon'
import { IconButton } from '../icon-button'
import { Pagination } from '../pagination'
import { Popover } from '../popover'
import { Switch } from '../switch'
import { Tag } from '../tag'
import { TextLink } from '../text-link'
import pokedexData from './pokedex.json'

const meta: Meta<typeof Table> = {
  title: 'Experimental/Table',
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
  ]

  const [selected, setSelected] = useState<Set<string> | 'all'>(new Set())
  const { sortDescriptor, onSortChange, sortedItems } = useTableSort(defaultRows, {
    initialSort: { column: 'name', direction: 'ascending' },
  })

  return (
    <Table
      resizeColumnAriaLabel="Resize column"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={(keys: Selection) => setSelected(keys as Set<string> | 'all')}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <Table.Grid aria-label="Files">
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
          <Table.Column id="actions" label="Actions" minWidth={300} />
        </Table.Header>
        <Table.Body>
          {sortedItems.map(item => (
            <Table.Row key={item.id} id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.dateModified}</Table.Cell>
              <Table.Cell>
                <div className="gap-md flex flex-wrap">
                  <Switch>Agree</Switch>
                  <Dropdown>
                    <Dropdown.Trigger aria-label="Book">
                      <Dropdown.Value placeholder="Pick a book" />
                    </Dropdown.Trigger>

                    <Dropdown.Popover>
                      <Dropdown.Items>
                        <Dropdown.Item value="book-1">To Kill a Mockingbird</Dropdown.Item>
                        <Dropdown.Item value="book-2">War and Peace</Dropdown.Item>
                        <Dropdown.Item value="book-3">The Idiot</Dropdown.Item>
                        <Dropdown.Item value="book-4">A Picture of Dorian Gray</Dropdown.Item>
                        <Dropdown.Item value="book-5">1984</Dropdown.Item>
                        <Dropdown.Item value="book-6">Pride and Prejudice</Dropdown.Item>
                      </Dropdown.Items>
                    </Dropdown.Popover>
                  </Dropdown>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
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

  const { sortDescriptor, onSortChange, setSortDescriptor, sortedItems } = useTableSort(rows, {
    initialSort: { column: 'name', direction: 'ascending' },
  })

  return (
    <Table
      resizeColumnAriaLabel="Resize column"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <Button
        className="self-start"
        onClick={() => setSortDescriptor({ column: 'name', direction: 'ascending' })}
        disabled={sortDescriptor.column === 'name' && sortDescriptor.direction === 'ascending'}
      >
        Reset sort
      </Button>
      <Table.Grid aria-label="Sortable table" className="max-w-sz-640">
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader allowsSorting />
          <Table.Column id="type" label="Type" allowsSorting />
          <Table.Column id="level" label="Level" allowsSorting />
        </Table.Header>
        <Table.Body>
          {sortedItems.map(item => (
            <Table.Row key={item.id} id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.level}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
    </Table>
  )
}

/** Parse "DD/MM/YYYY" to timestamp for chronological comparison. */
function parseDateDDMMYYYY(value: unknown): number {
  const str = String(value)
  const parts = str.split('/').map(Number)
  const [day = 0, month = 0, year = 0] = parts

  return new Date(year, month - 1, day).getTime()
}

export const SortableWithCustomComparator: StoryFn = () => {
  const rows = [
    { id: '2', name: 'Report Romeo', date: '11/05/2024' },
    { id: '4', name: 'Report Julie', date: '15/09/2024' },
    { id: '1', name: 'Report Kevin', date: '08/01/2025' },
    { id: '3', name: 'Report Alan', date: '10/05/2026' },
  ]

  const { sortDescriptor, onSortChange, sortedItems } = useTableSort(rows, {
    initialSort: { column: 'date', direction: 'ascending' },
    compare: (a, b, column, direction) => {
      if (column === 'date') {
        const aTime = parseDateDDMMYYYY(a.date)
        const bTime = parseDateDDMMYYYY(b.date)
        let comparisonResult = 0

        if (aTime < bTime) comparisonResult = -1
        else if (aTime > bTime) comparisonResult = 1

        return direction === 'descending' ? -comparisonResult : comparisonResult
      }

      const comparisonResult = String(a[column]).localeCompare(String(b[column]))

      return direction === 'descending' ? -comparisonResult : comparisonResult
    },
  })

  return (
    <Table
      resizeColumnAriaLabel="Resize column"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <Table.Grid aria-label="Table with date column (custom comparator)" className="max-w-sz-640">
        <Table.Header>
          <Table.Column id="name" label="Name" isRowHeader allowsSorting />
          <Table.Column id="date" label="Date" allowsSorting />
        </Table.Header>
        <Table.Body>
          {sortedItems.map(item => (
            <Table.Row key={item.id} id={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
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
    <Table resizeColumnAriaLabel="Resize column">
      <Table.Grid aria-label="Search results (items + renderEmptyState)" className="max-w-sz-640">
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
      </Table.Grid>
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
      resizeColumnAriaLabel="Resize column"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={(keys: Selection) => setSelected(keys as Set<string> | 'all')}
    >
      <Table.Grid aria-label="Selectable rows (multiple)" className="max-w-sz-640">
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
      </Table.Grid>
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
        resizeColumnAriaLabel="Resize column"
        className="mb-lg"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={(keys: Selection) => setSelected(keys as Set<string> | 'all')}
        selectionBehavior="toggle"
      >
        <Table.Grid aria-label="Selectable rows (multiple) with links" className="max-w-sz-800">
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
                <Table.Cell>
                  <TextLink href={row.href} target="_blank" rel="noreferrer noopener">
                    {row.name}
                  </TextLink>
                </Table.Cell>
                <Table.Cell>{row.type}</Table.Cell>
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>
                  <Switch>Enabled</Switch>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Grid>
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
      resizeColumnAriaLabel="Resize column"
      selectionMode="single"
      selectedKeys={selected}
      onSelectionChange={(keys: Selection) => setSelected(keys as Set<string>)}
    >
      <Table.Grid aria-label="Selectable rows (single)" className="max-w-sz-640">
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
      </Table.Grid>
    </Table>
  )
}

export const WithResizingDisabled: StoryFn = () => (
  <Table resizeColumnAriaLabel="Resize column" allowsResizing={false}>
    <Table.Grid aria-label="Simple table without column resize" className="max-w-sz-640">
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
    </Table.Grid>
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
    <Table resizeColumnAriaLabel="Resize column">
      <Table.Grid aria-label="Table with custom interactive elements" className="max-w-sz-640">
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
                  onCheckedChange={checked =>
                    setToggles(prev => ({ ...prev, [item.id]: !!checked }))
                  }
                >
                  {(toggles[item.id] ?? item.enabled) ? 'On' : 'Off'}
                </Switch>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
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

interface PokemonRow {
  id: string
  num: string
  name: string
  type: string[]
  img: string
}

const POKEMON_ROWS: PokemonRow[] = pokedexData.pokemon.slice(0, 151).map(p => ({
  id: String(p.id),
  num: p.num,
  name: p.name,
  type: p.type ?? [],
  img: p.img ?? '',
}))

export const PaginationStory: StoryFn = () => {
  const pageSize = 6
  const allItems = useMemo(() => POKEMON_ROWS, [])

  const { sortDescriptor, onSortChange, sortedItems } = useTableSort(allItems, {
    initialSort: { column: 'num', direction: 'ascending' },
  })

  const {
    page,
    pageItems,
    totalItems,
    allKeys,
    selectedKeys,
    onSelectionChange,
    onPageChange,
    setPage,
    clearSelection,
  } = useTablePagination(sortedItems, { pageSize })

  const handleSortChange = (descriptor: SortDescriptor) => {
    setPage(1)
    onSortChange(descriptor)
  }

  return (
    <Table
      resizeColumnAriaLabel="Resize column"
      className="max-w-sz-800"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      onClearSelection={clearSelection}
      totalCount={totalItems}
      hasMultiplePages={totalItems > pageSize}
      onSelectAll={() => onSelectionChange(allKeys)}
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortChange}
    >
      <Table.BulkBar aria-label="Table bulk actions">
        <div className="flex flex-col justify-between">
          <Table.BulkBarSelectedCount>{`${selectedKeys.size} selected`}</Table.BulkBarSelectedCount>
          <div className="gap-x-lg flex flex-wrap">
            <Table.BulkBarClearButton>Clear all</Table.BulkBarClearButton>
            <Table.BulkBarSelectAllButton>
              Select all {totalItems} items
            </Table.BulkBarSelectAllButton>
          </div>
        </div>
        <div className="gap-md flex">
          <IconButton aria-label="Delete selection" design="outlined" intent="neutral">
            <Icon>
              <TrashOutline />
            </Icon>
          </IconButton>
          <IconButton aria-label="Delete selection" design="outlined" intent="neutral">
            <Icon>
              <CopyOutline />
            </Icon>
          </IconButton>
          <IconButton aria-label="Delete selection" design="outlined" intent="neutral">
            <Icon>
              <PenOutline />
            </Icon>
          </IconButton>
          <IconButton aria-label="Delete selection" design="outlined" intent="neutral">
            <Icon>
              <BookmarkOutline />
            </Icon>
          </IconButton>
        </div>
      </Table.BulkBar>
      <Table.Grid aria-label="Pokédex (151 Pokémon)">
        <Table.Header>
          <Table.Column id="num" label="#" allowsSorting />
          <Table.Column id="name" label="Name" isRowHeader allowsSorting />
          <Table.Column id="type" label="Type(s)" />
          <Table.Column id="img" label="Image" />
        </Table.Header>
        <Table.Body>
          {pageItems.map(item => (
            <Table.Row key={item.id} id={item.id}>
              <Table.Cell>#{item.num}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>
                <div className="gap-sm flex flex-wrap">
                  {item.type.map(t => (
                    <Tag key={t} design="tinted" intent="neutral" size="md">
                      {t}
                    </Tag>
                  ))}
                </div>
              </Table.Cell>
              <Table.Cell>
                <img
                  src={item.img}
                  alt=""
                  width={48}
                  height={48}
                  className="size-sz-48 object-contain"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Grid>
      <Pagination
        type="button"
        aria-label="Table pagination"
        count={totalItems}
        pageSize={pageSize}
        page={page}
        visiblePageItems={7}
        onPageChange={onPageChange}
        className="self-center"
      >
        <Pagination.PrevTrigger aria-label="Previous page" />
        <Pagination.Pages>
          {({ pages, totalPages }) =>
            pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  key={page.value}
                  value={page.value}
                  aria-label={
                    page.value === totalPages
                      ? `Last page, page ${page.value}`
                      : `Page ${page.value}`
                  }
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={`${index}-ellipsis`} index={index} />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" />
      </Pagination>
    </Table>
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
          <Table resizeColumnAriaLabel="Resize column">
            <Table.Grid aria-label="Table with items and dependencies" className="max-w-sz-640">
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
            </Table.Grid>
          </Table>
        </div>
        <div className="gap-sm min-w-sz-320 flex flex-1 flex-col">
          <p className="text-body-2 text-on-surface font-semibold">
            With <code>.map()</code>
          </p>
          <Table resizeColumnAriaLabel="Resize column">
            <Table.Grid aria-label="Table with map" className="max-w-sz-640">
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
            </Table.Grid>
          </Table>
        </div>
      </div>
    </div>
  )
}
