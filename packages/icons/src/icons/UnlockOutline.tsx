import React from 'react'

import { IconProps } from '../Types'

export const UnlockOutline = ({
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
    data-title="UnlockOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m17.59,22H6.41c-1.33,0-2.41-1.07-2.41-2.38v-8.31c0-1.21.92-2.22,2.1-2.37v-1.1c0-1.56.61-3.03,1.73-4.13,1.12-1.11,2.59-1.74,4.2-1.71.77,0,1.52.15,2.24.44.72.3,1.36.73,1.91,1.28.39.39.39,1.02-.02,1.42-.4.38-1.04.38-1.43-.02-.36-.36-.77-.64-1.25-.83-.47-.19-.96-.27-1.48-.29-1.03,0-2.03.41-2.75,1.12-.72.72-1.14,1.69-1.14,2.72v1.07h9.48c1.33,0,2.41,1.07,2.41,2.38v8.31c0,1.32-1.08,2.38-2.41,2.38h0ZM6.41,10.93c-.21,0-.39.18-.39.38v8.31c0,.21.18.38.39.38h11.19c.21,0,.39-.17.39-.38v-8.31c0-.21-.18-.38-.39-.38H6.41Zm5.5,6.85c-1.11,0-2.02-.9-2.02-2s.91-2,2.02-2,2.02.9,2.02,2-.91,2-2.02,2Z"/>',
    }}
  />
)

UnlockOutline.displayName = 'UnlockOutline'

export const tags = ['UnlockOutline', '']
