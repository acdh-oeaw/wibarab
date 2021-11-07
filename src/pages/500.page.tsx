import { Fragment } from 'react'

import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import type { PageParams } from '@/lib/core/navigation/types'

export type InternalErrorPageParamsInput = Record<string, never>
export type InternalErrorPageParams = PageParams<InternalErrorPageParamsInput>
export type InternalErrorPageProps = Record<string, never>

export default function InternalErrorPage(_props: InternalErrorPageProps): JSX.Element {
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
