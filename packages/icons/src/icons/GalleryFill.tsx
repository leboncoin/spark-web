import React from 'react'

import { IconProps } from '../Types'

export const GalleryFill = ({
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
    data-title="GalleryFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m4.36,5.81c-.11,0-.22.04-.29.11-.08.07-.12.17-.12.27v9.68c0,.5-.44.9-.97.9s-.97-.4-.97-.9V6.19c0-.58.25-1.14.69-1.55.44-.41,1.04-.64,1.67-.64h12.5c.54,0,.97.4.97.9s-.44.9-.97.9H4.36Z"/><path fill-rule="evenodd" d="m20.84,19.7c.69-.38,1.16-1.08,1.16-1.89v-8.39c0-1.21-1.06-2.19-2.36-2.19H7.83c-1.3,0-2.36.98-2.36,2.19v8.39c0,.86.54,1.61,1.31,1.97.07.04.14.07.21.09.26.09.54.14.84.14h11.81c.32,0,.63-.06.91-.17.1-.03.2-.07.29-.14Zm-.78-2.24l-4.57-4.45c-.22-.22-.49-.39-.79-.51-.3-.12-.62-.18-.95-.18-.33,0-.65.07-.95.19-.29.12-.56.3-.78.52l-4.61,4.52v-8.12c0-.21.19-.39.42-.39h11.81c.23,0,.42.17.42.39v8.04Z"/>',
    }}
  />
)

GalleryFill.displayName = 'GalleryFill'

export const tags = ['GalleryFill', '']
