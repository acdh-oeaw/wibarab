import type { StringParams } from '@stefanprobst/next-route-manifest'
import { Fragment } from 'react'

import AboutSection, { metadata as aboutSectionMetadata } from '@/components/home/About.mdx'
import IntroSection from '@/components/home/Intro.mdx'
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
            <IntroSection components={{ Link }} />
          </div>
        </PageSection>
        <Spacer />
        <PageSection>
          <PageSectionTitle>{aboutSectionMetadata.title}</PageSectionTitle>
          <div className="prose">
            <AboutSection components={{ Link }} />
          </div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
