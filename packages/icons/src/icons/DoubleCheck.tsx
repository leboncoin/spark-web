import React from 'react'

import { IconProps } from '../Types'

export const DoubleCheck = ({
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
    data-title="DoubleCheck"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m21.57,6.07c-.51-.44-1.35-.44-1.78.09l-7.7,9.14-.25-.35c-.25-.44-.76-.7-1.19-.61l5.42-6.44c.25-.26.34-.61.34-.96s-.17-.7-.42-.87c-.25-.17-.59-.26-.85-.26-.34,0-.68.17-.85.44l-7.79,9.14-2.29-2.78c-.42-.61-1.19-.7-1.78-.17-.51.44-.59,1.22-.17,1.74l2.54,3.13c.17.26.42.44.76.61.25.17.59.17.93.26.34,0,.59-.09.93-.17.25-.17.59-.35.76-.61l1.44-1.65c0,.17.08.44.17.61l.51.87c0,.09.08.09.08.17.17.26.42.44.76.61.25.17.59.17.93.26.34,0,.59-.09.85-.17.25-.17.59-.35.76-.61l7.96-9.49c.51-.61.42-1.39-.08-1.91Z"/>',
    }}
  />
)

DoubleCheck.displayName = 'DoubleCheck'

export const tags = ['DoubleCheck', '']
