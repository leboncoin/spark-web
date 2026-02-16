import { addons } from 'storybook/manager-api'

addons.setConfig({
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
