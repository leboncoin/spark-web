import React from 'react'

import { IconProps } from '../Types'

export const WarningOutline = ({
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
    data-title="WarningOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,8.23c.55,0,1,.45,1,1v4.58c0,.55-.45,1-1,1s-1-.45-1-1v-4.58c0-.55.45-1,1-1Z"/><path d="m12,18.06c.69,0,1.25-.56,1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25,1.25.56,1.25,1.25,1.25Z"/><path fill-rule="evenodd" d="m10.76,2.35c.37-.23.8-.35,1.24-.35s.87.12,1.24.35c.37.23.68.56.88.95h0s7.62,15.24,7.62,15.24h0c.18.36.27.77.25,1.17-.02.41-.14.8-.35,1.15-.21.35-.51.63-.86.83-.35.2-.75.3-1.16.31H4.38c-.41,0-.81-.11-1.16-.31-.35-.2-.65-.49-.86-.83-.21-.35-.33-.74-.35-1.15-.02-.41.07-.81.25-1.17h0S9.88,3.3,9.88,3.3c.2-.39.5-.72.88-.95Zm1.24,1.65c-.07,0-.14.02-.2.06-.06.04-.11.09-.14.15l-7.62,15.23h0c-.03.06-.04.13-.04.19,0,.07.02.13.06.19.03.06.08.1.14.13.06.03.12.05.19.05h15.23c.07,0,.13-.02.19-.05.06-.03.11-.08.14-.13.03-.06.05-.12.06-.19,0-.07-.01-.13-.04-.19h0s-7.62-15.23-7.62-15.23c-.03-.06-.08-.11-.14-.15-.06-.04-.13-.06-.2-.06Z"/>',
    }}
  />
)

WarningOutline.displayName = 'WarningOutline'

export const tags = ['WarningOutline', '']
