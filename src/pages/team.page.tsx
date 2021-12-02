import type { StringParams } from '@stefanprobst/next-route-manifest'
import type { GetStaticPropsResult } from 'next'
import { Fragment } from 'react'

import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageSectionTitle } from '@/components/PageSectionTitle'
import { TeamMembersList } from '@/components/team/TeamMembersList'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import { getTeam } from '@/lib/data/team'
import type { TeamMember } from '@/lib/data/types'

export namespace TeamPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export interface Props {
    team: Array<TeamMember>
  }
}

export async function getStaticProps(): Promise<GetStaticPropsResult<TeamPage.Props>> {
  const team = await getTeam()

  return {
    props: {
      team,
    },
  }
}

export default function TeamPage(props: TeamPage.Props): JSX.Element {
  const { team } = props

  return (
    <Fragment>
      <PageMetadata title="Team" />
      <PageMainContent>
        <PageHeroSection>
          <PageHeroTitle>Team members</PageHeroTitle>
          <PageHeroLeadIn>Look ma, I&apos;m on the internet!</PageHeroLeadIn>
        </PageHeroSection>
        <PageSection>
          <PageSectionTitle>Team</PageSectionTitle>
          <TeamMembersList team={team} />
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
