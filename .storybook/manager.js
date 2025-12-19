import { addons } from 'storybook/manager-api'
import { getTheme } from './theme/getTheme.js'

addons.setConfig({
  theme: getTheme({ base: 'light' }),
  sidebar: {
    showRoots: true,
    collapsedRoots: [
      'styling',
      'components-principles',
      'hooks',
      'contributing',
      'experimental',
      'utils',
      'references',
    ],
    filters: {
      hidden: item => !item.tags?.includes('hidden'),
    },
  },
})
