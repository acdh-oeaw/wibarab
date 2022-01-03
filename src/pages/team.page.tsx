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
          <PageHeroLeadIn>The project&apos;s core team is composed of six specialists in Arabic linguistics: the principal investigator (PI), one postdoctoral researcher specialized in linguistics, and four PhD candidates. A second postdoctoral researcher specialized in the history of the Bedouins will be taken on board after the first year. WIBARAB also benefits from the work of an IT specialist and two MA students who will mainly feed the database. The Vienna-based team is supported by research partners in the Arab countries.</PageHeroLeadIn>
        </PageHeroSection>
        <PageSection>
          <PageSectionTitle>Team</PageSectionTitle>
          <TeamMembersList team={team} />
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
