import { addons, types } from '@storybook/manager-api'
import { getTheme } from './theme/getTheme.js'

addons.setConfig({
  theme: getTheme({ base: 'light' }),
  sidebar: {
    showRoots: true,
    collapsedRoots: ['using-spark', 'hooks', 'contributing', 'experimental', 'utils'],
    filters: {
      hidden: item => !item.tags?.includes('hidden'),
    },
  },
})
