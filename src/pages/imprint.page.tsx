import type { StringParams } from '@stefanprobst/next-route-manifest'
import type { GetStaticPropsResult } from 'next'
import { Fragment } from 'react'

import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import { lang, redmineId } from '~/config/imprint.config'

function createImprintUrl() {
  const url = new URL('https://shared.acdh.oeaw.ac.at/acdh-common-assets/api/imprint.php')
  url.searchParams.set('serviceID', String(redmineId))
  url.searchParams.set('outputLang', lang)
  return String(url)
}

const imprintUrl = createImprintUrl()

export namespace ImprintPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export interface Props {
    imprintHtml: string
  }
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ImprintPage.Props>> {
  const imprintHtml = await fetch(imprintUrl).then((response) => {
    return response.text()
  })

  return {
    props: {
      imprintHtml,
    },
  }
}

export default function ImprintPage(props: ImprintPage.Props): JSX.Element {
  const { imprintHtml } = props

  return (
    <Fragment>
      <PageMetadata nofollow noindex title="Imprint" />
      <PageMainContent>
        <PageHeroSection>
          <PageHeroTitle>Imprint</PageHeroTitle>
        </PageHeroSection>
        <PageSection>
          <div dangerouslySetInnerHTML={{ __html: imprintHtml }} className="prose" />
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
