import type { GetStaticPropsResult } from 'next'
import { Fragment } from 'react'

import { PageHeroSection } from '@/components/PageHeroSection'
import { PageHeroTitle } from '@/components/PageHeroTitle'
import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import type { PageParams } from '@/lib/core/navigation/types'

function createImprintUrl() {
  const redmineId = 9945
  const lang = 'en'
  const url = new URL('https://shared.acdh.oeaw.ac.at/acdh-common-assets/api/imprint.php')
  url.searchParams.set('serviceID', String(redmineId))
  url.searchParams.set('outputLang', lang)
  return String(url)
}

const imprintUrl = createImprintUrl()

export type ImprintPageParamsInput = Record<string, never>
export type ImprintPageParams = PageParams<ImprintPageParamsInput>
export type ImprintPageProps = {
  imprintHtml: string
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ImprintPageProps>> {
  const imprintHtml = await fetch(imprintUrl).then((response) => {
    return response.text()
  })

  return {
    props: {
      imprintHtml,
    },
  }
}

export default function ImprintPage(props: ImprintPageProps): JSX.Element {
  const { imprintHtml } = props

  return (
    <Fragment>
      <PageMetadata nofollow noindex title="Imprint" />
      <PageMainContent>
        <PageHeroSection>
          <PageHeroTitle>Imprint</PageHeroTitle>
        </PageHeroSection>
        <PageSection>
          <div dangerouslySetInnerHTML={{ __html: imprintHtml }} className="prose max-w-none" />
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
