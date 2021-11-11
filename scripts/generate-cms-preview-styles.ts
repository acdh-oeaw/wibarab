import { promises as fs, existsSync } from 'fs'
import * as path from 'path'

import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import type { Result, AcceptedPlugin, Plugin } from 'postcss'
import atImport from 'postcss-import'
import tailwind from 'tailwindcss'
import { createMatchPath, loadConfig } from 'tsconfig-paths'

import { log } from '../src/lib/utils/log'

const outputFolderPath = path.join(process.cwd(), 'public', 'assets', 'cms', 'styles')

function readFile(filePath: string) {
  return fs.readFile(filePath, { encoding: 'utf-8' })
}

function writeFile(fileName: string, content: Result) {
  return fs.writeFile(path.join(outputFolderPath, fileName), content.css, { encoding: 'utf-8' })
}

const tsconfig = loadConfig()

if (tsconfig.resultType === 'failed') {
  throw new Error('Failed to read tsconfig')
}

const resolve = createMatchPath(
  tsconfig.absoluteBaseUrl,
  tsconfig.paths,
  tsconfig.mainFields,
  tsconfig.addMatchAll,
)

const postcssPlugins: Array<AcceptedPlugin> = [
  atImport({
    resolve(id) {
      return resolve(id) ?? require.resolve(id)
    },
  }) as Plugin,
  tailwind,
  autoprefixer,
]

async function processCss(filePath: string) {
  const styles = await readFile(filePath)
  return postcss(postcssPlugins).process(styles, { from: filePath })
}

async function generate() {
  if (!existsSync(outputFolderPath)) {
    await fs.mkdir(outputFolderPath, { recursive: true })
  }

  await writeFile(
    'index.css',
    await processCss(path.join(process.cwd(), 'src', 'styles', 'index.css')),
  )
  await writeFile(
    'tailwind.css',
    await processCss(path.join(process.cwd(), 'node_modules', 'tailwindcss', 'tailwind.css')),
  )
}

generate()
  .then(() => {
    log.success('Successfully generated styles for CMS preview templates.')
  })
  .catch((error) => {
    log.error('Failed to generate styles for CMS preview templates.', error)
  })
