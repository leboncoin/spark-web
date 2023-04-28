import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const Like = React.forwardRef(
  (
    { title, fill = 'currentColor', stroke = 'none', ...props }: IconProps,
    ref: Ref<SVGSVGElement>
  ) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...{ ...(title && { 'data-title': title }), fill, stroke, ...props }}
      dangerouslySetInnerHTML={{
        __html:
          (title === undefined ? '' : `<title>${title}</title>`) +
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.94027 19.1999C4.42097 19.1999 4 18.7849 4 18.2729V11.6239C4 11.1413 4.39682 10.7501 4.88632 10.7501H9.42583C10.1965 10.7501 10.5896 9.99021 10.7515 9.35952L11.3603 5.91727C11.4303 4.97558 12.2068 4.23613 13.1638 4.19995C14.343 4.19995 14.7515 5.1574 14.9596 5.87928C15.2493 6.97568 15.1846 8.13392 14.7746 9.19234H17.6262C18.2938 9.17136 18.9348 9.451 19.368 9.95222C19.9177 10.7595 20.1201 11.7488 19.9307 12.703L19.3372 17.1711C19.3372 17.7105 19.1194 18.2277 18.7318 18.6084C18.3442 18.9891 17.8188 19.2019 17.2717 19.1999H4.94027ZM9.0397 11.51H4.8632C4.79935 11.51 4.74759 11.561 4.74759 11.6239V18.2729C4.74759 18.3172 4.76546 18.3597 4.79726 18.3911C4.82905 18.4224 4.87218 18.44 4.91715 18.44H9.0397V11.51ZM13.1484 4.95223C12.5736 4.99838 12.1256 5.46291 12.1079 6.03125L11.4913 9.51149C11.2496 10.6107 10.6332 11.2945 9.81054 11.4672L9.81042 18.44H17.264C17.9791 18.44 18.5588 17.8685 18.5588 17.1635L19.16 12.6042C19.3109 11.8632 19.1674 11.0934 18.7592 10.4537C18.468 10.1227 18.0394 9.94079 17.5954 9.95982L15.6514 9.95945C14.3624 9.95654 14.1066 9.93027 13.9422 9.69386C13.8697 9.57768 13.8528 9.43592 13.896 9.30632C14.3479 8.29864 14.4587 7.17426 14.212 6.09964C13.9037 5.03582 13.5029 4.95223 13.1484 4.95223Z"/>',
      }}
    />
  )
)

export const tags = ['like', 'criteria', 'generic']
