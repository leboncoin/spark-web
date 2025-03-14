import React from 'react'

import { IconProps } from '../Types'

export const ProfileFill = ({
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
    data-title="ProfileFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m5.13,19.27c-1.93-1.82-3.13-4.4-3.13-7.27C2,6.48,6.48,2,12,2s10,4.48,10,10c0,2.86-1.2,5.44-3.13,7.27h0s-.2.18-.2.18c-1.77,1.59-4.11,2.56-6.68,2.56s-4.9-.97-6.68-2.55l-.2-.17h0Zm6.87-6.85c1.96,0,3.54-1.59,3.54-3.54s-1.59-3.54-3.54-3.54-3.54,1.59-3.54,3.54,1.59,3.54,3.54,3.54Zm-6.25,4.69c1.67,2.08,4.33,2.92,6.67,2.92s5-1.67,5.83-2.92c-.83-.97-3.58-2.92-6.25-2.92s-5.28,1.94-6.25,2.92Z"/>',
    }}
  />
)

ProfileFill.displayName = 'ProfileFill'

export const tags = ['ProfileFill', '']
