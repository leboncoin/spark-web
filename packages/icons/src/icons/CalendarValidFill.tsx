import React from 'react'

import { IconProps } from '../Types'

export const CalendarValidFill = ({
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
    data-title="CalendarValidFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m16.29,11.69c.42.37.45,1.01.06,1.41l-4.8,4.97h0c-.16.17-.35.29-.56.37-.21.08-.43.12-.65.12-.22,0-.45-.05-.66-.14-.21-.09-.4-.22-.55-.39h0s-1.5-1.65-1.5-1.65c-.38-.42-.33-1.05.1-1.41s1.1-.32,1.47.1l1.16,1.28,4.45-4.61c.39-.41,1.05-.43,1.48-.06Z"/><path fill-rule="evenodd" d="m8.57,3c0-.55-.47-1-1.04-1s-1.04.45-1.04,1v.71h-.75c-2.06,0-3.73,1.6-3.73,3.57v11.14c0,1.97,1.66,3.57,3.73,3.57h12.55c2.06,0,3.73-1.59,3.73-3.57V7.28c0-1.91-1.56-3.46-3.52-3.56-.07,0-.14,0-.21,0h-.75v-.71c0-.55-.47-1-1.04-1s-1.04.45-1.04,1v.71h-6.87v-.71Zm11.34,6.69H4.09v8.74c0,.87.73,1.57,1.64,1.57h12.55c.91,0,1.64-.7,1.64-1.57v-8.74Z"/>',
    }}
  />
)

CalendarValidFill.displayName = 'CalendarValidFill'

export const tags = ['CalendarValidFill', '']
