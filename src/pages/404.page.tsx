import type { StringParams } from '@stefanprobst/next-route-manifest'
import { Fragment } from 'react'

import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'

export namespace NotFoundPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export type Props = Record<string, never>
}

export default function NotFoundPage(_props: NotFoundPage.Props): JSX.Element {
  return (
    <Fragment>
      <PageMetadata nofollow noindex title="Not found" />
      <PageMainContent>
        <PageSection className="h-full">
          <div className="grid self-stretch place-items-center" role="alert">
            <p>Sorry, this page does not exist.</p>
          </div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
