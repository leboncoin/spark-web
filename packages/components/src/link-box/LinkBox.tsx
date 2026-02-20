import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
export interface LinkBoxProps extends useRender.ComponentProps<'div'> {}

export const LinkBox = ({ className, render, ref, ...props }: LinkBoxProps) => {
  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'link-box',
    className: cx('default:relative', className),
  }

  return useRender({
    defaultTagName: 'div',
    render,
    ref,
    props: mergeProps<'div'>(defaultProps, props),
  })
}

LinkBox.displayName = 'LinkBox'
