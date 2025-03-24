import React from 'react'

import { IconProps } from '../Types'

export const KeyOutline = ({
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
    data-title="KeyOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m7.91,13.61c-.9,0-1.64-.73-1.64-1.61s.74-1.61,1.64-1.61,1.64.73,1.64,1.61-.74,1.61-1.64,1.61Z"/><path fill-rule="evenodd" d="m6.71,6.28c2.8-.55,5.35.87,6.48,3.11h6.17c1.45,0,2.64,1.16,2.64,2.61,0,1.09-.68,2.02-1.64,2.41v.82c0,1.44-1.19,2.61-2.64,2.61s-2.64-1.17-2.64-2.61v-.62h-1.9c-.97,1.91-2.97,3.23-5.28,3.23-3.67,0-6.58-3.33-5.77-7.09.48-2.24,2.31-4.01,4.57-4.46h0Zm4.88,4.44c-.62-1.72-2.44-2.89-4.49-2.49-1.49.29-2.7,1.47-3,2.93h0c-.53,2.48,1.37,4.69,3.82,4.69,1.7,0,3.15-1.07,3.68-2.57l.24-.66h5.27v2.61c0,.33.28.62.64.62s.64-.29.64-.62v-2.61h1c.35,0,.64-.29.64-.62s-.28-.62-.64-.62h-7.54l-.24-.66Z"/>',
    }}
  />
)

KeyOutline.displayName = 'KeyOutline'

export const tags = ['KeyOutline', '']
