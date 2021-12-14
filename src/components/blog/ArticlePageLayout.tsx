import { SchemaOrg } from '@stefanprobst/next-page-metadata'
import cx from 'clsx'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

import { ArticleHeaderSection } from '@/components/blog/ArticleHeaderSection'
import { ArticleMedata } from '@/components/blog/ArticleMetadata'
import { Image } from '@/components/Image'
import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import type { ArticleMetadata } from '@/lib/data/types'

export interface ArticlePageLayoutProps {
  children?: ReactNode
  metadata: ArticleMetadata
  isPreview?: boolean
}

export function ArticlePageLayout(props: ArticlePageLayoutProps): JSX.Element {
  const { title, leadIn, date, authors, featuredImage, abstract } = props.metadata

  const ogImages =
    featuredImage != null
      ? typeof featuredImage === 'object'
        ? { images: [{ ...featuredImage, alt: '' }] }
        : { images: [{ src: featuredImage, alt: '' }] }
      : {}

  const schemaOrgImageObject =
    featuredImage != null
      ? typeof featuredImage === 'object'
        ? {
            image: {
              '@type': 'ImageObject' as const,
              contentUrl: featuredImage.src,
              width: featuredImage.width + 'px',
              height: featuredImage.height + 'px',
            },
          }
        : { image: featuredImage }
      : {}

  return (
    <Fragment>
      <PageMetadata title={title} description={abstract} openGraph={{ ...ogImages }} />
      <SchemaOrg
        schema={{
          '@type': 'Article',
          headline: title,
          abstract: abstract,
          datePublished: date,
          ...schemaOrgImageObject,
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
          {featuredImage != null ? (
            <div className="mb-6 bleed">
              {typeof featuredImage === 'object' ? (
                <Image
                  priority
                  src={featuredImage}
                  alt=""
                  objectFit="cover"
                  className="w-full rounded"
                />
              ) : (
                /* For external image urls we cannot know image dimensions. */
                <img
                  src={featuredImage}
                  alt=""
                  className={cx(
                    'object-cover w-full rounded',
                    props.isPreview !== true && 'aspect-[16/10]',
                  )}
                  loading="lazy"
                />
              )}
            </div>
          ) : null}
          <div className="prose">{props.children}</div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
