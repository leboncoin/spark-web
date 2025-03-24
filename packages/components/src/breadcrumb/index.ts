import { Breadcrumb as Root } from './Breadcrumb'
import { CurrentPage } from './BreadcrumbCurrentPage'
import { Item } from './BreadcrumbItem'
import { Link } from './BreadcrumbLink'
import { Separator } from './BreadcrumbSeparator'

export const Breadcrumb: typeof Root & {
  Item: typeof Item
  Link: typeof Link
  CurrentPage: typeof CurrentPage
  Separator: typeof Separator
} = Object.assign(Root, {
  Item,
  Link,
  CurrentPage,
  Separator,
})

Breadcrumb.displayName = 'Breadcrumb'
Item.displayName = 'Breadcrumb.Item'
Link.displayName = 'Breadcrumb.Link'
CurrentPage.displayName = 'Breadcrumb.CurrentPage'
Separator.displayName = 'Breadcrumb.Separator'

export type { BreadcrumbProps } from './Breadcrumb'
