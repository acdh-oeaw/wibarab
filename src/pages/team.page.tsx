import type { StringParams } from '@stefanprobst/next-route-manifest'
import type { GetStaticPropsResult } from 'next'
import { Fragment } from 'react'

import { Image } from '@/components/Image'
import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageSectionTitle } from '@/components/PageSectionTitle'
import { Spacer } from '@/components/Spacer'
import { TeamMembersList } from '@/components/team/TeamMembersList'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import { getTeam } from '@/lib/data/team'
import type { TeamMember, TeamRole } from '@/lib/data/types'
import TeamImage from '~/public/assets/cms/images/wibarab_team.png'

export namespace TeamPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export interface Props {
    team: Record<TeamRole, Array<TeamMember>>
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
          <PageHeroLeadIn>
            Arabic linguists and Digital humanists 
          </PageHeroLeadIn>
          <p>
            The project&apos;s core team is composed of six specialists in Arabic linguistics: the
            principal investigator (PI), one postdoctoral researcher specialized in linguistics, and
            four PhD candidates. A second postdoctoral researcher specialized in the history of the
            Bedouins will be taken on board after the first year. WIBARAB also benefits from the
            work of IT specialists from the Austrian Academy of Sciences and two MA students who
            will mainly feed the database. The Vienna-based team is supported by research partners
            in the Arab countries.
          </p>
        </PageHeroSection>
        <PageSection>
          <PageSectionTitle>Core team</PageSectionTitle>
          <div className="mb-6">
            <Image
              src={TeamImage}
              alt="WIBARAB Team members"
              className="rounded !grayscale opacity-90"
              quality={100}
            />
          </div>
          <TeamMembersList team={team.core} />
        </PageSection>
        <Spacer />
        <PageSection>
          <PageSectionTitle>Extended team</PageSectionTitle>
          <TeamMembersList team={team.extended} />
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
