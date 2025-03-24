import React from 'react'

import { IconProps } from '../Types'

export const DeleteOutline = ({
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
    data-title="DeleteOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,4c-4.42,0-8,3.58-8,8s3.58,8,8,8,8-3.58,8-8-3.58-8-8-8ZM2,12C2,6.48,6.48,2,12,2s10,4.48,10,10-4.48,10-10,10S2,17.52,2,12Zm6.33-3.67c.39-.39,1.02-.39,1.41,0l2.23,2.23,2.23-2.23c.39-.39,1.02-.39,1.41,0,.39.39.39,1.02,0,1.41l-2.23,2.23,2.23,2.23c.39.39.39,1.02,0,1.41-.39.39-1.02.39-1.41,0l-2.23-2.23-2.23,2.23c-.39.39-1.02.39-1.41,0-.39-.39-.39-1.02,0-1.41l2.23-2.23-2.23-2.23c-.39-.39-.39-1.02,0-1.41Z"/>',
    }}
  />
)

DeleteOutline.displayName = 'DeleteOutline'

export const tags = ['DeleteOutline', '']
