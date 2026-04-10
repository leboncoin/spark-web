import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@storybook/react-vite'
import { type ParserOptions } from 'react-docgen-typescript'
import remarkGfm from 'remark-gfm'

const docgenConfig: ParserOptions = {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  /**
   * Return true for props that intend to be documented.
   */
  propFilter: prop => {
    const whitelistedProps = new Set(['children', 'className'])

    if (prop.declarations && prop.declarations?.length > 0) {
      const isDomProp = prop.declarations.some(
        declaration =>
          declaration.fileName.includes('node_modules/@types/react') ||
          declaration.fileName.includes('node_modules/@react-types/shared/src/dom')
      )

      if (isDomProp && !whitelistedProps.has(prop.name)) {
        return false
      }
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
  chromatic: {
    disableSnapshot: true,
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
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true,
          docs: true,
          test: false, // We are not yet using vitest for integrated tests in the storybook UI.
        },
      },
    }
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
