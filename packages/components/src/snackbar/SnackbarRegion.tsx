import { type AriaToastRegionProps, useToastRegion } from '@react-aria/toast'
import { cloneElement, type ComponentPropsWithRef, type ReactElement, useRef } from 'react'

import { SnackbarItem, type SnackbarItemProps } from './SnackbarItem'
import { SnackbarItemContext, type SnackbarItemState } from './SnackbarItemContext'
import { snackbarRegionVariant, type SnackbarRegionVariantProps } from './SnackbarRegion.styles'

export interface SnackbarRegionProps
  extends ComponentPropsWithRef<'div'>,
    AriaToastRegionProps,
    SnackbarRegionVariantProps,
    Pick<SnackbarItemState, 'state'> {
  /**
   * An accessibility label for the snackbar region.
   * @default 'Notifications'
   */
  'aria-label'?: string
  /**
   * Identifies the element (or elements) that labels the current element.
   */
  'aria-labelledby'?: string
  /**
   * Identifies the element (or elements) that describes the object.
   */
  'aria-describedby'?: string
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the object.
   */
  'aria-details'?: string
  /**
   * The component/template used to display each snackbar from the queue
   * @default 'Snackbar.Item'
   */
  children?: ReactElement<SnackbarItemProps, typeof SnackbarItem>
}

export const SnackbarRegion = ({
  children = <SnackbarItem />,
  state,
  position = 'bottom',
  className,
  ref: forwardedRef,
  ...rest
}: SnackbarRegionProps): ReactElement => {
  const innerRef = useRef<HTMLDivElement>(null)
  const ref = forwardedRef && typeof forwardedRef !== 'function' ? forwardedRef : innerRef

  const { regionProps } = useToastRegion(rest, state, ref)

  return (
    <div
      {...regionProps}
      ref={ref}
      data-position={position}
      className={snackbarRegionVariant({ position, className })}
    >
      {state.visibleToasts.map(toast => (
        <SnackbarItemContext.Provider key={toast.key} value={{ toast, state }}>
          {cloneElement(children, { key: toast.key })}
        </SnackbarItemContext.Provider>
      ))}
    </div>
  )
}
