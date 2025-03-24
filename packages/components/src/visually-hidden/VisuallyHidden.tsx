import { HTMLAttributes, PropsWithChildren, Ref } from 'react'

import { Slot } from '../slot'

export type VisuallyHiddenProps = PropsWithChildren<HTMLAttributes<HTMLElement>> & {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean
  ref?: Ref<HTMLElement>
}

export const VisuallyHidden = ({ asChild = false, ref, ...props }: VisuallyHiddenProps) => {
  const Component = asChild ? Slot : 'span'

  return (
    <Component
      {...props}
      ref={ref}
      style={{
        // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
        position: 'absolute',
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        ...props.style,
      }}
    />
  )
}

VisuallyHidden.displayName = 'VisuallyHidden'
