import React from 'react'

import { IconProps } from '../Types'

export const FileOffFill = ({
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
    data-title="FileOffFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path d="m6.44,3.25l3.62,3.59h2.38c.44,0,.79.35.79.79,0,.52-.44.88-.79.88h-.71l2.47,2.45h2.3c.44,0,.79.35.79.79s-.35.79-.79.79h-.71l5.56,5.51v-9.01c0-.17-.09-.44-.26-.52L14.3,1.76c-.09-.17-.35-.26-.53-.26h-6.8c-.62,0-1.15.17-1.59.61l-.09.09,1.15,1.05Zm15.8,17.85L2.82,1.85c-.26-.35-.79-.35-1.06,0-.35.35-.35.79,0,1.14l3,2.98v12.6c0,.52.26,1.14.62,1.49.44.44.97.61,1.5.61h12.62l1.59,1.57c.18.18.35.26.53.26s.44-.09.53-.26c.44-.35.44-.88.09-1.14Zm-12.54-10.15h.09l1.59,1.57h-1.77c-.44,0-.79-.35-.79-.79.09-.44.44-.79.88-.79Zm0,5.69c-.44,0-.79-.35-.79-.79s.35-.79.79-.79h4.24l1.59,1.58h-5.83Z"/>',
    }}
  />
)

FileOffFill.displayName = 'FileOffFill'

export const tags = ['FileOffFill', '']
