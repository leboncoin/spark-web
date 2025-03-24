import React from 'react'

import { IconProps } from '../Types'

export const Computer = ({
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
    data-title="Computer"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m22,1H2C.9,1,0,1.92,0,3.05v13.64c0,1.13.9,2.05,2,2.05h6.61l-.73,1.87h-.88c-.64,0-1.17.53-1.17,1.2s.52,1.2,1.17,1.2h10c.64,0,1.17-.53,1.17-1.2s-.52-1.2-1.17-1.2h-.88l-.73-1.87h6.61c1.1,0,2-.92,2-2.05V3.05c0-1.13-.9-2.05-2-2.05Zm-8.39,19.62h-3.22l.73-1.87h1.75l.73,1.87h0Zm8.06-4.27H2.33V3.38h19.33v12.96h.01Z"/>',
    }}
  />
)

Computer.displayName = 'Computer'

export const tags = ['Computer', '']
