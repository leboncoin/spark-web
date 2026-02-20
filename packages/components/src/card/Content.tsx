import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import { contentStyles } from './Content.styles'
import { useCardContext } from './context'

export interface ContentProps extends useRender.ComponentProps<'div'> {
  /**
   * Whether the card should have an inset padding.
   */
  inset?: boolean
}

export const Content = ({ children, inset, render, className, ref, ...props }: ContentProps) => {
  const { design, intent, hasBackdrop } = useCardContext()

  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'card-content',
    className: contentStyles({
      className,
      design,
      intent,
      inset,
      hasBackdrop,
    }),
    children,
  }

  return useRender({
    defaultTagName: 'div',
    render,
    ref,
    props: mergeProps<'div'>(defaultProps, props),
  })
}

Content.displayName = 'Content'
