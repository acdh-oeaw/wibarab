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
import type { ArticleMetadata } from '@/lib/data/types'
import { isNonEmptyString } from '@/lib/utils'

export interface ArticlePageLayoutProps {
  children?: ReactNode
  metadata: ArticleMetadata
}

export function ArticlePageLayout(props: ArticlePageLayoutProps): JSX.Element {
  const { title, leadIn, date, authors, featuredImage, abstract } = props.metadata

  const hasFeaturedImage = isNonEmptyString(featuredImage)
  const ogImage = hasFeaturedImage ? { images: [{ src: featuredImage, alt: '' }] } : {}
  const schemaOrgImage = hasFeaturedImage ? { image: featuredImage } : {}

  return (
    <Fragment>
      <PageMetadata title={title} description={abstract} openGraph={{ ...ogImage }} />
      <SchemaOrg
        schema={{
          '@type': 'Article',
          headline: title,
          abstract: abstract,
          datePublished: date,
          ...schemaOrgImage,
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
          {hasFeaturedImage ? (
            <div className="mb-6 bleed">
              <img
                src={featuredImage}
                alt=""
                className="object-cover w-full rounded aspect-[16/10]"
              />
            </div>
          ) : null}
          <div className="prose">{props.children}</div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
