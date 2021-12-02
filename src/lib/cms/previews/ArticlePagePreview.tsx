import type { PreviewTemplateComponentProps } from 'netlify-cms-core'

import { ArticlePageLayout } from '@/components/blog/ArticlePageLayout'
import { Spacer } from '@/components/Spacer'
import { Mdx } from '@/lib/cms/components/Mdx'
import { Preview } from '@/lib/cms/previews/Preview'

/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export type ArticlePagePreviewProps = PreviewTemplateComponentProps

export function ArticlePagePreview(props: ArticlePagePreviewProps): JSX.Element {
  const { entry, fieldsMetaData, getAsset } = props

  const title = entry.getIn(['data', 'title'])
  const leadIn = entry.getIn(['data', 'leadIn'])
  const authors =
    entry
      .getIn(['data', 'authors'])
      ?.map((id: string) => {
        const author = fieldsMetaData.getIn(['authors', 'team', id])
        if (author == null) return null
        return author.toJS()
      })
      .filter(Boolean) || []
  const date = entry.getIn(['data', 'date']) || new Date().toISOString()
  const content = entry.getIn(['data', 'body'])
  const featuredImage = String(getAsset(entry.getIn(['data', 'featuredImage'])))
  const abstract = entry.getIn(['data', 'abstract'])

  const metadata = { id: 'preview', title, leadIn, authors, date, featuredImage, abstract }

  return (
    <Preview>
      <ArticlePageLayout metadata={metadata}>
        <div className="prose">
          <Mdx mdx={content} />
        </div>
      </ArticlePageLayout>
      <Spacer />
    </Preview>
  )
}
