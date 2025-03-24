import React from 'react'

import { IconProps } from '../Types'

export const PinFill = ({
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
    data-title="PinFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m4,9.75c0-4.28,3.58-7.75,8-7.75s8,3.47,8,7.75c0,1.14-.41,2.45-.97,3.72-.57,1.29-1.34,2.63-2.15,3.84-.81,1.21-1.67,2.31-2.43,3.12-.38.4-.76.76-1.11,1.02-.18.13-.37.26-.57.35-.19.09-.46.19-.77.19s-.58-.1-.77-.19c-.2-.09-.39-.22-.57-.35-.35-.26-.73-.62-1.11-1.02-.77-.81-1.63-1.92-2.43-3.12-.81-1.21-1.58-2.55-2.15-3.84-.56-1.27-.97-2.59-.97-3.72Zm8,1.82c1.52,0,2.76-1.2,2.76-2.67s-1.24-2.67-2.76-2.67-2.76,1.2-2.76,2.67,1.24,2.67,2.76,2.67Z"/>',
    }}
  />
)

PinFill.displayName = 'PinFill'

export const tags = ['PinFill', '']
