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
          <PageHeroTitle>What is Bedouin-type Arabic?</PageHeroTitle>
          <PageHeroLeadIn>
            The linguistic and socio-historical realities behind the millennia-old dichotomous
            concept of nomadic and sedentary people in the Middle East and North Africa
          </PageHeroLeadIn>
        </PageHeroSection>
        <PageSection>
          <div className="prose">

            <p>
              More than 350 million people speak Arabic in linguistic settings that are for the most part characterised by a high degree of diglossia. Some of the countless spoken Arabic varieties in use from Iran to Mauretania will be investigated in the framework of an ERC Advanced Grant by the WIBARAB project (What Is Bedouin-type ARABic?). 
            </p>
            <p>
              As its name indicates, a particular concern of the WIBARAB project is the language of the Bedouins which has spread with the Arab expansion in the Middle East and North Africa since the 7th century. In a cooperation between the Institute of Oriental Studies (University of Vienna) and the Austrian Centre for Digital Humanities and Cultural Heritage (Austrian Academy of Sciences), WIBARAB aims to better understand the nature of the linguistic dichotomy between sedentary and nomadic varieties, a fundamental concept to Arabic language history, by applying innovative and interdisciplinary research methods. To pursue this goal, the project will collect new data through extensive fieldwork in Saudi Arabia, Kuwait, Jordan, Lebanon, Egypt, Tunisia and Morocco. Along with linguistic data, WIBARAB will also investigate social parameters, focusing in particular on the question of whether the prevalence of tribal structures and patriarchal social patterns helps to explain the linguistic conservatism of Bedouin dialects. 
            </p>
            <p>
              Both newly collected and already published data will be systematically stored in a database that will allow for efficient cross-dialectal comparisons, particularly with regard to phonological, morphological, syntactical, phraseological and lexical features. This will be possible thanks to the help of the ACDH-CH team, which will further develop and refine its text-technological stack and take care of data modelling and corpus design, as well as of the implementation, publication and long-term preservation of the project’s database. 
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
