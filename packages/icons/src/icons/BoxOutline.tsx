import React from 'react'

import { IconProps } from '../Types'

export const BoxOutline = ({
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
    data-title="BoxOutline"
    {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
    dangerouslySetInnerHTML={{
      __html:
        (title === undefined ? '' : `<title>${title}</title>`) +
        '<path fill-rule="evenodd" d="m14.07,18.52h3.47c.54,0,.97-.43.97-.98s-.43-.98-.97-.98h-3.47c-.54,0-.97.43-.97.98s.43.98.97.98Z"/><path fill-rule="evenodd" d="m21.98,8.5c0-.07-.02-.12-.04-.18-.02-.07-.02-.13-.05-.19v-.03l-2.01-4.01c-.31-.62-.79-1.15-1.38-1.52-.59-.37-1.27-.57-1.97-.57H7.44c-.68.02-1.35.22-1.92.59-.57.37-1.03.88-1.34,1.48l-2.07,4.01s0,.02,0,.03c-.02.06-.03.12-.05.18-.02.07-.03.12-.04.19v11.14c0,.62.25,1.23.69,1.67.44.45,1.04.69,1.67.69h15.27c.62,0,1.22-.25,1.67-.69.44-.44.69-1.04.69-1.67v-11.14h-.02Zm-4.51-4.28c.28.18.52.43.67.73l1.31,2.6h-6.46v-3.61h3.55c.33,0,.67.09.95.27h0Zm-11.55.74v-.02c.15-.29.37-.54.65-.72.27-.18.59-.28.91-.28h3.53v3.6h-6.43l1.34-2.58Zm14.12,14.67c0,.11-.04.22-.12.29-.08.07-.18.12-.29.12H4.36c-.11,0-.22-.04-.29-.12-.07-.08-.12-.18-.12-.29v-10.13h16.09v10.13Z"/>',
    }}
  />
)

BoxOutline.displayName = 'BoxOutline'

export const tags = ['BoxOutline', '']
