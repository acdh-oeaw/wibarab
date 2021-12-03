import { existsSync, promises as fs } from 'fs'
import * as path from 'path'

import { researchExtension, researchFolderPath } from '@/lib/data/data.config'
import type { ResearchItem } from '@/lib/data/types'

export async function getResearch(): Promise<Array<ResearchItem>> {
  if (!existsSync(researchFolderPath)) return []

  const folderEntries = await fs.readdir(researchFolderPath, { withFileTypes: true })

  const research = []

  for (const folderEntry of folderEntries) {
    if (folderEntry.isFile() && folderEntry.name.endsWith(researchExtension)) {
      const id = folderEntry.name.slice(0, -researchExtension.length)
      const researchItem = await getResearchItem(id)

      research.push(researchItem)
    }
  }

  research.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })

  return research
}

export async function getResearchItem(id: string): Promise<ResearchItem> {
  const filePath = path.join(researchFolderPath, id + researchExtension)
  const content = await fs.readFile(filePath, { encoding: 'utf-8' })
  const metadata = JSON.parse(content) as ResearchItem

  const researchItem = {
    id,
    title: metadata.title,
    description: metadata.description,
    document: metadata.document,
  }

  return researchItem
}
