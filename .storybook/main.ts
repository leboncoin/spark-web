import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'
import { type ParserOptions } from 'react-docgen-typescript'

const docgenConfig: ParserOptions = {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,

  propFilter: prop => {
    const prohibitedPropsRegexesNew = [/\/node_modules\/@types\/react\/.*.d.ts/]
    const allowedReactProps = new Set(['children', 'className'])

    if (prop.declarations && prop.declarations?.length > 0) {
      const isProhibitedProps = prop.declarations.some(declaration =>
        prohibitedPropsRegexesNew.some(regex => regex.test(declaration.fileName))
      )

      if (isProhibitedProps && allowedReactProps.has(prop.name)) {
        return true
      }

      return !isProhibitedProps
    }

    return true
  },
  /**
   * There is a bug in Storybook.
   * For children of a compound component, we must tell it how to get the name for each part of the compound.
   * If not, we lost the docgen for the props of the sub-components.
   */
  componentNameResolver: expression => {
    return expression.getName()
  },
}

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
  addons: [
    '@vueless/storybook-dark-mode',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@storybook/addon-docs',
  ],
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
    backgrounds: false,
  },
  staticDirs: ['../public'],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: docgenConfig,
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
