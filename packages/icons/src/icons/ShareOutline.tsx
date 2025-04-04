import React from 'react'

import { IconProps } from '../Types'

export const ShareOutline = ({
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
    data-title="ShareOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m14.46,5.77v.03s-6.92,2.87-6.92,2.87c-.53-.28-1.13-.44-1.78-.44-2.08,0-3.77,1.69-3.77,3.77s1.69,3.77,3.77,3.77c.64,0,1.25-.16,1.78-.44l6.92,2.87s0,.02,0,.03c0,2.08,1.69,3.77,3.77,3.77s3.77-1.69,3.77-3.77-1.69-3.77-3.77-3.77c-1.36,0-2.55.72-3.22,1.8l-5.93-2.46c.29-.53.46-1.15.46-1.8s-.17-1.26-.46-1.8l5.93-2.46c.66,1.08,1.86,1.8,3.22,1.8,2.08,0,3.77-1.69,3.77-3.77s-1.69-3.77-3.77-3.77-3.77,1.69-3.77,3.77Zm3.77-1.77c-.98,0-1.77.79-1.77,1.77,0,.13.01.25.04.37.01.04.02.08.03.12.21.74.89,1.28,1.7,1.28.98,0,1.77-.79,1.77-1.77s-.79-1.77-1.77-1.77ZM6.89,13.37c.4-.32.65-.82.65-1.37s-.25-1.05-.65-1.37c-.03-.02-.07-.05-.1-.07-.29-.2-.64-.32-1.02-.32-.98,0-1.77.79-1.77,1.77s.79,1.77,1.77,1.77c.38,0,.73-.12,1.02-.32.03-.03.06-.05.1-.07Zm9.61,4.49s.02-.08.03-.12c.21-.74.89-1.28,1.7-1.28.98,0,1.77.79,1.77,1.77s-.79,1.77-1.77,1.77-1.77-.79-1.77-1.77c0-.13.01-.25.04-.37Z"/>',
    }}
  />
)

ShareOutline.displayName = 'ShareOutline'

export const tags = ['ShareOutline', '']
