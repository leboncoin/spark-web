import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { FormField } from '../form-field'
import { RadioGroup } from '../radio-group'
import { Pagination } from '.'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['navigation'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Component-Specs-of-Spark?node-id=52241-11715&t=RvxIc25Ub8xTcBFf-4',
      allowFullscreen: true,
    },
  },
}

export default meta

export const Default: StoryFn = () => {
  return (
    <Pagination type="button" aria-label="Pagination" count={100} pageSize={10}>
      <Pagination.PrevTrigger aria-label="Previous page" />
      <Pagination.Pages>
        {({ pages, totalPages }) =>
          pages.map((page, index) =>
            page.type === 'page' ? (
              <Pagination.Item
                key={page.value}
                value={page.value}
                aria-label={
                  page.value === totalPages ? `Last page, page ${page.value}` : `Page ${page.value}`
                }
              />
            ) : (
              <Pagination.Ellipsis key={`${index}-ellipsis`} index={index} />
            )
          )
        }
      </Pagination.Pages>
      <Pagination.NextTrigger aria-label="Next page" />
    </Pagination>
  )
}

export const NoEllipsis: StoryFn = () => {
  return (
    <Pagination
      type="button"
      aria-label="Pagination"
      count={10}
      pageSize={1}
      visiblePageItems={5}
      noEllipsis
    >
      <Pagination.FirstPageTrigger aria-label="First page" />
      <Pagination.PrevTrigger aria-label="Previous page" />
      <Pagination.Pages>
        {({ pages, totalPages }) => {
          return pages.map(page =>
            page.type === 'page' ? (
              <Pagination.Item
                key={page.value}
                value={page.value}
                aria-label={
                  page.value === totalPages ? `Last page, page ${page.value}` : `Page ${page.value}`
                }
              >
                {page.value}
              </Pagination.Item>
            ) : null
          )
        }}
      </Pagination.Pages>
      <Pagination.NextTrigger aria-label="Next page" />
      <Pagination.LastPageTrigger aria-label="Last page" />
    </Pagination>
  )
}

export const VisiblePageItems: StoryFn = () => {
  const [visiblePageItems, setVisiblePageItems] = useState(5)

  return (
    <div className="mb-2xl">
      <FormField name="email" className="mb-xl">
        <FormField.Label>
          Visible page items (these are just example values, you can go above):
        </FormField.Label>
        <FormField.HelperMessage>
          For this particular story, we&apos;ve added numerical indicators values below each element
          to aid in visual comprehension⁠
        </FormField.HelperMessage>

        <RadioGroup
          value={`${visiblePageItems}`}
          onValueChange={v => setVisiblePageItems(+v)}
          orientation="horizontal"
        >
          <RadioGroup.Radio value="5">5</RadioGroup.Radio>
          <RadioGroup.Radio value="7">7</RadioGroup.Radio>
          <RadioGroup.Radio value="9">9</RadioGroup.Radio>
        </RadioGroup>
      </FormField>

      <Pagination
        type="button"
        aria-label="Pagination"
        count={1000}
        pageSize={10}
        visiblePageItems={visiblePageItems}
        className="[&>ul]:[counter-reset:list-number]"
      >
        <Pagination.PrevTrigger aria-label="Previous page" />
        <Pagination.Pages>
          {({ pages, totalPages }) =>
            pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  className="before:text-caption before:font-regular before:text-neutral/dim-2 relative [counter-increment:list-number] before:pointer-events-none before:absolute before:-bottom-full before:content-[counter(list-number)]"
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
                <Pagination.Ellipsis
                  className="before:text-caption before:text-neutral/dim-2 relative [counter-increment:list-number] before:pointer-events-none before:absolute before:-bottom-full before:content-[counter(list-number)]"
                  key={`${index}-ellipsis`}
                  index={index}
                />
              )
            )
          }
        </Pagination.Pages>
        <Pagination.NextTrigger aria-label="Next page" />
      </Pagination>
    </div>
  )
}

export const Controlled: StoryFn = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [items] = useState(
    Array.from({ length: 48 }, (_, i) => ({
      id: i + 1,
      name: `Article ${i + 1}`,
    }))
  )

  const pageSize = 5

  const currentPageItems = items.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize
  )

  return (
    <div className="gap-xl flex flex-col items-center justify-center">
      <div className="gap-md flex w-full flex-col">
        {currentPageItems.map(item => {
          return (
            <div key={item.id} className="bg-basic-container p-lg">
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
      <Pagination
        type="button"
        aria-label="Pagination"
        count={items.length}
        pageSize={pageSize}
        page={currentPage}
        onPageChange={details => {
          setCurrentPage(details.page)
        }}
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
    </div>
  )
}
