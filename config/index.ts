import merge from 'deepmerge'

import { buildComponentConfig } from './component'

export function getComponentConfiguration(path: string, name: string, options: any = {}) {
  return getConfiguration(
    buildComponentConfig(path, options.preserveModules, options.external),
    options,
    name
  )
}

function getConfiguration(configuration: Record<string, unknown>, options = {}, name?: string) {
  const result = merge.all([configuration, name ? { build: { lib: { name } } } : {}, options], {})

  return result
}
