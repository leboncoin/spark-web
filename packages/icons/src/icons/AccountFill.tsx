import React from 'react'

import { IconProps } from '../Types'

export const AccountFill = ({
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
    data-title="AccountFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m12,2c-2.81,0-5.09,2.24-5.09,5s2.28,5,5.09,5,5.09-2.24,5.09-5-2.28-5-5.09-5Z"/><path fill-rule="evenodd" d="m18.23,14.89c1.77,1.35,2.94,3.41,2.94,6.11,0,.55-.46,1-1.02,1H3.85c-.56,0-1.02-.45-1.02-1,0-2.63,1.18-4.66,2.94-6.02,1.73-1.34,4-1.99,6.22-2.01,2.22-.02,4.49.6,6.24,1.93Z"/>',
    }}
  />
)

AccountFill.displayName = 'AccountFill'

export const tags = ['AccountFill', '']
