import React from 'react'

import { IconProps } from '../Types'

export const AlarmOutline = ({
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
    data-title="AlarmOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m14.1,4.03c1.05.34,2.02.92,2.81,1.72,1.3,1.31,2.03,3.08,2.03,4.93,0,2.8.47,4.35.96,5.25.39.72.58,1.6.26,2.39-.36.88-1.21,1.3-2.15,1.3h-2.94c-.18.69-.58,1.29-1.13,1.72-.56.43-1.24.66-1.95.66s-1.39-.23-1.95-.66c-.56-.43-.96-1.03-1.13-1.72h0s-2.94,0-2.94,0c-.95,0-1.79-.42-2.15-1.3-.32-.79-.13-1.67.26-2.39.49-.9.96-2.44.96-5.25,0-1.85.73-3.62,2.03-4.93.79-.8,1.76-1.38,2.81-1.72.04-1.13.97-2.03,2.1-2.03s2.06.9,2.1,2.03Zm-2.1,1.69c1.31,0,2.56.52,3.48,1.45.92.93,1.44,2.19,1.44,3.5,0,3.02.51,4.93,1.21,6.21.22.41.17.63.16.66h0s-.09.05-.28.05H5.98c-.18,0-.26-.04-.28-.05h0s-.06-.25.16-.66c.7-1.29,1.21-3.2,1.21-6.22,0-1.31.52-2.57,1.44-3.5.92-.93,2.18-1.45,3.48-1.45Z"/>',
    }}
  />
)

AlarmOutline.displayName = 'AlarmOutline'

export const tags = ['AlarmOutline', '']
