import React from 'react'

import { IconProps } from '../Types'

export const AccountOutline = ({
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
    data-title="AccountOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,4.19c-1.6,0-2.93,1.26-2.93,2.84s1.33,2.84,2.93,2.84,2.93-1.26,2.93-2.84-1.33-2.84-2.93-2.84Zm-5.23,2.84c0-2.77,2.32-5.03,5.23-5.03s5.23,2.27,5.23,5.03-2.32,5.03-5.23,5.03-5.23-2.27-5.23-5.03Zm5.23,8.54c-1.85,0-3.63.71-4.95,1.98-1.01.97-1.68,2.21-1.94,3.55-.12.6-.72.99-1.34.88-.63-.11-1.04-.68-.92-1.28.34-1.76,1.23-3.4,2.56-4.69,1.74-1.68,4.11-2.63,6.59-2.63s4.84.95,6.59,2.63c1.34,1.29,2.22,2.93,2.56,4.69.12.6-.3,1.17-.92,1.28-.63.11-1.23-.28-1.34-.88-.26-1.34-.93-2.58-1.94-3.55-1.31-1.27-3.09-1.98-4.95-1.98Z"/>',
    }}
  />
)

AccountOutline.displayName = 'AccountOutline'

export const tags = ['AccountOutline', '']
