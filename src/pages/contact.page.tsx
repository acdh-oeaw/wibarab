import type { StringParams } from '@stefanprobst/next-route-manifest'
import { Fragment } from 'react'

import { PageHeroLeadIn } from '@/components/PageHeroLeadIn'
import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageSectionTitle } from '@/components/PageSectionTitle'
import { Spacer } from '@/components/Spacer'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import { Link } from '@/lib/core/navigation/Link'

export namespace ContactPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export type Props = Record<string, never>
}

export default function HomePage(_props: ContactPage.Props): JSX.Element {
  return (
    <Fragment>
      <PageMetadata title="Contact" />
      <PageMainContent>
        <PageHeroSection>
          <PageHeroTitle>Contact</PageHeroTitle>
          <PageHeroLeadIn>
            Get in touch with us
          </PageHeroLeadIn>
        </PageHeroSection>
        <PageSection>
          <div className="prose">
            <p>
              Write us on twitter! 
            </p>
          </div>
        </PageSection>
        <Spacer />       
      </PageMainContent>
    </Fragment>
  )
}
