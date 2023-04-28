import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const WarningOutline = React.forwardRef(
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
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 9.02517C12.5522 9.02517 13 9.47289 13 10.0252V14.6085C13 15.1608 12.5522 15.6085 12 15.6085C11.4477 15.6085 11 15.1608 11 14.6085V10.0252C11 9.47289 11.4477 9.02517 12 9.02517Z"/><path d="M11.9998 18.8571C12.6902 18.8571 13.2498 18.2974 13.2498 17.6071C13.2498 16.9167 12.6902 16.3571 11.9998 16.3571C11.3095 16.3571 10.7498 16.9167 10.7498 17.6071C10.7498 18.2974 11.3095 18.8571 11.9998 18.8571Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.7559 3.14992C11.1305 2.92096 11.5609 2.7998 11.9999 2.7998C12.4389 2.7998 12.8694 2.92096 13.244 3.14992C13.6185 3.37888 13.9226 3.70677 14.1228 4.09748L14.1273 4.1062L21.7447 19.3412L21.7457 19.3431C21.928 19.7057 22.0148 20.1089 21.9978 20.5144C21.9808 20.9206 21.8602 21.3158 21.6475 21.6623C21.4348 22.0088 21.137 22.2953 20.7825 22.4943C20.428 22.6934 20.0284 22.7986 19.6218 22.7998L19.6188 22.7998H4.38106L4.37803 22.7998C3.97143 22.7986 3.5719 22.6934 3.21737 22.4943C2.86284 22.2953 2.56509 22.0088 2.35239 21.6623C2.13969 21.3158 2.01911 20.9206 2.00209 20.5144C1.9851 20.1087 2.07194 19.7055 2.25437 19.3428L2.25516 19.3412L9.87702 4.09745C10.0772 3.70675 10.3813 3.37888 10.7559 3.14992ZM11.9999 4.7998C11.929 4.7998 11.8595 4.81937 11.799 4.85635C11.7395 4.89274 11.691 4.9446 11.6586 5.00638L4.04261 20.2384L4.04121 20.2412C4.01166 20.2998 3.99759 20.3651 4.00034 20.4307C4.00309 20.4963 4.02256 20.5601 4.05692 20.6161C4.09127 20.6721 4.13936 20.7183 4.19662 20.7505C4.25357 20.7825 4.31771 20.7994 4.38301 20.7998H19.6169C19.6822 20.7994 19.7463 20.7825 19.8032 20.7505C19.8605 20.7183 19.9086 20.6721 19.943 20.6161C19.9773 20.5601 19.9968 20.4963 19.9995 20.4307C20.0023 20.3651 19.9882 20.2998 19.9587 20.2412L19.9573 20.2384L12.3412 5.00638C12.3089 4.9446 12.2604 4.89274 12.2009 4.85635C12.1404 4.81937 12.0708 4.7998 11.9999 4.7998Z"/>',
      }}
    />
  )
)

export const tags = ['warning-outline', 'alert']
