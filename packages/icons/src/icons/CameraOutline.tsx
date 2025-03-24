import React from 'react'

import { IconProps } from '../Types'

export const CameraOutline = ({
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
    data-title="CameraOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m12,8.54c-2.27,0-4.12,1.86-4.12,4.16s1.84,4.16,4.12,4.16,4.12-1.86,4.12-4.16-1.84-4.16-4.12-4.16Zm-2.12,4.16c0-1.18.95-2.14,2.12-2.14s2.12.96,2.12,2.14-.95,2.14-2.12,2.14-2.12-.96-2.12-2.14Z"/><path fill-rule="evenodd" d="m9.23,4c-.31,0-.61.15-.8.4l-1.78,2.39h-2.27c-.63,0-1.24.25-1.69.71-.45.45-.7,1.06-.7,1.7v8.39c0,.64.25,1.25.7,1.7.45.45,1.05.71,1.69.71h15.23c.63,0,1.24-.25,1.69-.71.45-.45.7-1.06.7-1.7v-8.39c0-.64-.25-1.25-.7-1.7-.45-.45-1.05-.71-1.69-.71h-2.27l-1.78-2.39c-.19-.25-.49-.4-.8-.4h-5.54Zm-1.28,4.41l1.78-2.39h4.54l1.78,2.39c.19.25.49.4.8.4h2.77c.1,0,.2.04.27.11.07.07.11.17.11.27v8.39c0,.1-.04.2-.11.27-.07.07-.17.11-.27.11H4.38c-.1,0-.2-.04-.27-.11-.07-.07-.11-.17-.11-.27v-8.39c0-.1.04-.2.11-.27.07-.07.17-.11.27-.11h2.77c.31,0,.61-.15.8-.4Z"/>',
    }}
  />
)

CameraOutline.displayName = 'CameraOutline'

export const tags = ['CameraOutline', '']
