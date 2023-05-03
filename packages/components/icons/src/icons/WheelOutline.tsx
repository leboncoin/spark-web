import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const WheelOutline = React.forwardRef(
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
          '<path d="M20.7705 14.0549L19.9664 13.0065V11.3936L20.7705 10.3452C21.0921 9.94195 21.2529 9.53872 21.2529 9.05485C21.2529 8.57098 21.1725 8.08711 20.9313 7.68388L20.3684 6.71614C20.1272 6.31292 19.8056 5.99033 19.4035 5.7484C19.0015 5.50646 18.519 5.50646 18.0365 5.50646L16.75 5.66775L15.3026 4.8613L14.8202 3.65163C14.6594 3.2484 14.3377 2.84517 13.9357 2.60324C13.5336 2.3613 13.0512 2.20001 12.6491 2.20001H11.5234C11.0409 2.20001 10.5585 2.3613 10.2368 2.60324C9.91521 2.92582 9.59357 3.32904 9.43275 3.81292L8.95029 5.02259L7.50292 5.82904L6.21637 5.58711C5.73392 5.50646 5.25146 5.58711 4.84942 5.82904C4.44737 6.07098 4.12573 6.39356 3.8845 6.79679L3.32164 7.68388C3.08041 8.16775 3 8.57098 3 9.05485C3 9.53872 3.24123 9.94195 3.48246 10.3452L4.28655 11.3936V13.0065L3.48246 14.0549C3.16082 14.4581 3 14.8613 3 15.3452C3 15.829 3.08041 16.3129 3.32164 16.7161L3.8845 17.6839C4.12573 18.0871 4.44737 18.4097 4.84942 18.6516C5.25146 18.8936 5.73392 18.8936 6.21637 18.8936L7.50292 18.7323L8.95029 19.5387L9.43275 20.7484C9.59357 21.1516 9.91521 21.5549 10.3173 21.7968C10.7193 22.0387 11.2018 22.2 11.6038 22.2H12.7295C13.212 22.2 13.6944 22.0387 14.0161 21.7968C14.4181 21.5549 14.7398 21.1516 14.9006 20.7484L15.383 19.5387L16.8304 18.7323L18.117 18.8936C18.5994 18.9742 19.0819 18.8936 19.4839 18.6516C19.886 18.4097 20.2076 18.0871 20.4488 17.6839L21.0117 16.7161C21.2529 16.3129 21.3333 15.829 21.3333 15.3452C21.2529 14.8613 21.0921 14.3774 20.7705 14.0549ZM5.01007 15.2646L6.0554 13.9742C6.21621 13.813 6.29662 13.571 6.29662 13.4097V11.071C6.29662 10.8291 6.21621 10.6678 6.0554 10.4259L5.01007 9.13553C4.92966 9.05489 4.92966 9.05489 4.92966 8.8936C4.92966 8.81295 4.92982 8.73227 5.01023 8.65163L5.5731 7.68388C5.5731 7.68388 5.65351 7.60324 5.73392 7.60324C5.81433 7.60324 5.89474 7.52259 5.97515 7.60324L7.58333 7.84517C7.82456 7.84517 7.98538 7.84517 8.22661 7.76453L10.2368 6.6355C10.3977 6.55485 10.5585 6.31292 10.6389 6.15163L11.2018 4.61937C11.2018 4.53872 11.2822 4.45808 11.3626 4.45808C11.443 4.37743 11.5234 4.37743 11.6038 4.37743H12.7295C12.8099 4.37743 12.8904 4.37743 12.9708 4.45808C13.0512 4.53872 13.0512 4.53872 13.1316 4.61937L13.6944 5.99033C13.7749 6.23227 13.9357 6.39356 14.0965 6.47421L16.1067 7.68388C16.2675 7.76453 16.5088 7.84517 16.75 7.76453L18.3582 7.52259C18.4386 7.52259 18.519 7.52259 18.5994 7.52259C18.6798 7.52259 18.7602 7.60324 18.7602 7.68388L19.3231 8.73227C19.3231 8.73227 19.4034 8.81295 19.3229 8.8936C19.3229 8.97424 19.3231 9.05485 19.2427 9.1355L18.1974 10.4258C18.0366 10.5871 17.9561 10.829 17.9561 10.9903V13.329C17.9561 13.571 18.0366 13.7323 18.1974 13.9742L19.2427 15.2645C19.3231 15.3452 19.3231 15.4258 19.3231 15.5065C19.3231 15.5871 19.3231 15.6678 19.2427 15.7484L18.6798 16.7161C18.6798 16.7968 18.5994 16.8774 18.519 16.8774C18.4386 16.8774 18.3582 16.9581 18.2778 16.8774L16.6696 16.6355C16.4284 16.6355 16.2675 16.6355 16.0263 16.7161L14.0161 17.8452C13.8553 17.9258 13.6944 18.1678 13.614 18.329L13.0512 19.8613C13.0512 19.9419 12.9708 20.0226 12.8904 20.0226C12.8099 20.0226 12.7295 20.1032 12.6491 20.1032H11.5234C11.443 20.1032 11.3626 20.1032 11.2822 20.0226C11.2018 19.9419 11.2018 19.9419 11.1213 19.8613L10.5585 18.329C10.4781 18.0871 10.3173 17.9258 10.1564 17.8452L8.1462 16.7161C7.98538 16.6355 7.82456 16.5549 7.66374 16.5549C7.58333 16.5549 7.58333 16.5549 7.50292 16.5549L5.89474 16.7968C5.81433 16.7968 5.73392 16.7968 5.65351 16.7968C5.5731 16.7968 5.49269 16.7161 5.49269 16.6355L4.92982 15.6678C4.84942 15.5871 4.84942 15.5065 4.84942 15.4258C4.92982 15.3452 5.01007 15.3452 5.01007 15.2646Z"/><path d="M10.7191 15.6678C11.2016 15.8291 11.6841 15.9904 12.1665 15.9904C12.4077 15.9904 12.649 15.9904 12.8902 15.9097C13.6139 15.7484 14.2572 15.4259 14.82 14.8613C15.3025 14.3775 15.7045 13.6517 15.8653 12.9259C16.0262 12.2001 15.9457 11.4742 15.6241 10.7484C15.3829 10.1033 14.9004 9.45811 14.2572 9.05489C13.6139 8.65166 12.9706 8.40973 12.1665 8.40973C11.2016 8.40973 10.2367 8.81295 9.513 9.53876C8.78931 10.2646 8.38727 11.1517 8.38727 12.2001C8.38727 12.9259 8.6285 13.6517 9.03054 14.2968C9.513 14.8613 10.0759 15.3452 10.7191 15.6678ZM10.3977 12.2C10.3977 11.7162 10.5586 11.3129 10.8802 10.9097C11.2018 10.5065 11.6843 10.4258 12.1667 10.4258C12.4884 10.4258 12.8904 10.5065 13.1317 10.7484C13.4533 10.9097 13.6141 11.2323 13.7749 11.5549C13.9358 11.8774 13.9358 12.2 13.8553 12.6033C13.7749 12.9258 13.6141 13.2484 13.3729 13.4903C13.1317 13.7323 12.81 13.8936 12.4884 13.9742C12.1667 14.0549 11.7647 13.9742 11.4431 13.8936C11.1214 13.8129 10.7998 13.4903 10.639 13.2484C10.4782 12.9258 10.3977 12.5226 10.3977 12.2Z"/>',
      }}
    />
  )
)

WheelOutline.displayName = 'WheelOutline'

export const tags = ['wheel-outline', 'actions']
