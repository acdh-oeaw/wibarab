import type { StringParams } from '@stefanprobst/next-route-manifest'
import { Fragment } from 'react'

import AboutSection, { metadata } from '@/components/home/About.mdx'
import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageSectionTitle } from '@/components/PageSectionTitle'
import { Spacer } from '@/components/Spacer'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import { Link } from '@/lib/core/navigation/Link'

export namespace HomePage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export type Props = Record<string, never>
}

export default function HomePage(_props: HomePage.Props): JSX.Element {
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
          <div className="prose">
            <p>
              More than 350 million people speak Arabic in linguistic settings that are for the most
              part characterised by a high degree of diglossia. From Iran to Mauretania, countless
              spoken varieties are in use, which will be investigated in the ERC project WIBARAB. A
              particular concern of the project is the language of the Bedouins which has spread
              with the Arab expansion in the Middle East and North Africa since the 7th century. In
              a cooperation between the Institute of Oriental Studies (University of Vienna) and the
              Austrian Centre for Digital Humanities and Cultural Heritage (Austrian Academy of
              Sciences), an attempt is being made to better understand the nature of the linguistic
              dichotomy between sedentary and nomadic varieties and this concept, which is so
              fundamental to Arabic language history, by applying innovative and interdisciplinary
              methods. The project will collect new data through fieldwork in Saudi Arabia, Jordan,
              Sudan and Morocco, among other countries. It will also include social parameters in
              the investigation, in particular the question of whether the prevalence of tribal
              structures and patriarchal social patterns helps to explain the linguistic
              conservatism of Bedouin dialects.
            </p>
            <p>
              As part of the project, the ACDH-CH will further develop and refine its
              text-technological stack and take care of data modelling, corpus design, the
              implementation of the database, the publication platform and long-term preservation.
              The database will allow for efficient cross-dialectal comparisons, particularly with
              regard to phonological, morphological, syntactical, phraseological and lexical
              features
            </p>
          </div>
        </PageSection>
        <Spacer />
        <PageSection>
          <PageSectionTitle>{metadata.title}</PageSectionTitle>
          <div className="prose">
            <AboutSection components={{ Link }} />
          </div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
