import React from 'react'

import { IconProps } from '../Types'

export const PenOutline = ({
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
    data-title="PenOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m17.16,3.95c-.06,0-.11.01-.16.03-.05.02-.1.05-.14.09h0S5.6,15.29,5.6,15.29l-1.21,4.33,4.33-1.21,11.21-11.26s.07-.08.09-.13c.02-.05.03-.1.03-.16s-.01-.11-.03-.16c-.02-.05-.05-.1-.09-.13h0s-2.46-2.48-2.46-2.48c-.04-.04-.08-.07-.14-.09-.05-.02-.11-.03-.16-.03Zm-.92-1.77c.29-.12.6-.19.92-.19s.63.06.92.19c.29.12.55.3.77.52l2.45,2.46h0c.22.22.4.48.51.77.12.29.18.6.18.91s-.06.62-.18.91c-.12.29-.29.55-.51.77h0s-11.38,11.44-11.38,11.44c-.12.12-.27.21-.43.25l-6.25,1.75c-.34.09-.7,0-.95-.25-.25-.25-.34-.61-.25-.95l1.75-6.25c.05-.16.13-.31.25-.43L15.48,2.71c.22-.22.48-.4.77-.52Z"/>',
    }}
  />
)

PenOutline.displayName = 'PenOutline'

export const tags = ['PenOutline', '']
