import type { StringParams } from '@stefanprobst/next-route-manifest'
import { Fragment } from 'react'

import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'

export namespace InternalErrorPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export type Props = Record<string, never>
}

export default function InternalErrorPage(_props: InternalErrorPage.Props): JSX.Element {
  return (
    <Fragment>
      <PageMetadata nofollow noindex title="Error" />
      <PageMainContent>
        <PageSection className="h-full">
          <div className="grid self-stretch place-items-center" role="alert">
            <p>Sorry, something went horribly wrong.</p>
          </div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
