import React from 'react'

import { IconProps } from '../Types'

export const ImageFill = ({
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
    data-title="ImageFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m20.06,14.77c-.82-.18-1.67-.27-2.51-.27-1.41,0-2.81.24-4.13.73-.34-.36-.7-.7-1.09-1.01-2.06-1.67-4.64-2.55-7.29-2.5-.36,0-.73.02-1.09.05v-7.41c0-.23.19-.42.42-.42h15.27c.23,0,.42.19.42.42v10.41Zm-.42,7.23h-4.3s-.02,0-.04,0H4.37c-1.3,0-2.36-1.06-2.36-2.36v-6.59c-.02-.11-.02-.22,0-.33V4.36c0-1.3,1.06-2.36,2.36-2.36h15.27c1.3,0,2.36,1.06,2.36,2.36v15.28c0,1.3-1.06,2.36-2.36,2.36ZM15.12,5.47c-1.88,0-3.4,1.52-3.4,3.4s1.52,3.4,3.4,3.4,3.4-1.52,3.4-3.4-1.52-3.4-3.4-3.4Z"/>',
    }}
  />
)

ImageFill.displayName = 'ImageFill'

export const tags = ['ImageFill', '']
