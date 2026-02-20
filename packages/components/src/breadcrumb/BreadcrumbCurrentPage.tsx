import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cx } from 'class-variance-authority'
import { Ref } from 'react'

export interface CurrentPageProps extends useRender.ComponentProps<'span'> {
  className?: string
  ref?: Ref<HTMLSpanElement>
}

export const CurrentPage = ({ className, children, ref, render, ...rest }: CurrentPageProps) => {
  const defaultProps: Record<string, unknown> = {
    'data-spark-component': 'breadcrumb-current-page',
    role: 'link',
    'aria-disabled': true,
    'aria-current': 'page',
    className: cx(
      'inline! overflow-hidden font-bold text-ellipsis whitespace-nowrap text-current',
      className
    ),
    children,
  }

  return useRender({
    defaultTagName: 'span',
    render,
    ref,
    props: mergeProps<'span'>(defaultProps, rest),
  })
}

CurrentPage.displayName = 'Breadcrumb.CurrentPage'
