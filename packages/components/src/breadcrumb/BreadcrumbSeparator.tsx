import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ArrowVerticalRight } from '@spark-ui/icons/ArrowVerticalRight'
import { cx } from 'class-variance-authority'
import React, { Ref } from 'react'

import { Icon } from '../icon'

export interface SeparatorProps extends useRender.ComponentProps<'li'> {
  className?: string
  ref?: Ref<HTMLLIElement>
}

export const Separator = ({ className, children, ref, render, ...rest }: SeparatorProps) => {
  const defaultProps: Record<string, unknown> = {
    role: 'presentation',
    'aria-hidden': true,
    'data-spark-component': 'breadcrumb-separator',
    className: cx('gap-sm inline-flex items-center', className),
    children:
      children ??
      ((
        <Icon>
          <ArrowVerticalRight />
        </Icon>
      ) as React.ReactNode),
  }

  return useRender({
    defaultTagName: 'li',
    render,
    ref,
    props: mergeProps<'li'>(defaultProps, rest),
  })
}

Separator.displayName = 'Breadcrumb.Separator'
