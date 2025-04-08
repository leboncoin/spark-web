import { Icon } from '@spark-ui/components/icon'
import { AlertOutline } from '@spark-ui/icons/AlertOutline'
import { Check } from '@spark-ui/icons/Check'
import { IdeaOutline } from '@spark-ui/icons/IdeaOutline'
import { InfoOutline } from '@spark-ui/icons/InfoOutline'
import { WarningOutline } from '@spark-ui/icons/WarningOutline'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

const styles = cva(['sb-unstyled p-md border-l-[4px] default:border-neutral'], {
  variants: {
    marginY: {
      small: 'my-sm',
      medium: 'my-md',
      large: 'my-lg',
    },
    marginTop: {
      small: 'mt-sm',
      medium: 'mt-md',
      large: 'mt-lg',
    },
    marginBottom: {
      small: 'mb-sm',
      medium: 'mb-md',
      large: 'mb-lg',
    },
    kind: {
      success: ['border-success'],
      error: ['border-error'],
      warning: ['border-alert '],
      info: ['border-info'],
    },
  },
  defaultVariants: {
    kind: 'info' as const,
  },
})

export type StylesProps = ExcludeNull<VariantProps<typeof styles>>

export function Callout({ children, kind = 'info', ...variants }: PropsWithChildren<StylesProps>) {
  return (
    <div className={styles({ kind, ...variants })}>
      <div className="gap-lg px-lg flex flex-col items-start">
        <div
          className={cx('gap-md text-body-1 flex items-center font-bold', {
            ['text-success']: kind === 'success',
            ['text-error']: kind === 'error',
            ['text-alert']: kind === 'warning',
            ['text-info']: kind === 'info',
          })}
        >
          {kind === 'info' && (
            <>
              <Icon size="md">
                <InfoOutline />
              </Icon>
              Note
            </>
          )}
          {kind === 'error' && (
            <>
              <Icon size="md">
                <AlertOutline />
              </Icon>
              Caution
            </>
          )}
          {kind === 'success' && (
            <>
              <Icon size="md">
                <Check />
              </Icon>
              Success
            </>
          )}
          {kind === 'tip' && (
            <>
              <Icon size="md">
                <IdeaOutline />
              </Icon>
              Tip
            </>
          )}
          {kind === 'warning' && (
            <>
              <Icon size="md">
                <WarningOutline />
              </Icon>
              Warning
            </>
          )}
        </div>
        <div className="text-body-2">{children}</div>
      </div>
    </div>
  )
}
