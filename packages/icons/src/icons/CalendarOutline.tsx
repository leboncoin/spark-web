import React from 'react'

import { IconProps } from '../Types'

export const CalendarOutline = ({
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
    data-title="CalendarOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m7.52,2c.58,0,1.04.45,1.04,1v.71h6.87v-.71c0-.55.47-1,1.04-1s1.04.45,1.04,1v.71h.75c2.06,0,3.73,1.59,3.73,3.57v11.15c0,1.97-1.67,3.57-3.73,3.57H5.73c-2.06,0-3.73-1.6-3.73-3.57V7.29c0-1.97,1.67-3.57,3.73-3.57h.75v-.71c0-.55.47-1,1.04-1Zm-1.04,3.71h-.75c-.91,0-1.64.7-1.64,1.57v1.57h15.82v-1.58c0-.87-.73-1.57-1.64-1.57h-.75v.71c0,.55-.47,1-1.04,1s-1.04-.45-1.04-1v-.71h-6.87v.71c0,.55-.47,1-1.04,1s-1.04-.45-1.04-1v-.71Zm13.43,5.14H4.09v7.57c0,.87.73,1.57,1.64,1.57h12.55c.91,0,1.64-.7,1.64-1.57v-7.58Zm-14.33,2.43c0-.55.47-1,1.04-1h7.16c.58,0,1.04.45,1.04,1s-.47,1-1.04,1h-7.16c-.58,0-1.04-.45-1.04-1Zm0,3c0-.55.47-1,1.04-1h3.58c.58,0,1.04.45,1.04,1s-.47,1-1.04,1h-3.58c-.58,0-1.04-.45-1.04-1Z"/>',
    }}
  />
)

CalendarOutline.displayName = 'CalendarOutline'

export const tags = ['CalendarOutline', '']
