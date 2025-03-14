import React from 'react'

import { IconProps } from '../Types'

export const LockOutline = ({
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
    data-title="LockOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m17.59,22H6.41c-1.33,0-2.41-1.07-2.41-2.38v-8.31c0-1.21.92-2.22,2.1-2.37v-1.1c0-1.56.61-3.03,1.73-4.13,1.12-1.1,2.6-1.71,4.18-1.71s3.06.61,4.17,1.71c1.12,1.11,1.73,2.58,1.73,4.13v1.1c1.18.15,2.1,1.15,2.1,2.37v8.31c0,1.32-1.08,2.38-2.41,2.38ZM6.41,10.93c-.21,0-.39.18-.39.38v8.31c0,.21.18.38.39.38h11.19c.21,0,.39-.17.39-.38v-8.31c0-.21-.18-.38-.39-.38H6.41Zm1.71-2h7.77v-1.07c0-1.03-.4-1.99-1.14-2.72-.73-.72-1.71-1.12-2.74-1.12s-2.01.4-2.74,1.12c-.73.72-1.14,1.69-1.14,2.72v1.07h0Zm3.8,8.74c-1.11,0-2.02-.9-2.02-2s.91-2,2.02-2,2.02.9,2.02,2-.91,2-2.02,2Z"/>',
    }}
  />
)

LockOutline.displayName = 'LockOutline'

export const tags = ['LockOutline', '']
