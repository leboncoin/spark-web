import React from 'react'

import { IconProps } from '../Types'

export const PlayOutline = ({
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
    data-title="PlayOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,3.94C7.55,3.94,3.94,7.55,3.94,12s3.61,8.06,8.06,8.06,8.06-3.61,8.06-8.06S16.45,3.94,12,3.94ZM2,12C2,6.48,6.48,2,12,2s10,4.48,10,10-4.48,10-10,10S2,17.52,2,12Z"/><path fill-rule="evenodd" d="m9.45,7.68c.31-.17.69-.16.99.03l5.56,3.47c.28.18.46.49.46.82s-.17.65-.46.82l-5.56,3.47c-.3.19-.68.2-.99.03-.31-.17-.5-.5-.5-.85v-6.94c0-.35.19-.68.5-.85Zm1.44,2.6v3.44l2.75-1.72-2.75-1.72Z"/>',
    }}
  />
)

PlayOutline.displayName = 'PlayOutline'

export const tags = ['PlayOutline', '']
