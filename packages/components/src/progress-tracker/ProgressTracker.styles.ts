import { cx } from 'class-variance-authority'

export const progressList = cx([
  'flex flex-nowrap items-start group/list',
  'data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:w-full',
  'data-[orientation=vertical]:flex-col',
])
