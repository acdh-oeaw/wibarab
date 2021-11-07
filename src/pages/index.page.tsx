import type { GetStaticPropsResult } from 'next'
import { Fragment } from 'react'

import AboutSection, { metadata } from '@/components/home/About.mdx'
import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageSectionTitle } from '@/components/PageSectionTitle'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import type { PageParams } from '@/lib/core/navigation/types'
import { getTeam } from '@/lib/data/team'
import type { TeamMember } from '@/lib/data/types'

export type HomePageParamsInput = Record<string, never>
export type HomePageParams = PageParams<HomePageParamsInput>
export type HomePageProps = {
  team: Array<TeamMember>
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const team = await getTeam()

  return {
    props: {
      team,
    },
  }
}

export default function HomePage(props: HomePageProps): JSX.Element {
  const { team } = props

  return (
    <Fragment>
      <PageMetadata title="Home" />
      <PageMainContent>
        <PageHeroSection>
          <PageHeroTitle>What is bedouin-type Arabic?</PageHeroTitle>
          <PageHeroLeadIn>
            The linguistic and socio-historical realities behind the millennia-old dichotomous
            concept of nomadic and sedentary people in the Middle East and North Africa
          </PageHeroLeadIn>
        </PageHeroSection>
        <PageSection>
          <p className="leading-8 text-size-text text-text">
            More than 350 million people speak Arabic in linguistic settings that are for the most
            part characterised by a high degree of diglossia. From Iran to Mauretania, countless
            spoken varieties are in use, which will be investigated in the ERC project WIBARAB. A
            particular concern of the project is the language of the Bedouins which has spread with
            the Arab expansion in the Middle East and North Africa since the 7th century. In a
            cooperation between the Institute of Oriental Studies (University of Vienna) and the
            Austrian Centre for Digital Humanities and Cultural Heritage (Austrian Academy of
            Sciences), an attempt is being made to better understand the nature of the linguistic
            dichotomy between sedentary and nomadic varieties and this concept, which is so
            fundamental to Arabic language history, by applying innovative and interdisciplinary
            methods. The project will collect new data through fieldwork in Saudi Arabia, Jordan,
            Sudan and Morocco, among other countries. It will also include social parameters in the
            investigation, in particular the question of whether the prevalence of tribal structures
            and patriarchal social patterns helps to explain the linguistic conservatism of Bedouin
            dialects.
          </p>
          <p className="leading-8 text-size-text text-text">
            As part of the project, the ACDH-CH will further develop and refine its
            text-technological stack and take care of data modelling, corpus design, the
            implementation of the database, the publication platform and long-term preservation. The
            database will allow for efficient cross-dialectal comparisons, particularly with regard
            to phonological, morphological, syntactical, phraseological and lexical features
          </p>
        </PageSection>
        <Spacer />
        <PageSection>
          <PageSectionTitle>Team</PageSectionTitle>
          <TeamMembersList team={team} />
        </PageSection>
        <Spacer />
        <PageSection>
          <PageSectionTitle>{metadata.title}</PageSectionTitle>
          <AboutSection
            components={{
              p: (props) => {
                return <p className="leading-8 text-size-text text-text" {...props} />
              },
            }}
          />
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}

function Spacer() {
  return <div className="py-12" />
}

interface TeamMembersListProps {
  team: Array<TeamMember>
}

function TeamMembersList(props: TeamMembersListProps) {
  const { team } = props

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-6 gap-y-12">
      {team.map((teamMember) => {
        return (
          <li key={teamMember.name}>
            <TeamMemberDetails teamMember={teamMember} />
          </li>
        )
      })}
    </ul>
  )
}

interface TeamMemberDetailsProps {
  teamMember: TeamMember
}
function TeamMemberDetails(props: TeamMemberDetailsProps) {
  const { teamMember } = props

  return (
    <article className="grid gap-3 text-text">
      <h3 className="font-medium">{teamMember.name}</h3>
      <p className="text-sm text-text-muted">{teamMember.bio}</p>
      <dl className="text-sm text-muted">
        <dt className="sr-only">Email</dt>
        <dd>
          <a
            href={`mailto:${teamMember.email}`}
            className="hover:text-text-highlighted focus-visible:text-text-highlighted"
          >
            {teamMember.email}
          </a>
        </dd>
      </dl>
    </article>
  )
}
