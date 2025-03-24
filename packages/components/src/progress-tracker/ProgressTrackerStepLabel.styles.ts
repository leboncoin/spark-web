import { cva } from 'class-variance-authority'

export const stepLabel = cva([
  'flex text-body-2 font-bold',
  'text-on-surface group-disabled/btn:text-on-surface/dim-1',
  'group-data-[orientation=horizontal]/list:mt-md',
  'group-data-[orientation=vertical]/list:ml-md',
  'group-data-[orientation=vertical]/list:my-auto',
])
