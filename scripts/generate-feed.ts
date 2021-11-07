import { promises as fs } from 'fs'
import * as path from 'path'

import * as YAML from 'js-yaml'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import type { Channel, Entry } from 'xast-util-feed'
import { rss } from 'xast-util-feed'
import { toXml } from 'xast-util-to-xml'

import { siteMetadata } from '../config/metadata.config'
import { baseUrl } from '../config/site.config'
import { articleExtension, blogFolderPath } from '../src/lib/data/data.config'
import { getTeamMember } from '../src/lib/data/team'
import type { ArticleMetadataRaw } from '../src/lib/data/types'
import { log } from '../src/lib/utils/log'

const feedFilePath = path.join(process.cwd(), 'public', 'feed.xml')

async function getArticlesMetadata() {
  const folderEntries = await fs.readdir(blogFolderPath, { withFileTypes: true })

  const articles = []

  for (const folderEntry of folderEntries) {
    if (folderEntry.isFile() && path.extname(folderEntry.name) === articleExtension) {
      const filePath = path.join(blogFolderPath, folderEntry.name)
      const content = await fs.readFile(filePath, { encoding: 'utf-8' })
      const metadata = matter(new VFile(content), { yaml: { schema: YAML.CORE_SCHEMA } }).data[
        'matter'
      ] as ArticleMetadataRaw
      articles.push({
        id: folderEntry.name.slice(0, -articleExtension.length),
        title: metadata.title,
        date: metadata.date,
        authors: metadata.authors.map(getTeamMember),
        abstract: metadata.abstract,
      })
    }
  }

  articles.sort((a, b) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1
  })

  return articles
}

async function generate() {
  const channel: Channel = {
    title: siteMetadata.title,
    url: siteMetadata.url,
    lang: 'en',
    description: siteMetadata.description,
    feedUrl: String(new URL('feed.xml', baseUrl)),
  }

  const articlesMetadata = await getArticlesMetadata()

  const entries: Array<Entry> = articlesMetadata.map((metadata) => {
    return {
      title: metadata.title,
      description: metadata.abstract,
      published: metadata.date,
      url: String(new URL('/blog/' + metadata.id, baseUrl)),
    }
  })

  const feed = toXml(rss(channel, entries))

  await fs.writeFile(feedFilePath, feed, { encoding: 'utf-8' })
}

generate()
  .then(() => {
    log.success('Successfully generated RSS feed.')
  })
  .catch((error) => {
    log.error('Failed to generate RSS feed.', error)
  })
