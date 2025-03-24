import React from 'react'

import { IconProps } from '../Types'

export const Import = ({
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
    data-title="Import"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,2c.55,0,1,.45,1,1v9.76s2.39-2.79,2.39-2.79c.36-.42.99-.47,1.41-.11.42.36.47.99.11,1.41l-4.15,4.85c-.19.22-.47.35-.76.35s-.57-.13-.76-.35l-4.15-4.85c-.36-.42-.31-1.05.11-1.41.42-.36,1.05-.31,1.41.11l2.39,2.79V3c0-.55.45-1,1-1ZM3,15.85c.55,0,1,.45,1,1v1.38c0,.47.19.92.52,1.25.33.33.78.52,1.25.52h12.46c.47,0,.92-.19,1.25-.52.33-.33.52-.78.52-1.25v-1.38c0-.55.45-1,1-1s1,.45,1,1v1.38c0,1-.4,1.96-1.1,2.67s-1.67,1.1-2.67,1.1H5.77c-1,0-1.96-.4-2.67-1.1-.71-.71-1.1-1.67-1.1-2.67v-1.38c0-.55.45-1,1-1Z"/>',
    }}
  />
)

Import.displayName = 'Import'

export const tags = ['Import', '']
