import type { FC } from 'react'

import { Pagination as Root, type PaginationProps } from './Pagination'
import { Ellipsis } from './PaginationEllipsis'
import { FirstPageTrigger } from './PaginationFirstPageTrigger'
import { Item } from './PaginationItem'
import { LastPageTrigger } from './PaginationLastPageTrigger'
import { NextTrigger } from './PaginationNextTrigger'
import { Pages } from './PaginationPages'
import { PrevTrigger } from './PaginationPrevTrigger'

export const Pagination: FC<PaginationProps> & {
  PrevTrigger: typeof PrevTrigger
  NextTrigger: typeof NextTrigger
  Pages: typeof Pages
  Item: typeof Item
  Ellipsis: typeof Ellipsis
  FirstPageTrigger: typeof FirstPageTrigger
  LastPageTrigger: typeof LastPageTrigger
} = Object.assign(Root, {
  PrevTrigger,
  NextTrigger,
  Pages,
  Item,
  Ellipsis,
  FirstPageTrigger,
  LastPageTrigger,
})

Pagination.displayName = 'Pagination'

PrevTrigger.displayName = 'Pagination.PrevTrigger'
NextTrigger.displayName = 'Pagination.NextTrigger'
Pages.displayName = 'Pagination.Pages'
Item.displayName = 'Pagination.Item'
Ellipsis.displayName = 'Pagination.Ellipsis'
FirstPageTrigger.displayName = 'Pagination.FirstPageTrigger'
LastPageTrigger.displayName = 'Pagination.LastPageTrigger'
