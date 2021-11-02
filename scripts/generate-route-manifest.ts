import { promises as fs } from 'fs'
import * as path from 'path'

import config from '@stefanprobst/prettier-config'
import prettier from 'prettier'

import { log } from '../src/lib/utils/log'

const srcFolderPath = path.join(process.cwd(), 'src')
const pageExtension = '.page.tsx'
const pagesFolder = path.join(srcFolderPath, 'pages')
const internalPages = ['_app', '_document', '_error', '404', '500', '_middleware']
const outputFileName = 'routes.ts'
const outputPath = path.join('lib', 'core', 'navigation')
const absoluteOutputPath = path.join(srcFolderPath, outputPath, outputFileName)

async function generate(): Promise<void> {
  const absoluteFilePaths: Array<string> = []

  async function readFolder(currentFolder: string) {
    const entries = await fs.readdir(currentFolder, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isFile()) {
        if (
          entry.name.endsWith(pageExtension) &&
          !internalPages.includes(entry.name.slice(0, -pageExtension.length))
        ) {
          absoluteFilePaths.push(path.join(currentFolder, entry.name))
        }
      } else if (entry.isDirectory()) {
        await readFolder(path.join(currentFolder, entry.name))
      }
    }
  }

  await readFolder(pagesFolder)

  const routes: Record<
    string,
    { pathname: string; pathParams: Array<string>; importPath: string }
  > = {}

  const regex = /\[+(\.*.*?)\]+/g

  for (const filePath of absoluteFilePaths) {
    const pathParams: Array<string> = []
    const pathname = filePath
      .slice(pagesFolder.length, -pageExtension.length)
      .replace(regex, (_match, p) => {
        pathParams.push(p)
        return '${' + p + '}'
      })
      .replace(/index$/, '')

    const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' })
    const defaultExportMatch = fileContent.match(/^export default(?: function)? (\w+)/m)
    if (defaultExportMatch == null) {
      log.warn('No page name found:', filePath)
      continue
    }
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const pageComponentName = defaultExportMatch[1]!

    if (Object.prototype.hasOwnProperty.call(routes, pageComponentName)) {
      log.error('Duplicate page name found:', filePath)
      throw new Error()
    }

    const importPath = path
      .relative(srcFolderPath, filePath)
      .slice(0, -path.extname(filePath).length)

    routes[pageComponentName] = { pathname, pathParams, importPath }
  }

  const imports = [`import type { UrlObject } from '@/${outputPath}/types'`]

  const routeMap = Object.entries(routes).map(
    ([pageName, { pathname, pathParams, importPath }]) => {
      let params = ''

      if (pathParams.length > 0) {
        params += '{' + pathParams.join(', ') + '}'
        const paramsInputType = pageName + 'ParamsInput'
        params += `: ` + paramsInputType
        imports.push(`import type { ${paramsInputType} } from '@/${importPath}'`)
      }

      return `${pageName}(${params}): UrlObject { return { pathname: ${'`' + pathname + '`'} }},`
    },
  )

  const manifest = [
    imports.join('\n'),
    '',
    'export const routes = {',
    routeMap.join('\n'),
    '}',
  ].join('\n')

  await fs.writeFile(
    absoluteOutputPath,
    /* eslint-disable-next-line import/no-named-as-default-member */
    prettier.format(manifest, { ...(config as prettier.Options), parser: 'typescript' }),
    {
      encoding: 'utf-8',
    },
  )
}

generate()
  .then(() => {
    log.success('Successfully generated route manifest.')
  })
  .catch((error) => {
    log.error('Failed to generate route manifest.', error)
  })
