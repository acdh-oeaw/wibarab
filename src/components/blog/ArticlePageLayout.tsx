import type { ReactNode } from 'react'

import { ArticleHeaderSection } from '@/components/blog/ArticleHeaderSection'
import { ArticleMedata } from '@/components/blog/ArticleMetadata'
import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import type { PageParams } from '@/lib/core/navigation/types'
import type { ArticleRaw } from '@/lib/data/types'

export type ArticlePageLayoutParamsInput = Record<string, never>
export type ArticlePageLayoutParams = PageParams<ArticlePageLayoutParamsInput>
export interface ArticlePageLayoutProps {
  children?: ReactNode
  /** Added by `remark` plugin. */
  metadata: ArticleRaw
}

export function ArticlePageLayout(props: ArticlePageLayoutProps): JSX.Element {
  const { title, leadIn, featuredImage } = props.metadata

  return (
    <PageMainContent>
      <ArticleHeaderSection>
        <PageHeroTitle>{title}</PageHeroTitle>
        <PageHeroLeadIn>{leadIn}</PageHeroLeadIn>
        <ArticleMedata metadata={props.metadata} />
      </ArticleHeaderSection>
      <PageSection>
        <div className="mb-6 bleed">
          <img src={featuredImage} alt="" className="object-cover w-full rounded aspect-[16/10]" />
        </div>
        <div className="grid leading-8 text-size-text text-text gap-y-6">{props.children}</div>
      </PageSection>
    </PageMainContent>
  )
}
