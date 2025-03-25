import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { camelCase } from 'camel-case'
import { pascalCase } from 'pascal-case'

import { Generator } from './Generator.mjs'

export class TemplateGenerator extends Generator {
  static TYPES = {
    COMPONENT: 'component',
    HOOK: 'hook',
    UTIL: 'util',
  }

  static CONTEXTS = {
    [TemplateGenerator.TYPES.COMPONENT]: 'components',
    [TemplateGenerator.TYPES.HOOK]: 'hooks',
    [TemplateGenerator.TYPES.UTIL]: 'utils',
  }

  constructor({ system }) {
    super()

    this.system = system
  }

  getDest({ type, name }) {
    const basePath = this.system.getBasePath()
    const context = TemplateGenerator.CONTEXTS[type]

    if (type === TemplateGenerator.TYPES.COMPONENT || type === TemplateGenerator.TYPES.HOOK) {
      return `${basePath}/packages/${context}/src/${name}`
    }

    return `${basePath}/packages/${context}/${name}`
  }

  async getTemplatePaths({ type }) {
    const templateDir = fileURLToPath(new URL(`../templates/${type}`, import.meta.url))
    const files = await readdir(templateDir, { recursive: true })

    return files.filter(file => file.endsWith('.js')).map(file => join(templateDir, file))
  }

  getTemplatePath({ path, name, type, dest }) {
    const parsed = path
      .replace(/(.*)\/templates\/([a-z-]+)\//, `${dest}/`)
      .replaceAll(/\[|\]|\.js$/g, '')

    if (type === TemplateGenerator.TYPES.COMPONENT) {
      return parsed.replace('Component', pascalCase(name))
    }

    if (type === TemplateGenerator.TYPES.HOOK) {
      return parsed.replace('name', camelCase(name))
    }

    return parsed
  }

  async execute({ type, name, description }) {
    const dest = this.getDest({ type, name })
    const paths = await this.getTemplatePaths({ type })

    const promises = paths.map(path =>
      import(path).then(module => ({
        path: this.getTemplatePath({ path, name, type, dest }),
        content: module.default({
          name,
          description,
        }),
      }))
    )

    const files = await Promise.all(promises)

    return Promise.all(files.map(file => this.system.writeFile(file)))
  }
}
