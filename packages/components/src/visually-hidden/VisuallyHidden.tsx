import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { HTMLAttributes, PropsWithChildren, Ref } from 'react'

export type VisuallyHiddenProps = useRender.ComponentProps<'span'> &
  PropsWithChildren<HTMLAttributes<HTMLElement>> & {
    ref?: Ref<HTMLElement>
  }

const visuallyHiddenStyle = {
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: 'absolute' as const,
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  wordWrap: 'normal' as const,
}

export const VisuallyHidden = ({ ref, style, render, ...props }: VisuallyHiddenProps) => {
  const defaultProps: Record<string, unknown> = {
    ...props,
    style: { ...visuallyHiddenStyle, ...style },
  }

  return useRender({
    defaultTagName: 'span',
    render,
    ref,
    props: mergeProps<'span'>(defaultProps, {}),
  })
}

VisuallyHidden.displayName = 'VisuallyHidden'
