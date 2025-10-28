import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'

import { docgenConfig } from '../config/plugins/sparkDocgen/constants.ts'

const config: StorybookConfig = {
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
  core: {
    disableTelemetry: true,
  },
  stories: [
    '../documentation/*.mdx',
    '../documentation/**/*.mdx',
    '../packages/**/*.doc.mdx',
    '../packages/**/*.stories.tsx',
    '!..packages/icons/**/*.doc.mdx',
    '!..packages/icons/**/*.stories.tsx',
  ],
  addons: [getAbsolutePath("@storybook/addon-a11y"), getAbsolutePath("@storybook/addon-designs"), getAbsolutePath("@storybook/addon-docs")],
  staticDirs: ['../public'],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
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
  docs: {
    // autodocs: true,
  },
}

export default config

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
