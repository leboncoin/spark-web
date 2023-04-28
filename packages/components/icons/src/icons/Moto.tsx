import React, { type Ref } from 'react'

import { IconProps } from '../Types'

export const Moto = React.forwardRef(
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
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M16.3401 6.25915C16.4242 6.3118 16.4829 6.39425 16.5034 6.48832L16.7125 7.38883C16.979 7.39266 17.2414 7.46613 17.4699 7.6038C17.9098 7.90905 18.2046 8.36879 18.2896 8.8818C18.6917 10.603 17.6169 10.9724 17.5705 10.9872L17.5513 10.993L17.6232 11.3025L17.7652 11.2931C19.3481 11.2228 20.7429 12.3137 20.9687 13.8283C21.2019 15.3917 20.107 16.8539 18.4829 17.1481C18.2971 17.1836 18.1079 17.201 17.9184 17.1999C16.5573 17.2048 15.3909 16.3671 14.9756 15.1905L10.1459 15.1901C9.73449 16.3574 8.5977 17.171 7.2863 17.1999C5.57809 17.1999 4.19331 15.8769 4.19331 14.2449C4.18862 14.1833 4.1868 14.1215 4.18785 14.0597C4.07228 13.8211 4.00552 13.5564 4 13.2772V11.2605C4.00249 10.6426 4.3102 10.0937 4.78641 9.74408C4.5876 9.54439 4.46665 9.27335 4.46665 8.97783C4.46665 8.41136 4.91108 7.93483 5.5001 7.86974H9.08796C9.67698 7.93483 10.1214 8.41136 10.1214 8.97783C10.1214 9.10702 10.0983 9.23153 10.0556 9.34754L10.7272 9.34719C10.9772 9.32136 11.2263 9.40249 11.4077 9.56881C11.5248 9.73058 11.5589 9.93427 11.5005 10.1229C11.4345 10.2943 11.4833 10.4869 11.6242 10.6104C11.9346 10.974 12.6763 11.8702 13.1605 12.6715L15.2888 12.671C15.6537 12.1178 16.2067 11.6855 16.8692 11.4606L15.8307 7.00543L14.4698 7.27137C14.2584 7.30766 14.0554 7.17566 14.0133 6.97445C13.9712 6.77324 14.1054 6.57683 14.3151 6.53265L16.0549 6.20761C16.1533 6.18795 16.2559 6.2065 16.3401 6.25915ZM5.10574 14.9763V14.9837C5.43263 15.867 6.30562 16.4585 7.2863 16.4611C8.19766 16.4832 9.03471 15.9831 9.41272 15.1905H6.01817C5.70037 15.1907 5.38726 15.1172 5.10574 14.9763ZM17.7909 12.0219L18.2896 14.1637C18.3126 14.2597 18.2945 14.3606 18.2394 14.4438C18.1842 14.527 18.0965 14.5858 17.9958 14.6069L17.9184 14.6586C17.7389 14.6587 17.5839 14.5385 17.5473 14.3705L17.0311 12.1565C16.5674 12.3364 16.1788 12.6545 15.9213 13.0593L15.9235 13.0408C15.9235 13.1388 15.8827 13.2327 15.8102 13.302L15.7743 13.3312C15.7152 13.4618 15.6689 13.5991 15.6366 13.7418C15.4381 14.6193 15.8134 15.5246 16.587 16.0343C17.3606 16.544 18.3797 16.5575 19.1678 16.0683C19.9121 15.6064 20.3114 14.7824 20.2076 13.9488L20.184 13.8017C19.9578 12.7783 19.0133 12.0454 17.9184 12.0435V12.0288L17.7909 12.0219ZM14.9388 13.4106L13.5311 13.4111C13.5824 13.5548 13.6115 13.6846 13.6115 13.7943C13.613 14.0615 13.5581 14.2775 13.4632 14.4522L14.8213 14.4522C14.8198 14.4321 14.8186 14.412 14.8175 14.3918C14.7998 14.0513 14.8432 13.7209 14.9388 13.4106ZM10.7272 10.0859H6.01817C5.69005 10.084 5.37454 10.2066 5.14107 10.4269C4.9076 10.6472 4.77529 10.947 4.77325 11.2605V13.2772C4.78424 13.8464 5.21012 14.3176 5.77365 14.4276C5.84328 14.4387 5.9148 14.4446 5.98724 14.4444H9.85347L9.92245 14.4515L11.3458 14.4518C12.498 14.4518 12.8459 14.2967 12.8459 13.7943C12.8459 13.4324 11.918 12.11 11.052 11.098C10.7761 10.8322 10.6546 10.4538 10.7272 10.0859ZM16.8927 8.16224L17.3777 10.2481C17.491 10.1527 17.7261 9.84772 17.5395 9.03693C17.4983 8.71648 17.3224 8.42583 17.0524 8.23172C17.0018 8.20268 16.9482 8.17944 16.8927 8.16224ZM9.08796 8.60847H5.5001C5.31594 8.64383 5.18345 8.79838 5.18345 8.97783C5.18345 9.15729 5.31594 9.31183 5.5001 9.34719H9.08796C9.27212 9.31183 9.4046 9.15729 9.4046 8.97783C9.4046 8.79838 9.27212 8.64383 9.08796 8.60847Z"/>',
      }}
    />
  )
)

export const tags = ['moto', 'criteria', 'automobile']
