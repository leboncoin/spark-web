import React from 'react'

import { IconProps } from '../Types'

export const Check = ({
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
    data-title="Check"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m8.92,19.08c-.18,0-.36-.03-.53-.1s-.33-.17-.47-.31l-5.49-5.34c-.28-.28-.42-.61-.42-1s.14-.73.42-1c.28-.28.62-.41,1.02-.41s.74.14,1.05.41l4.43,4.3,10.62-10.29c.28-.28.62-.42,1.02-.43.39,0,.73.13,1.02.43.28.28.42.61.42,1s-.14.73-.42,1l-11.65,11.32c-.14.14-.3.24-.47.31-.17.07-.35.1-.53.1Z"/>',
    }}
  />
)

Check.displayName = 'Check'

export const tags = ['Check', '']
