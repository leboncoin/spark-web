import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'

import { docgenConfig } from '../config/plugins/sparkDocgen/constants.ts'

/**
 * StorybookConfig:
 * https://storybook.js.org/docs/api/main-config/main-config
 */
const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../documentation/*.mdx',
    '../documentation/**/*.mdx',
    '../packages/**/*.doc.mdx',
    '../packages/**/*.stories.tsx',
    '!..packages/icons/**/*.doc.mdx',
    '!..packages/icons/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-designs', '@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
  },
  docs: {
    docsMode: false,
  },
  features: {
    actions: false,
    controls: false,
    viewport: true,
  },
  staticDirs: ['../public'],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      ...docgenConfig,
      /**
       * There is a bug in Storybook.
       * For children of a compound component, we must tell it how to get the name for each part of the compound.
       * If not, we lost the docgen for the props of the sub-components.
       */
      componentNameResolver: expression => {
        return expression.getName()
      },
    },
  },
  async viteFinal(config, _options) {
    // This is where we can override vite config for Storybook
    return mergeConfig(config, {
      plugins: [],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@spark-ui/components': '/packages/components/src',
        },
      },
    })
  },
}

export default config
