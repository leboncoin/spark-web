import { themes } from 'storybook/theming'

import lightLogo from './spark-logo-light.svg'
import darkLogo from './spark-logo-dark.svg'

const common = {
  fontBase: '"Nunito", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Spark design system',
  brandUrl: 'https://zeroheight.com/1186e1705/p/0879a9-colors/b/27d7a3',
  brandTarget: '_self',
}

const light = {
  ...themes.light,
  ...common,
  brandImage: lightLogo,
}

const dark = {
  ...themes.dark,
  ...common,
  brandImage: darkLogo,
}

export default {
  light,
  dark,
}
