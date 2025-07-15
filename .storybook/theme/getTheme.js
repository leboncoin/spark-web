import { create } from 'storybook/theming'
import logoUrl from '../spark-logo.svg'

// https://github.com/storybookjs/storybook/blob/next/code/lib/theming/src/types.ts
export const getTheme = ({ base }) => {
  return create({
    base,
    // Typography
    fontBase: '"Nunito", sans-serif',
    fontCode: 'monospace',

    brandTitle: 'Spark design system',
    brandUrl: 'https://zeroheight.com/1186e1705/p/0879a9-colors/b/27d7a3',
    brandImage: logoUrl,
    brandTarget: '_self',
  })
}
