import React from 'react'

import { IconProps } from '../Types'

export const AlertOutline = ({
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
    data-title="AlertOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m12,7.13c-.58,0-1.05.47-1.05,1.05v4.82c0,.58.47,1.05,1.05,1.05s1.05-.47,1.05-1.05v-4.82c0-.58-.47-1.05-1.05-1.05Zm0,7.95c-.8,0-1.45.65-1.45,1.45s.65,1.45,1.45,1.45,1.45-.65,1.45-1.45-.65-1.45-1.45-1.45Z"/><path fill-rule="evenodd" d="m12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2Zm-7.89,10c0-4.36,3.53-7.89,7.89-7.89s7.89,3.53,7.89,7.89-3.53,7.89-7.89,7.89-7.89-3.53-7.89-7.89Z"/>',
    }}
  />
)

AlertOutline.displayName = 'AlertOutline'

export const tags = ['AlertOutline', '']
