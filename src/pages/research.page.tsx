import type { StringParams } from '@stefanprobst/next-route-manifest'
import type { GetStaticPropsResult } from 'next'
import { Fragment } from 'react'

import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageSectionTitle } from '@/components/PageSectionTitle'
import { ResearchList } from '@/components/research/ResearchList'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import { getResearch } from '@/lib/data/research'
import type { ResearchItem } from '@/lib/data/types'

export namespace ResearchPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export interface Props {
    research: Array<ResearchItem>
  }
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ResearchPage.Props>> {
  const research = await getResearch()

  return {
    props: {
      research,
    },
  }
}

export default function ResearchPage(props: ResearchPage.Props): JSX.Element {
  const { research } = props

  return (
    <Fragment>
      <PageMetadata title="Research" />
      <PageMainContent>
        <PageHeroSection>
          <PageHeroTitle>Research</PageHeroTitle>
          <PageHeroLeadIn>For the time being, we have no project-related publications or pre-papers. We hope that we are able to upload first results soon.</PageHeroLeadIn>
        </PageHeroSection>
        <PageSection>
          <PageSectionTitle>Documents</PageSectionTitle>
          <ResearchList research={research} />
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
