import { Dialog as RadixDialog } from 'radix-ui'
import { type ReactElement, Ref, useEffect } from 'react'

import { dialogContentStyles, type DialogContentStylesProps } from './DialogContent.styles'
import { useDialog } from './DialogContext'

export interface ContentProps extends RadixDialog.DialogContentProps, DialogContentStylesProps {
  /**
   * When set to true, the content will adjust its width to fit the content rather than taking up the full available width.
   */
  isNarrow?: boolean
  ref?: Ref<HTMLDivElement>
}

export const Content = ({
  children,
  className,
  isNarrow = false,
  size = 'md',
  onInteractOutside,
  ref,
  ...rest
}: ContentProps): ReactElement => {
  const { setIsFullScreen } = useDialog()

  useEffect(() => {
    if (size === 'fullscreen') setIsFullScreen(true)

    return () => setIsFullScreen(false)
  }, [setIsFullScreen, size])

  return (
    <RadixDialog.Content
      data-spark-component="dialog-content"
      ref={ref}
      className={dialogContentStyles({
        className,
        isNarrow,
        size,
      })}
      onInteractOutside={e => {
        const isForegroundElement = (e.target as HTMLElement).closest('.z-toast, .z-popover')

        /**
         * The focus trap of the dialog applies `pointer-events-none` on the body of the page in the background, but
         * some components with an higher z-index have `pointer-events-auto` applied on them to remain interactive and ignore the focust trap (ex: a Snackbar with actions).
         *
         * Clicking on the snackbar will be considered as an "outside click" and close the dialog. We want to prevent this.
         */
        if (isForegroundElement) {
          e.preventDefault()
        }

        onInteractOutside?.(e)
      }}
      {...rest}
    >
      {children}
    </RadixDialog.Content>
  )
}

Content.displayName = 'Dialog.Content'
