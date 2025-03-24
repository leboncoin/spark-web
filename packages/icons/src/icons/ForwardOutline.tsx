import React from 'react'

import { IconProps } from '../Types'

export const ForwardOutline = ({
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
    data-title="ForwardOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m13.69,3.33c.37-.16.8-.07,1.09.22l6.92,7.03c.38.38.39,1,.03,1.4l-6.92,7.73c-.28.31-.72.42-1.1.26-.39-.15-.64-.53-.64-.95v-3.2h-1.08c-1.82,0-2.87.32-3.93,1-.83.53-1.65,1.25-2.81,2.28-.47.42-1,.88-1.61,1.4-.34.29-.84.32-1.21.07-.37-.26-.53-.73-.39-1.16.13-.39.26-.82.4-1.28.58-1.88,1.29-4.2,2.47-6.14,1.52-2.51,3.88-4.53,7.77-4.53h.38v-3.2c0-.41.24-.78.62-.94Zm1.38,3.39v1.77c0,.56-.45,1.02-1,1.02h-1.38c-3.03,0-4.82,1.5-6.07,3.56-.67,1.1-1.16,2.32-1.58,3.55.7-.6,1.33-1.1,1.96-1.5,1.44-.91,2.87-1.31,5-1.31h2.08c.55,0,1,.45,1,1.02v1.59l4.54-5.07-4.54-4.61Z"/>',
    }}
  />
)

ForwardOutline.displayName = 'ForwardOutline'

export const tags = ['ForwardOutline', '']
