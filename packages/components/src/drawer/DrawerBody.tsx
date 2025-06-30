import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { useScrollOverflow } from '@spark-ui/hooks/use-scroll-overflow'
import { type ReactNode, Ref, useRef } from 'react'

import { drawerBodyStyles, type DrawerBodyStylesProps } from './DrawerBody.styles'
import { useDrawer } from './DrawerContext'

export interface DrawerBodyProps extends DrawerBodyStylesProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const DrawerBody = ({
  children,
  inset = false,
  className,
  ref: forwardedRef,
  ...rest
}: DrawerBodyProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const ref = useMergeRefs(forwardedRef, scrollAreaRef)

  const { withFade } = useDrawer()

  const overflow = useScrollOverflow(scrollAreaRef)

  return (
    <div
      data-spark-component="drawer-body"
      ref={ref}
      className={drawerBodyStyles({ inset, className })}
      style={{
        ...(withFade && {
          maskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 44px, rgba(0, 0, 0, 1) calc(100% - 44px), rgba(0, 0, 0, 0))',
          maskSize: `100% calc(100% + ${overflow.top ? '0px' : '44px'} + ${overflow.bottom ? '0px' : '44px'})`,
          maskPosition: `0 ${overflow.top ? '0px' : '-44px'}`,
        }),
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

DrawerBody.displayName = 'Drawer.Body'
