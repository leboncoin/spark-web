import React from 'react'

import { IconProps } from '../Types'

export const DeleteFill = ({
  title,
  fill = 'currentColor',
  stroke = 'none',
  ref,
  ...props
}: IconProps) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-title="DeleteFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m2,12C2,6.48,6.48,2,12,2s10,4.48,10,10-4.48,10-10,10S2,17.52,2,12Zm7.75-3.67c-.39-.39-1.02-.39-1.41,0-.39.39-.39,1.02,0,1.41l2.23,2.23-2.23,2.23c-.39.39-.39,1.02,0,1.41.39.39,1.02.39,1.41,0l2.23-2.23,2.23,2.23c.39.39,1.02.39,1.41,0s.39-1.02,0-1.41l-2.23-2.23,2.23-2.23c.39-.39.39-1.02,0-1.41-.39-.39-1.02-.39-1.41,0l-2.23,2.23-2.23-2.23Z"/>',
    }}
  />
)

DeleteFill.displayName = 'DeleteFill'

export const tags = ['DeleteFill', '']
