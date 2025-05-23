import React from 'react'

import { IconProps } from '../Types'

export const BoxFill = ({
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
    data-title="BoxFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m2,9.69v9.87c0,.64.24,1.21.73,1.7.4.4,1.05.73,1.69.73h15.16c.64,0,1.21-.24,1.69-.73.4-.4.73-1.05.73-1.7v-9.87H2Zm12.01,6.88h3.46c.56,0,.96.4.96.97s-.4.97-.96.97h-3.46c-.56,0-.96-.4-.96-.97s.4-.97.96-.97Zm-3.06-14.58h-3.55c-.64.08-1.37.24-1.93.64-.56.32-.96.81-1.29,1.46l-1.78,3.36h8.56V2Zm8.79,2.11c-.32-.64-.81-1.13-1.37-1.54-.56-.4-1.29-.57-1.93-.57h-3.55v5.46h8.56l-1.71-3.36h0Z"/>',
    }}
  />
)

BoxFill.displayName = 'BoxFill'

export const tags = ['BoxFill', '']
