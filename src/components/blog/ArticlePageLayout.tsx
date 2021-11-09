import { SchemaOrg } from '@stefanprobst/next-page-metadata'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

import { ArticleHeaderSection } from '@/components/blog/ArticleHeaderSection'
import { ArticleMedata } from '@/components/blog/ArticleMetadata'
import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import type { PageParams } from '@/lib/core/navigation/types'
import type { Article } from '@/lib/data/types'

export type ArticlePageLayoutParamsInput = Record<string, never>
export type ArticlePageLayoutParams = PageParams<ArticlePageLayoutParamsInput>
export interface ArticlePageLayoutProps {
  children?: ReactNode
  /** Added by `remark` plugin. */
  metadata: Article
}

export function ArticlePageLayout(props: ArticlePageLayoutProps): JSX.Element {
  const { title, leadIn, date, authors, featuredImage, abstract } = props.metadata

  return (
    <Fragment>
      <PageMetadata
        title={title}
        description={abstract}
        openGraph={{ images: [{ src: featuredImage, alt: '' }] }}
      />
      <SchemaOrg
        schema={{
          '@type': 'Article',
          headline: title,
          abstract: abstract,
          datePublished: date,
          image: featuredImage,
          author: authors
            .map((author) => {
              return author.name
            })
            .join(', '),
        }}
      />
      <PageMainContent>
        <ArticleHeaderSection>
          <PageHeroTitle>{title}</PageHeroTitle>
          <PageHeroLeadIn>{leadIn}</PageHeroLeadIn>
          <ArticleMedata metadata={props.metadata} />
        </ArticleHeaderSection>
        <PageSection>
          <div className="mb-6 bleed">
            <img
              src={featuredImage}
              alt=""
              className="object-cover w-full rounded aspect-[16/10]"
            />
          </div>
          <div className="prose max-w-none">{props.children}</div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
