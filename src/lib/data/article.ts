import { promises as fs } from 'fs'
import * as path from 'path'

import * as YAML from 'js-yaml'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

import { articleExtension, blogFolderPath } from '@/lib/data/data.config'
import { getTeamMember } from '@/lib/data/team'
import type { ArticleMetadataRaw, ArticleMetadata } from '@/lib/data/types'

export async function getArticlePreviews(): Promise<Array<ArticleMetadata>> {
  const folderEntries = await fs.readdir(blogFolderPath, { withFileTypes: true })

  const articles = []

  for (const folderEntry of folderEntries) {
    if (folderEntry.isFile() && path.extname(folderEntry.name) === articleExtension) {
      const article = await getArticlePreview(folderEntry.name.slice(0, -articleExtension.length))

      articles.push(article)
    }
  }

  articles.sort((a, b) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1
  })

  return articles
}

export async function getArticlePreview(id: string): Promise<ArticleMetadata> {
  const filePath = path.join(blogFolderPath, id + articleExtension)
  const content = await fs.readFile(filePath, { encoding: 'utf-8' })
  const metadata = matter(new VFile(content), { yaml: { schema: YAML.CORE_SCHEMA } }).data[
    'matter'
  ] as ArticleMetadataRaw

  const article = {
    id,
    title: metadata.title,
    date: metadata.date,
    authors: await Promise.all(metadata.authors.map(getTeamMember)),
    abstract: metadata.abstract,
  }

  return article
}
