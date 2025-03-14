import React from 'react'

import { IconProps } from '../Types'

export const LockFill = ({
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
    data-title="LockFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m17.9,8.96v-1.11c0-1.54-.63-3.04-1.73-4.13-1.12-1.11-2.6-1.72-4.17-1.72s-3.06.61-4.17,1.72c-1.12,1.1-1.73,2.58-1.73,4.13v1.11c-1.18.15-2.1,1.14-2.1,2.35v8.31c0,1.32,1.08,2.38,2.41,2.38h11.19c1.33,0,2.41-1.07,2.41-2.38v-8.31c0-1.21-.92-2.2-2.1-2.35h0Zm-5.99,8.82c-1.11,0-2.02-.9-2.02-2s.91-2,2.02-2,2.02.9,2.02,2-.91,2-2.02,2Zm3.97-8.85h-7.77v-1.07c0-1.03.4-1.99,1.14-2.72.73-.72,1.71-1.12,2.74-1.12s2.01.4,2.74,1.12c.72.72,1.14,1.71,1.14,2.72v1.07h0Z"/>',
    }}
  />
)

LockFill.displayName = 'LockFill'

export const tags = ['LockFill', '']
