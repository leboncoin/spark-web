import React from 'react'

import { IconProps } from '../Types'

export const InfoFill = ({
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
    data-title="InfoFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m2,12C2,6.48,6.48,2,12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12Zm11.02,4.52c0,.58-.47,1.05-1.05,1.05s-1.05-.47-1.05-1.05v-4.82c0-.58.47-1.05,1.05-1.05s1.05.47,1.05,1.05v4.82Zm.4-8.36c0,.8-.65,1.45-1.45,1.45s-1.45-.65-1.45-1.45.65-1.45,1.45-1.45,1.45.65,1.45,1.45Z"/>',
    }}
  />
)

InfoFill.displayName = 'InfoFill'

export const tags = ['InfoFill', '']
