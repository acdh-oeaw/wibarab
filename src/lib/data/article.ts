import { compile } from '@mdx-js/mdx'
import { promises as fs } from 'fs'
import * as YAML from 'js-yaml'
import * as path from 'path'
import withGfm from 'remark-gfm'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

import { articleExtension, blogFolderPath } from '@/lib/data/data.config'
import { getTeamMember } from '@/lib/data/team'
import type { Article, ArticleMetadataRaw, ArticlePreview } from '@/lib/data/types'

export async function getArticlePreviews(): Promise<Array<ArticlePreview>> {
  const folderEntries = await fs.readdir(blogFolderPath, { withFileTypes: true })

  const articles = []

  for (const folderEntry of folderEntries) {
    if (folderEntry.isFile() && folderEntry.name.endsWith(articleExtension)) {
      const id = folderEntry.name.slice(0, -articleExtension.length)
      const article = await getArticlePreview(id)

      articles.push(article)
    }
  }

  articles.sort((a, b) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1
  })

  return articles
}

export async function getArticlePreview(id: string): Promise<ArticlePreview> {
  const filePath = path.join(blogFolderPath, id + articleExtension)
  const content = await fs.readFile(filePath, { encoding: 'utf-8' })
  const vfile = new VFile({ value: content, pathname: filePath })
  const metadata = matter(vfile, { yaml: { schema: YAML.CORE_SCHEMA } }).data[
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

export async function getArticle(id: string): Promise<Article> {
  const filePath = path.join(blogFolderPath, id + articleExtension)
  const content = await fs.readFile(filePath, { encoding: 'utf-8' })
  const vfile = new VFile({ value: content, pathname: filePath })
  const metadata = matter(vfile, { yaml: { schema: YAML.CORE_SCHEMA } }).data[
    'matter'
  ] as ArticleMetadataRaw

  const code = String(
    await compile(vfile, {
      outputFormat: 'function-body',
      useDynamicImport: false,
      remarkPlugins: [withGfm],
      rehypePlugins: [],
    }),
  )

  const article = {
    id,
    title: metadata.title,
    date: metadata.date,
    authors: await Promise.all(metadata.authors.map(getTeamMember)),
    abstract: metadata.abstract,
    leadIn: metadata.leadIn,
    featuredImage: metadata.featuredImage,
    code,
  }

  return article
}
