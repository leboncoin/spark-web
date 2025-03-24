import React from 'react'

import { IconProps } from '../Types'

export const PlayFill = ({
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
    data-title="PlayFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m2,11.97c0,5.52,4.48,10,10,10s10-4.48,10-10c-.53-13.26-19.48-13.26-20,0Zm7.69,3.85v-7.69l6.15,3.85-6.15,3.85Z"/>',
    }}
  />
)

PlayFill.displayName = 'PlayFill'

export const tags = ['PlayFill', '']
