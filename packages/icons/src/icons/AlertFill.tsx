import React from 'react'

import { IconProps } from '../Types'

export const AlertFill = ({
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
    data-title="AlertFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m2,12C2,6.48,6.48,2,12,2s10,4.48,10,10-4.48,10-10,10S2,17.52,2,12Zm8.51,4.12c0-.8.65-1.45,1.45-1.45s1.45.65,1.45,1.45-.65,1.45-1.45,1.45-1.45-.65-1.45-1.45Zm.4-8.36c0-.58.47-1.05,1.05-1.05s1.05.47,1.05,1.05v4.82c0,.58-.47,1.05-1.05,1.05s-1.05-.47-1.05-1.05v-4.82Z"/>',
    }}
  />
)

AlertFill.displayName = 'AlertFill'

export const tags = ['AlertFill', '']
