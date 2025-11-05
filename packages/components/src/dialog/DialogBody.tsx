import { useMergeRefs } from '@spark-ui/hooks/use-merge-refs'
import { useScrollOverflow } from '@spark-ui/hooks/use-scroll-overflow'
import { cx } from 'class-variance-authority'
import { type ReactElement, type ReactNode, Ref, useRef } from 'react'

import { useDialog } from './DialogContext'

export interface BodyProps {
  children: ReactNode
  className?: string
  tabIndex?: number
  ref?: Ref<HTMLDivElement>
  inset?: boolean
}

export const Body = ({
  children,
  className,
  inset = false,
  ref: forwardedRef,
  ...rest
}: BodyProps): ReactElement => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const ref = useMergeRefs(forwardedRef, scrollAreaRef)

  const { withFade } = useDialog()

  const { overflow } = useScrollOverflow(scrollAreaRef)

  return (
    <div
      data-spark-component="dialog-body"
      ref={ref}
      className={cx(
        'focus-visible:u-outline relative grow overflow-y-auto outline-hidden',
        'transition-all duration-300',
        {
          ['px-xl py-lg']: !inset,
        },
        className
      )}
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

Body.displayName = 'Dialog.Body'
