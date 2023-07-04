import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const FlagMa = React.forwardRef(
  ({ title, fill = 'none', stroke = 'none', ...props }: IconProps, ref: Ref<SVGSVGElement>) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
      dangerouslySetInnerHTML={{
        __html:
          (title === undefined ? '' : `<title>${title}</title>`) +
          '<path fill="#FF4B55" d="M23.586 20.213H.414A.414.414 0 0 1 0 19.8V4.903c0-.228.185-.414.414-.414h23.172c.229 0 .414.186.414.414V19.8a.414.414 0 0 1-.414.413Z"/><path fill="#5A8250" fill-rule="evenodd" d="m13.966 13.38 3.161-2.319h-3.914L12 7.328l-1.213 3.733H6.873l3.16 2.32-1.203 3.704 3.167-2.264.003.002.003-.002 3.167 2.264-1.204-3.704Zm.635-1.491-.904.663-.215-.663H14.6Zm-3.213 0-.382 1.178.994.73.995-.73-.383-1.178h-1.223ZM12 10.007l.343 1.054h-.686L12 10.007Zm-1.482 1.882H9.4l.903.663.215-.663Zm-.124 3.06.342-1.053.559.41-.901.644Zm3.212 0-.342-1.053-.558.41.9.644Z" clip-rule="evenodd"/>',
      }}
    />
  )
)

FlagMa.displayName = 'FlagMa'

export const tags = ['FlagMA', '']
