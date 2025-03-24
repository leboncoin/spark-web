import React from 'react'

import { IconProps } from '../Types'

export const ClockOutline = ({
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
    data-title="ClockOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,3.97C7.56,3.97,3.97,7.56,3.97,12s3.6,8.03,8.03,8.03,8.03-3.6,8.03-8.03S16.44,3.97,12,3.97ZM2,12C2,6.48,6.48,2,12,2s10,4.48,10,10-4.48,10-10,10S2,17.52,2,12Z"/><path fill-rule="evenodd" d="m12,7.55c.54,0,.98.44.98.98v3.1l3.29,3.83c.35.41.31,1.03-.11,1.39-.41.35-1.03.31-1.39-.11l-3.52-4.11c-.15-.18-.24-.41-.24-.64v-3.47c0-.54.44-.98.98-.98Z"/>',
    }}
  />
)

ClockOutline.displayName = 'ClockOutline'

export const tags = ['ClockOutline', '']
