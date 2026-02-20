import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
export interface LinkBoxLinkProps extends useRender.ComponentProps<'a'> {}

export const LinkBoxLink = ({ className, render, ref, ...props }: LinkBoxLinkProps) => {
  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'link-box-link',
    className: cx(
      "before:z-base static before:absolute before:top-0 before:left-0 before:block before:size-full before:content-['']",
      className
    ),
  }

  return useRender({
    defaultTagName: 'a',
    render,
    ref,
    props: mergeProps<'a'>(defaultProps, props),
  })
}

LinkBoxLink.displayName = 'LinkBox.Link'
