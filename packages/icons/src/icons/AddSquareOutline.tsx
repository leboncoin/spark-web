import React from 'react'

import { IconProps } from '../Types'

export const AddSquareOutline = ({
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
    data-title="AddSquareOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m12,6.84c.56,0,1.01.45,1.01,1.01v3.14h3.14c.56.02.99.5.96,1.05-.02.52-.44.94-.96.96h-3.14v3.14c0,.56-.45,1.01-1.01,1.01-.56,0-1.01-.45-1.01-1.01h0v-3.14h-3.14c-.56,0-1.01-.45-1.01-1.01,0-.56.45-1.01,1.01-1.01h3.14v-3.14c0-.56.45-1.01,1.01-1.01h0Z"/><path fill-rule="evenodd" d="m7.16,2c-2.85,0-5.16,2.31-5.16,5.16h0v9.68c0,2.85,2.31,5.16,5.16,5.16h9.68c2.85,0,5.16-2.31,5.16-5.16V7.16c0-2.85-2.31-5.16-5.16-5.16H7.16Zm-3.14,5.16c0-1.73,1.4-3.14,3.14-3.14h9.68c1.73,0,3.14,1.4,3.14,3.14h0v9.68c0,1.73-1.4,3.14-3.14,3.14H7.16c-1.73,0-3.14-1.4-3.14-3.14h0V7.16h0Z"/>',
    }}
  />
)

AddSquareOutline.displayName = 'AddSquareOutline'

export const tags = ['AddSquareOutline', '']
