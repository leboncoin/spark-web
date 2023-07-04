import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const FlagCl = React.forwardRef(
  ({ title, fill = 'none', stroke = 'none', ...props }: IconProps, ref: Ref<SVGSVGElement>) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
      dangerouslySetInnerHTML={{
        __html:
          (title === undefined ? '' : `<title>${title}</title>`) +
          '<path fill="#F5F5F5" d="M24 12.351H0V4.903c0-.228.185-.414.414-.414h23.172c.229 0 .414.186.414.414v7.448Z"/><path fill="#FF4B55" d="M.828 12.351v-.414H0V19.8c0 .228.185.413.414.413h23.172A.414.414 0 0 0 24 19.8V12.35H.828Z"/><path fill="#41479B" d="M7.448 12.351H.414A.414.414 0 0 1 0 11.938V4.903c0-.228.185-.414.414-.414h7.034c.229 0 .414.186.414.414v7.035a.414.414 0 0 1-.414.413Z"/><path fill="#F5F5F5" d="m4.09 6.655.395 1.183 1.247.01a.168.168 0 0 1 .098.303l-1.003.74.376 1.19a.168.168 0 0 1-.258.187l-1.014-.725-1.014.725a.168.168 0 0 1-.258-.187l.376-1.19-1.003-.74a.168.168 0 0 1 .098-.303l1.247-.01.395-1.183a.168.168 0 0 1 .318 0Z"/>',
      }}
    />
  )
)

FlagCl.displayName = 'FlagCl'

export const tags = ['FlagCL', '']
