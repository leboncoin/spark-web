import React from 'react'

import { IconProps } from '../Types'

export const UnlockFill = ({
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
    data-title="UnlockFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m17.59,8.92h-9.48v-1.07c0-1.03.4-1.99,1.14-2.72.73-.72,1.73-1.12,2.75-1.12.51.02,1.01.09,1.48.29.47.2.89.48,1.25.83.39.39,1.03.4,1.43.02.4-.38.4-1.02.02-1.42-.55-.55-1.2-.98-1.91-1.28-.72-.3-1.46-.43-2.26-.44-1.57,0-3.06.61-4.17,1.72-1.12,1.1-1.73,2.57-1.73,4.13v1.11c-1.18.15-2.1,1.14-2.1,2.35v8.31c0,1.32,1.08,2.38,2.41,2.38h11.19c1.33,0,2.41-1.07,2.41-2.38v-8.31c0-1.32-1.08-2.38-2.41-2.38h0Zm-5.68,8.85c-1.11,0-2.02-.9-2.02-2s.91-2,2.02-2,2.02.9,2.02,2-.91,2-2.02,2Z"/>',
    }}
  />
)

UnlockFill.displayName = 'UnlockFill'

export const tags = ['UnlockFill', '']
