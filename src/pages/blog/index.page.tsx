import type { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'

import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
// import { PageSectionTitle } from '@/components/PageSectionTitle'
import type { PageParams } from '@/lib/core/navigation/types'
import { getArticlePreviews } from '@/lib/data/article'
import type { ArticleMetadata } from '@/lib/data/types'

export type BlogPageParamsInput = Record<string, never>
export type BlogPageParams = PageParams<BlogPageParamsInput>
export type BlogPageProps = {
  articles: Array<ArticleMetadata>
}

export async function getStaticProps(): Promise<GetStaticPropsResult<BlogPageProps>> {
  const articles = await getArticlePreviews()

  return {
    props: {
      articles,
    },
  }
}

export default function BlogPage(props: BlogPageProps): JSX.Element {
  const { articles } = props

  return (
    <PageMainContent>
      <PageHeroSection>
        <PageHeroTitle>Blog</PageHeroTitle>
        <PageHeroLeadIn>
          Research notes on the linguistic and socio-historical realities behind the millennia-old
          dichotomous concept of nomadic and sedentary people in the Middle East and North Africa
        </PageHeroLeadIn>
      </PageHeroSection>
      <PageSection>
        {/* <PageSectionTitle>Articles</PageSectionTitle> */}
        <ArticlesList articles={articles} />
      </PageSection>
    </PageMainContent>
  )
}

interface ArticlesListProps {
  articles: Array<ArticleMetadata>
}

function ArticlesList(props: ArticlesListProps) {
  const { articles } = props

  if (articles.length === 0) {
    return <p className="text-center text-text-muted">Nothing there yet :(</p>
  }

  return (
    <ul className="grid divide-y divide-text-highlighted">
      {articles.map((article) => {
        return (
          <li key={article.id} className="grid gap-3">
            <ArticlePreview article={article} />
          </li>
        )
      })}
    </ul>
  )
}

interface ArticlePreviewProps {
  article: ArticleMetadata
}

function ArticlePreview(props: ArticlePreviewProps) {
  const { article } = props

  const href = { pathname: `/blog/${article.id}` }

  return (
    <article className="grid py-12 gap-y-3">
      <h3 className="font-medium text-size-heading text-text-highlighted glow">
        <Link href={href}>
          <a>{article.title}</a>
        </Link>
      </h3>
      <p className="leading-relaxed text-size-text text-text-muted">{article.abstract}</p>
      <footer className="flex flex-col gap-3 xs:items-center xs:justify-between xs:flex-row">
        <ArticlePreviewMetadata metadata={article} />
        <Link href={href}>
          <a
            aria-label={`Read article "${article.title}"`}
            className="text-sm hover:text-text-highlighted focus-visible:text-text-highlighted whitespace-nowrap"
          >
            Read more &raquo;
          </a>
        </Link>
      </footer>
    </article>
  )
}

interface ArticlePreviewMetadataProps {
  metadata: ArticleMetadata
}
function ArticlePreviewMetadata(props: ArticlePreviewMetadataProps) {
  const { authors } = props.metadata

  return (
    <dl className="text-sm leading-relaxed text-text-muted">
      {authors.length > 0 ? (
        <Fragment>
          <dt className="inline sr-only">Authors</dt>
          <dd className="inline">
            <span aria-hidden>By </span>
            {authors
              .map((author) => {
                return author.name
              })
              .join(', ')}
          </dd>
        </Fragment>
      ) : null}
    </dl>
  )
}
