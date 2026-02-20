import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ButtonHTMLAttributes, type PropsWithChildren, Ref } from 'react'

import { tagStyles, type TagStylesProps } from './Tag.styles'

interface BaseTagProps
  extends useRender.ComponentProps<'span'>,
    PropsWithChildren<ButtonHTMLAttributes<HTMLSpanElement>>,
    TagStylesProps {}

interface FilteredDesignIntent<
  Design extends TagProps['design'],
  K extends TagStylesProps['intent'] | never = never,
> {
  design?: Design
  intent?: Exclude<TagStylesProps['intent'], K>
  ref?: Ref<HTMLButtonElement>
}

export type ValidTagDesignIntent =
  | FilteredDesignIntent<'tinted', 'surface'>
  | FilteredDesignIntent<'outlined', 'surface'>
  | FilteredDesignIntent<'filled'>

export type TagProps = BaseTagProps & ValidTagDesignIntent

export const Tag = ({
  design = 'filled',
  intent = 'basic',
  size = 'md',
  shape = 'pill',
  render,
  className,
  ref,
  ...others
}: TagProps) => {
  const defaultProps: useRender.ElementProps<'span'> & Record<string, unknown> = {
    'data-spark-component': 'tag',
    className: tagStyles({
      className,
      design,
      intent,
      size,
      shape,
    }),
  }

  return useRender({
    defaultTagName: 'span',
    render,
    ref,
    props: mergeProps<'span'>(defaultProps, others),
  })
}
