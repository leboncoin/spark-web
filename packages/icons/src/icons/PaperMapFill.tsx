import React from 'react'

import { IconProps } from '../Types'

export const PaperMapFill = ({
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
    data-title="PaperMapFill"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m2.76,5.81l5.55-1.76s.03,0,.04-.01c.1-.03.2-.04.3-.04.08,0,.16,0,.24.02.02,0,.04,0,.06.01l6.32,1.69,5.3-1.68c.33-.11.7-.05.99.15.28.2.45.52.45.86v12.12c0,.46-.31.87-.76,1.01l-5.54,1.76c-.14.04-.28.06-.42.05-.12,0-.25,0-.37-.04l-6.24-1.67-5.23,1.66c-.33.11-.7.05-.99-.15-.28-.2-.45-.52-.45-.86V6.82c0-.46.31-.87.76-1.01Zm6.53,10.31V6.21l5.44,1.58v9.91l-5.44-1.58Z"/>',
    }}
  />
)

PaperMapFill.displayName = 'PaperMapFill'

export const tags = ['PaperMapFill', '']
